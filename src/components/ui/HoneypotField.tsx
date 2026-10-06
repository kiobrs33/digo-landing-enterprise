/**
 * Campo trampa contra bots: oculto para las personas (y para lectores de pantalla). Un bot suele
 * llenarlo; si llega con valor, la API responde como si todo saliera bien y no guarda nada.
 */
export function HoneypotField() {
  return (
    <div className="form-honeypot" aria-hidden="true">
      <label>
        Sitio web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
