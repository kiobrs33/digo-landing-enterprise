import { useRef } from 'react'
import { FiberGalaxy } from '@/components/landing/FiberGalaxy'

type GalaxySceneProps = {
  /** Velocidad relativa, 0 a 1: acelera los pulsos de la galaxia y la órbita de la nave. */
  speed: number
}

/**
 * Galaxia de fibra con una nave en órbita. La órbita sigue la inclinación del disco y la
 * nave vuela más rápido cuanto más rápido es el plan elegido (la mueve FiberGalaxy).
 */
export function GalaxyScene({ speed }: GalaxySceneProps) {
  const shipRef = useRef<HTMLDivElement>(null)

  return (
    <div className="hero-galaxy-scene" aria-hidden="true">
      <FiberGalaxy speed={speed} orbiterRef={shipRef} />
      <div className="galaxy-orbit">
        <div ref={shipRef} className="galaxy-ship">
          <svg viewBox="-84 0 156 32" width="156" height="32">
            <defs>
              <linearGradient id="ship-trail" x1="0" x2="1">
                <stop offset="0%" stopColor="#de087e" stopOpacity="0" />
                <stop offset="100%" stopColor="#ff5cb4" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="ship-flame">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#ff5cb4" />
                <stop offset="100%" stopColor="#de087e" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Estela */}
            <path d="M-84 16 L14 13.2 L14 18.8 Z" fill="url(#ship-trail)" />
            <ellipse
              className="galaxy-ship-flame"
              cx="15"
              cy="16"
              rx="9"
              ry="5"
              fill="url(#ship-flame)"
            />
            {/* Alas */}
            <path d="M30 9 L40 1 L47 1 L43 9 Z" fill="#c7d4ff" />
            <path d="M30 23 L40 31 L47 31 L43 23 Z" fill="#c7d4ff" />
            {/* Fuselaje */}
            <rect x="15" y="12" width="7" height="8" rx="2" fill="#8fb4ff" />
            <path
              d="M20 16 C20 10.5 31 7.5 46 8.2 L61 11.6 C67 13 70 14.8 70 16 C70 17.2 67 19 61 20.4 L46 23.8 C31 24.5 20 21.5 20 16 Z"
              fill="#ffffff"
            />
            <path d="M24 16 H45" stroke="#de087e" strokeWidth="2" strokeLinecap="round" />
            {/* Cabina */}
            <ellipse cx="53" cy="16" rx="7.5" ry="3.4" fill="#041c7b" />
            <ellipse cx="55" cy="15" rx="3" ry="1.1" fill="#8fb4ff" />
          </svg>
        </div>
      </div>
    </div>
  )
}
