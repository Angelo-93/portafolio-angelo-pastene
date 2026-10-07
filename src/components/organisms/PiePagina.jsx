import Container from 'react-bootstrap/Container'
import GeometriaSagrada from '../atoms/GeometriaSagrada.jsx'
import EnlacesRedes from '../molecules/EnlacesRedes.jsx'

// Se calcula una vez al cargar la página y no en cada dibujado: React espera que
// un componente dibuje siempre lo mismo con las mismas props (función "pura").
const ANIO_ACTUAL = new Date().getFullYear()

/**
 * Pie de página con nombre, año y redes.
 * @param {object} props
 * @param {string} props.nombre - Nombre del dueño del portafolio.
 * @param {{nombre: string, url: string}[]} props.redes - Redes sociales.
 */
function PiePagina({ nombre, redes }) {
  return (
    <footer className="pie-pagina">
      <Container className="text-center">
        <GeometriaSagrada className="pie-pagina__geometria" />
        <EnlacesRedes redes={redes} className="my-3" />
        <p className="mb-1">© {ANIO_ACTUAL} {nombre}</p>
        <p className="texto-suave small mb-0">Hecho con React, Bootstrap y curiosidad.</p>
      </Container>
    </footer>
  )
}

export default PiePagina
