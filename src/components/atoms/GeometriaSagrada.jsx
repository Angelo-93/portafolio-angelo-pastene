import { calcularCentrosFlorDeLaVida, puntoPolar } from '../../utils/geometria.js'

const RADIO = 30
const RADIO_EXTERIOR = RADIO * 3

/** Puntos "x,y x,y x,y" de un triángulo inscrito en el círculo exterior. */
const triangulo = (giro) =>
  [0, 120, 240]
    .map((a) => puntoPolar(RADIO_EXTERIOR, a + giro))
    .map(({ x, y }) => `${x},${y}`)
    .join(' ')

/**
 * Patrón de geometría sagrada (Flor de la vida + hexagrama) usado como adorno.
 * Es puramente decorativo: aria-hidden evita que un lector de pantalla lo anuncie.
 * El color sale de currentColor, así cada lugar donde se usa decide su tono por CSS.
 * @param {object} props
 * @param {string} [props.className] - Clases extra (tamaño, animación, posición).
 */
function GeometriaSagrada({ className = '' }) {
  const centros = calcularCentrosFlorDeLaVida(RADIO)

  return (
    <svg
      className={`geometria-sagrada ${className}`.trim()}
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle r={RADIO_EXTERIOR} />
        <circle r={RADIO_EXTERIOR + 6} strokeDasharray="1 3" />
        <polygon points={triangulo(-90)} />
        <polygon points={triangulo(90)} />
        {centros.map((c) => (
          <circle
            key={`${c.x.toFixed(2)},${c.y.toFixed(2)}`}
            cx={c.x}
            cy={c.y}
            r={RADIO}
            className="geometria-sagrada__petalo"
          />
        ))}
      </g>
    </svg>
  )
}

export default GeometriaSagrada
