import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Icono from '../atoms/Icono.jsx'

/**
 * Tarjeta de un proyecto: imagen, título, descripción, tecnologías y enlaces.
 * Los botones son condicionales: solo aparece el del repositorio o el de la demo
 * si el proyecto trae esa URL.
 * @param {object} props
 * @param {{titulo: string, descripcion: string, imagen: string, tecnologias: string[],
 *   repositorio: (string|null), demo: (string|null)}} props.proyecto - Datos desde proyectos.json.
 */
function TarjetaProyecto({ proyecto }) {
  const { titulo, descripcion, imagen, tecnologias, repositorio, demo } = proyecto

  return (
    <Card as="article" className="tarjeta h-100">
      <Card.Img
        variant="top"
        src={imagen}
        alt={`Vista previa del proyecto ${titulo}`}
        // Ancho y alto reservan el espacio antes de que cargue la imagen (evita saltos);
        // lazy hace que se descargue recién cuando se acerca a la pantalla.
        width="800"
        height="500"
        loading="lazy"
        className="tarjeta__imagen"
      />
      <Card.Body>
        <Card.Title as="h3" className="tarjeta__titulo">{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0" aria-label="Tecnologías utilizadas">
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia}>
              <Badge bg="" className="etiqueta-tecnologia">{tecnologia}</Badge>
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer className="d-flex gap-2 bg-transparent border-0 pt-0 pb-3">
        {/* Son enlaces (<a>) con aspecto de botón: el Button de React-Bootstrap con href
            agrega role="button", y un lector de pantalla anunciaría "botón" algo que navega. */}
        {repositorio && (
          <a className="btn btn-oro btn-sm" href={repositorio} target="_blank" rel="noopener noreferrer">
            Repositorio <Icono nombre="enlace" tamano={12} />
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        )}
        {demo && (
          <a className="btn btn-outline-oro btn-sm" href={demo} target="_blank" rel="noopener noreferrer">
            Ver demo <Icono nombre="enlace" tamano={12} />
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        )}
      </Card.Footer>
    </Card>
  )
}

export default TarjetaProyecto
