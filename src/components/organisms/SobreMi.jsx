import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import TituloSeccion from '../molecules/TituloSeccion.jsx'

/**
 * Sección "Sobre mí": párrafos de presentación y tarjeta de habilidades.
 * @param {object} props
 * @param {string[]} props.parrafos - Párrafos de texto, en orden.
 * @param {string[]} props.habilidades - Tecnologías y herramientas que maneja.
 */
function SobreMi({ parrafos, habilidades }) {
  return (
    <section id="sobre-mi" className="seccion" aria-labelledby="titulo-sobre-mi">
      <Container>
        <TituloSeccion id="titulo-sobre-mi" titulo="Sobre mí" subtitulo="Quién soy y hacia dónde voy" />
        <Row className="gy-4 align-items-start">
          <Col xs={12} lg={7}>
            {parrafos.map((parrafo) => (
              <p key={parrafo} className="sobre-mi__parrafo">{parrafo}</p>
            ))}
          </Col>
          <Col xs={12} lg={5}>
            <Card className="tarjeta">
              <Card.Body>
                <Card.Title as="h3" className="tarjeta__titulo h5">Habilidades</Card.Title>
                <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                  {habilidades.map((habilidad) => (
                    <li key={habilidad} className="etiqueta-tecnologia">{habilidad}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SobreMi
