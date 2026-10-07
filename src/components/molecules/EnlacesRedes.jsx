import Icono from '../atoms/Icono.jsx'

/**
 * Lista de enlaces a redes sociales con su ícono.
 * Como solo se ve el ícono, el texto para lectores de pantalla va en aria-label,
 * que además avisa que el enlace abre una pestaña nueva.
 * @param {object} props
 * @param {{nombre: string, url: string}[]} props.redes - Redes a mostrar.
 * @param {string} [props.className] - Clases extra para la lista.
 */
function EnlacesRedes({ redes = [], className = '' }) {
  return (
    <ul className={`enlaces-redes list-inline mb-0 ${className}`.trim()}>
      {redes.map((red) => (
        <li key={red.url} className="list-inline-item">
          <a
            href={red.url}
            target="_blank"
            // noopener: la página abierta no puede manipular esta pestaña (window.opener).
            rel="noopener noreferrer"
            aria-label={`${red.nombre} (se abre en una pestaña nueva)`}
            className="enlaces-redes__enlace"
          >
            <Icono nombre={red.nombre.toLowerCase()} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default EnlacesRedes
