import { useEffect, useRef, type RefObject } from 'react'

/**
 * Galaxia de fibra (WebGL puro, sin librerías).
 *
 * Brazos espirales hechos de hebras de fibra continuas, con polvo estelar alrededor. Por cada
 * hebra viajan pulsos magenta con estela: la mitad hacia el centro (bajada) y la mitad hacia
 * afuera (subida), al mismo ritmo: la simetría de la fibra hecha movimiento. La estela crece
 * con la velocidad elegida. Todo el movimiento se calcula en el vertex shader; la CPU solo
 * actualiza tres uniforms por cuadro.
 *
 * `speed` (0–1) acelera los pulsos; el puntero los acelera aún más mientras se mueve.
 */

type FiberGalaxyProps = {
  /** Velocidad relativa de los pulsos, 0 a 1 (500, 800, 1000 Mbps). */
  speed: number
  /** Elemento que recorre la órbita (la nave): se mueve con el mismo bucle y la misma pausa. */
  orbiterRef?: RefObject<HTMLElement | null>
}

/** Vueltas por segundo de la nave: ~1/25 a 500 Mbps, ~1/14 a 1000 Mbps. */
function orbitRate(speed: number) {
  return 1 / (36 - speed * 22)
}

const ARMS = 4
const STRANDS_PER_ARM = 7
const STRAND_SEGMENTS = 220
const TRAIL_SAMPLES = 10

const VERTEX_SHADER = `#version 300 es
precision highp float;
layout(location = 0) in vec4 aSeed;   // x: brazo, y: posición en el brazo (0-1), z: dispersión, w: brillo
layout(location = 1) in vec2 aKind;   // x: 0 estrella, 1 pulso de subida, -1 pulso de bajada, 2 hebra; y: posición en la estela (0 = cabeza)
uniform float uTime;
uniform float uTravel;
uniform float uTrail;
uniform float uAspect;
uniform float uScale;
uniform float uDpr;
out float vAlpha;
out float vKind;

const float ARMS = ${ARMS}.0;
const float TWO_PI = 6.2831853;

void main() {
  float arm = aSeed.x;
  float t = aSeed.y;
  float kind = aKind.x;
  float trail = aKind.y;

  // Los pulsos recorren su hebra; los de subida salen y los de bajada entran, al mismo ritmo.
  // La estela queda detrás de la cabeza y crece con la velocidad elegida.
  if (kind > 0.5 && kind < 1.5) t = fract(t + uTravel - trail * uTrail);
  if (kind < -0.5) t = fract(t - uTravel + trail * uTrail);

  // Espiral logarítmica: radio creciente, ángulo que se enrolla con el radio.
  float radius = 0.05 + pow(t, 0.85) * 0.95;
  float angle = arm / ARMS * TWO_PI + radius * 5.2 + uTime * 0.035;
  float width = kind == 0.0 ? 1.0 : 0.3;
  float spread = aSeed.z * (0.015 + radius * 0.14) * width;
  vec2 dir = vec2(cos(angle), sin(angle));
  vec2 normal = vec2(-dir.y, dir.x);
  vec2 p = dir * radius + normal * spread;

  // Disco inclinado: la galaxia se ve un poco de canto.
  p.y *= 0.62;
  p = mat2(0.94, -0.34, 0.34, 0.94) * p;

  gl_Position = vec4(p.x * uScale / uAspect, p.y * uScale, 0.0, 1.0);

  float twinkle = 0.75 + 0.25 * sin(uTime * 1.7 + aSeed.w * 40.0);
  float core = smoothstep(0.35, 0.0, radius);
  if (kind > 1.5) {
    // Hebra de fibra: línea continua, más brillante hacia el núcleo.
    vAlpha = (0.10 + aSeed.w * 0.14) * (1.0 - radius * 0.6) + core * 0.25;
    gl_PointSize = 1.0;
  } else if (kind == 0.0) {
    vAlpha = (0.2 + aSeed.w * 0.45) * twinkle * (1.0 - radius * 0.5) + core * 0.3;
    gl_PointSize = (1.0 + aSeed.w * 1.6 + core * 1.5) * uDpr;
  } else {
    float fade = pow(1.0 - trail, 1.6);
    vAlpha = fade * smoothstep(0.0, 0.06, t) * smoothstep(1.0, 0.88, t);
    gl_PointSize = (5.0 + aSeed.w * 2.5) * (1.0 - trail * 0.65) * uDpr;
  }
  vKind = kind;
}`

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in float vAlpha;
in float vKind;
out vec4 outColor;
void main() {
  if (vKind > 1.5) {
    vec3 fiber = vec3(0.62, 0.76, 1.0);
    outColor = vec4(fiber * vAlpha, vAlpha);
    return;
  }
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float glow = smoothstep(0.5, 0.0, d);
  vec3 star = mix(vec3(0.56, 0.71, 1.0), vec3(1.0), glow * 0.8);
  vec3 pulse = mix(vec3(0.87, 0.03, 0.49), vec3(1.0, 0.8, 0.92), glow * glow);
  vec3 color = vKind == 0.0 ? star : pulse;
  outColor = vec4(color * glow * vAlpha, glow * vAlpha);
}`

function buildGalaxy(starCount: number, pulsesPerArm: number) {
  const strandCount = ARMS * STRANDS_PER_ARM
  const pulseCount = ARMS * pulsesPerArm * TRAIL_SAMPLES
  const total = starCount + pulseCount + strandCount * STRAND_SEGMENTS
  const seeds = new Float32Array(total * 4)
  const kinds = new Float32Array(total * 2)
  // Pseudoaleatorio determinista: la galaxia es la misma en cada visita.
  let state = 7
  const random = () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
  const gaussian = () => (random() + random() + random() - 1.5) / 1.5

  let index = 0
  const push = (seed: number[], kind: number, trail: number) => {
    seeds.set(seed, index * 4)
    kinds.set([kind, trail], index * 2)
    index += 1
  }

  for (let i = 0; i < starCount; i += 1) {
    push([Math.floor(random() * ARMS), random(), gaussian(), random()], 0, 0)
  }

  // Cada pulso viaja sobre una hebra concreta, con su estela.
  const strandOffsets = Array.from({ length: strandCount }, () => gaussian() * 0.9)
  for (let arm = 0; arm < ARMS; arm += 1) {
    for (let j = 0; j < pulsesPerArm; j += 1) {
      const offset = strandOffsets[arm * STRANDS_PER_ARM + (j % STRANDS_PER_ARM)] / 0.3
      const brightness = random()
      const direction = j % 2 === 0 ? 1 : -1
      for (let k = 0; k < TRAIL_SAMPLES; k += 1) {
        push([arm, j / pulsesPerArm, offset * 0.3, brightness], direction, k / TRAIL_SAMPLES)
      }
    }
  }

  const strandStart = index
  for (let strand = 0; strand < strandCount; strand += 1) {
    const arm = Math.floor(strand / STRANDS_PER_ARM)
    const offset = strandOffsets[strand] / 0.3
    const brightness = random()
    for (let segment = 0; segment < STRAND_SEGMENTS; segment += 1) {
      push([arm, segment / (STRAND_SEGMENTS - 1), offset * 0.3, brightness], 2, 0)
    }
  }

  return { seeds, kinds, pointCount: strandStart, strandStart, strandCount }
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function FiberGalaxy({ speed, orbiterRef }: FiberGalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const speedRef = useRef(speed)
  const redrawRef = useRef<() => void>(() => {})

  useEffect(() => {
    speedRef.current = speed
    // Con movimiento reducido no hay bucle: se redibuja el cuadro quieto con la nueva estela.
    redrawRef.current()
  }, [speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    })
    if (!gl) {
      canvas.dataset.fallback = 'true'
      return
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) {
      canvas.dataset.fallback = 'true'
      return
    }
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.fallback = 'true'
      return
    }
    gl.useProgram(program)

    const compact = window.matchMedia('(max-width: 768px)').matches
    const { seeds, kinds, pointCount, strandStart, strandCount } = buildGalaxy(
      compact ? 3000 : 7000,
      compact ? 10 : 16,
    )

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const seedBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0)
    const kindBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, kindBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, kinds, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE)

    const uniforms = {
      time: gl.getUniformLocation(program, 'uTime'),
      travel: gl.getUniformLocation(program, 'uTravel'),
      trail: gl.getUniformLocation(program, 'uTrail'),
      aspect: gl.getUniformLocation(program, 'uAspect'),
      scale: gl.getUniformLocation(program, 'uScale'),
      dpr: gl.getUniformLocation(program, 'uDpr'),
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    function resize() {
      if (!canvas || !gl) return
      const { clientWidth, clientHeight } = canvas
      canvas.width = Math.max(1, Math.round(clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uniforms.aspect, clientWidth / Math.max(1, clientHeight))
      // En pantallas anchas la galaxia ocupa la mitad derecha; en móvil, todo el ancho.
      gl.uniform1f(uniforms.scale, clientWidth > 900 ? 1.26 : 0.95)
      gl.uniform1f(uniforms.dpr, dpr)
    }

    let time = 0
    let travel = 0
    let orbit = 0.32
    const placeOrbiter = () => {
      const orbiter = orbiterRef?.current
      if (orbiter) orbiter.style.offsetDistance = `${(orbit * 100).toFixed(3)}%`
    }
    let boost = 0
    let lastFrame = performance.now()
    let frame = 0
    let running = false
    let visible = true

    function draw() {
      if (!gl) return
      gl.uniform1f(uniforms.time, time)
      gl.uniform1f(uniforms.travel, travel)
      // Estela: corta a 500 Mbps, larga a 1000 Mbps.
      gl.uniform1f(uniforms.trail, 0.02 + speedRef.current * 0.07)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      for (let strand = 0; strand < strandCount; strand += 1) {
        gl.drawArrays(gl.LINE_STRIP, strandStart + strand * STRAND_SEGMENTS, STRAND_SEGMENTS)
      }
      gl.drawArrays(gl.POINTS, 0, pointCount)
    }

    function tick(now: number) {
      const delta = Math.min(0.05, (now - lastFrame) / 1000)
      lastFrame = now
      boost *= 0.94
      time += delta
      // 500 Mbps ≈ 0.05, 1000 Mbps ≈ 0.16 vueltas del pulso por segundo.
      travel = (travel + delta * (0.03 + speedRef.current * 0.13 + boost * 0.12)) % 1
      orbit = (orbit + delta * orbitRate(speedRef.current)) % 1
      placeOrbiter()
      draw()
      frame = running ? requestAnimationFrame(tick) : 0
    }

    function start() {
      if (running || !visible || document.hidden) return
      running = true
      lastFrame = performance.now()
      frame = requestAnimationFrame(tick)
    }

    function stop() {
      running = false
      cancelAnimationFrame(frame)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resize()
    placeOrbiter()
    if (reducedMotion) {
      time = 4
      travel = 0.3
      draw()
      redrawRef.current = draw
    }

    const onResize = () => {
      resize()
      if (reducedMotion || !running) draw()
    }
    const onPointer = () => {
      boost = Math.min(1, boost + 0.08)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (reducedMotion) return
      if (visible) start()
      else stop()
    })

    window.addEventListener('resize', onResize)
    if (!reducedMotion) {
      canvas.parentElement?.addEventListener('pointermove', onPointer, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      observer.observe(canvas)
      start()
    }
    canvas.dataset.ready = 'true'

    return () => {
      redrawRef.current = () => {}
      stop()
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      canvas.parentElement?.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(seedBuffer)
      gl.deleteBuffer(kindBuffer)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    }
  }, [orbiterRef])

  return <canvas ref={canvasRef} className="fiber-galaxy" aria-hidden="true" />
}
