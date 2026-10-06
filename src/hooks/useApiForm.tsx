import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { apiUrl } from '@/config/site'

export type FormValues = Record<string, string>

export type FieldRule = {
  required?: boolean
  pattern?: RegExp
  patternMessage?: string
  /** Regla que depende de otros campos; devuelve el mensaje de error o nada. */
  check?: (value: string, values: FormValues) => string | undefined
}

export const phonePattern: FieldRule = {
  pattern: /^\+?[\d\s()-]{6,20}$/,
  patternMessage: 'Escribe un teléfono válido, por ejemplo 987 654 321.',
}

export const emailPattern: FieldRule = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  patternMessage: 'Escribe un correo válido, por ejemplo nombre@correo.com.',
}

const REQUIRED_MESSAGE = 'Completa este campo.'

/** Error que devuelve la API (mensajes listos para mostrar). */
export class ApiFormError extends Error {
  readonly messages: string[]

  constructor(messages: string[]) {
    super(messages[0])
    this.messages = messages
  }
}

/** POST JSON a la API de digo-landing-backend. */
export async function postToApi<T>(path: string, body: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${apiUrl}/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ApiFormError(['No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.'])
  }
  const data: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiFormError(['Recibimos varios envíos seguidos desde tu conexión. Espera unos minutos e intenta de nuevo.'])
    }
    const message = (data as { message?: string | string[] } | null)?.message
    const messages = Array.isArray(message) ? message : message ? [message] : []
    throw new ApiFormError(
      response.status < 500 && messages.length
        ? messages
        : ['No pudimos registrar tu envío. Intenta de nuevo en unos minutos.'],
    )
  }
  return data as T
}

type UseApiFormOptions<T> = {
  /** Reglas por campo, en el orden en que aparecen en el formulario. */
  fields: Record<string, FieldRule>
  /** Envía los valores (ya validados) y devuelve la respuesta de la API. */
  submit: (values: FormValues) => Promise<T>
}

/**
 * Formulario que se registra en la plataforma: valida en el navegador, envía a la API y muestra
 * el resultado. Mientras envía no se puede reenviar; si falla, los datos quedan en el formulario.
 */
export function useApiForm<T>({ fields, submit }: UseApiFormOptions<T>) {
  const formId = useId()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string[] | null>(null)
  const [result, setResult] = useState<{ data: T; values: FormValues } | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  function validate(values: FormValues): Record<string, string> {
    const nextErrors: Record<string, string> = {}
    for (const [name, rule] of Object.entries(fields)) {
      const value = values[name] ?? ''
      if (!value) {
        if (rule.required) nextErrors[name] = REQUIRED_MESSAGE
      } else if (rule.pattern && !rule.pattern.test(value)) {
        nextErrors[name] = rule.patternMessage ?? 'Revisa el formato de este campo.'
      }
      const custom = !nextErrors[name] ? rule.check?.(value, values) : undefined
      if (custom) nextErrors[name] = custom
    }
    return nextErrors
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    const form = event.currentTarget
    const values: FormValues = {}
    new FormData(form).forEach((value, name) => {
      values[name] = String(value).trim()
    })

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setServerError(null)

    const firstInvalid = Object.keys(fields).find((name) => nextErrors[name])
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    setSubmitting(true)
    try {
      const data = await submit(values)
      form.reset()
      setResult({ data, values })
    } catch (error) {
      setServerError(error instanceof ApiFormError ? error.messages : ['Ocurrió un error inesperado.'])
    } finally {
      setSubmitting(false)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  function errorId(name: string) {
    return `${formId}-${name}-error`
  }

  /** Atributos de accesibilidad y validación para un campo. */
  function fieldProps(name: string) {
    const error = errors[name]
    return {
      name,
      'aria-required': fields[name]?.required || undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId(name) : undefined,
      onInput: () => {
        if (!errors[name]) return
        setErrors((current) => {
          const next = { ...current }
          delete next[name]
          return next
        })
      },
    }
  }

  function fieldError(name: string) {
    const error = errors[name]
    if (!error) return null
    return (
      <span id={errorId(name)} className="form-error">
        {error}
      </span>
    )
  }

  /**
   * Aviso de error del servidor (los datos siguen en el formulario para reintentar). `fallback`:
   * otra vía de contacto para cuando el problema no es de los datos.
   */
  function serverNotice(fallback?: ReactNode) {
    if (!serverError) return null
    return (
      <div ref={statusRef} className="form-error-banner" role="alert" tabIndex={-1}>
        {serverError.length === 1 ? (
          <p>{serverError[0]}</p>
        ) : (
          <ul>
            {serverError.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
        {fallback && <p className="form-error-fallback">{fallback}</p>}
      </div>
    )
  }

  return {
    handleSubmit,
    fieldProps,
    fieldError,
    serverNotice,
    submitting,
    result,
    statusRef,
    reset: () => setResult(null),
  }
}
