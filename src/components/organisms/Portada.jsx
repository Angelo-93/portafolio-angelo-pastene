import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GeometriaSagrada from '../atoms/GeometriaSagrada.jsx'
import EnlacesRedes from '../molecules/EnlacesRedes.jsx'

/**
 * Introducción: foto, nombre, título, biografía y redes.
 * En móvil la foto va arriba y el texto abajo (columnas de 12); desde "lg"
 * se ponen lado a lado (5 + 7 = 12 columnas de la grilla de Bootstrap).
 * @param {object} props
 * @param {{nombre: string, titulo: string, biografia: string, foto: string,
 *   redes: {nombre: string, url: string}[]}} props.perfil - Datos desde perfil.json.
 */
function Portada({ perfil }) {
  const { nombre, titulo, biografia, foto, redes } = perfil

  return (
    <section id="inicio" className="portada" aria-labelledby="portada-nombre">
      <Container>
        <Row className="align-items-center gy-5">
          <Col xs={12} lg={5} className="text-center">
            <div className="portada__marco">
              <GeometriaSagrada className="portada__geometria" />
              <img
                src={foto}
                alt={`Fotografía de ${nombre}`}
                width="240"
                height="240"
                className="portada__foto rounded-circle"
              />
            </div>
          </Col>
          <Col xs={12} lg={7} className="text-center text-lg-start">
            <p className="portada__saludo">Hola, soy</p>
            <h1 id="portada-nombre" className="portada__nombre">{nombre}</h1>
            <p className="portada__titulo">{titulo}</p>
            <p className="portada__biografia">{biografia}</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start align-items-center">
              {/* Enlaces con clases de botón de Bootstrap (ver comentario en TarjetaProyecto). */}
              <a className="btn btn-oro" href="#proyectos">Ver proyectos</a>
              <a className="btn btn-outline-oro" href="#contacto">Contactar</a>
              <EnlacesRedes redes={redes} className="ms-lg-2" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Portada
