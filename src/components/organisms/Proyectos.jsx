import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TituloSeccion from '../molecules/TituloSeccion.jsx'
import TarjetaProyecto from '../molecules/TarjetaProyecto.jsx'

/**
 * Sección de proyectos: una TarjetaProyecto por cada proyecto recibido.
 * Row xs/md/lg define cuántas tarjetas caben por fila: 1 en móvil, 2 en tablet, 3 en escritorio.
 * @param {object} props
 * @param {object[]} props.proyectos - Lista desde proyectos.json.
 */
function Proyectos({ proyectos }) {
  return (
    <section id="proyectos" className="seccion" aria-labelledby="titulo-proyectos">
      <Container>
        <TituloSeccion id="titulo-proyectos" titulo="Proyectos" subtitulo="Trabajos que he construido de principio a fin" />
        <Row xs={1} md={2} lg={3} className="g-4">
          {proyectos.map((proyecto) => (
            <Col key={proyecto.id}>
              <TarjetaProyecto proyecto={proyecto} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Proyectos
