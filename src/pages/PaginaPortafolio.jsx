import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Portada from '../components/organisms/Portada.jsx'
import SobreMi from '../components/organisms/SobreMi.jsx'
import Proyectos from '../components/organisms/Proyectos.jsx'
import SeccionNoticias from '../components/organisms/SeccionNoticias.jsx'
import FormularioContacto from '../components/organisms/FormularioContacto.jsx'
import PiePagina from '../components/organisms/PiePagina.jsx'
import TituloSeccion from '../components/molecules/TituloSeccion.jsx'
import { cargarDatosPortafolio } from '../services/datosService.js'

/**
 * Página completa del portafolio. Es la única que carga datos: los guarda en su
 * estado y los reparte a los organismos por props (flujo de padre a hijo).
 *
 * Tiene tres estados posibles y dibuja algo distinto en cada uno:
 * 'cargando' → spinner, 'error' → aviso con botón Reintentar, 'listo' → contenido.
 */
function PaginaPortafolio() {
  const [estado, setEstado] = useState('cargando')
  const [datos, setDatos] = useState(null)
  // Cambiar este número vuelve a ejecutar el efecto: es como se implementa "Reintentar".
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    // Si el componente desaparece antes de que lleguen los datos, no se debe
    // actualizar su estado; esta bandera lo evita.
    let activo = true

    async function cargar() {
      try {
        const resultado = await cargarDatosPortafolio()
        if (activo) {
          setDatos(resultado)
          setEstado('listo')
        }
      } catch (error) {
        console.error('Error al cargar el portafolio:', error)
        if (activo) {
          setEstado('error')
        }
      }
    }

    cargar()
    return () => {
      activo = false
    }
  }, [intento])

  const reintentar = () => {
    setEstado('cargando')
    setIntento((anterior) => anterior + 1)
  }

  if (estado === 'cargando') {
    return (
      <main id="contenido" tabIndex={-1} className="estado-pagina">
        <Spinner animation="border" role="status" className="estado-pagina__spinner">
          <span className="visually-hidden">Cargando portafolio…</span>
        </Spinner>
      </main>
    )
  }

  if (estado === 'error') {
    return (
      <main id="contenido" tabIndex={-1} className="estado-pagina">
        <Container>
          <Alert variant="danger" className="text-center">
            <p>No pudimos cargar el portafolio. Revisa tu conexión e inténtalo otra vez.</p>
            <Button variant="outline-danger" onClick={reintentar}>Reintentar</Button>
          </Alert>
        </Container>
      </main>
    )
  }

  const { perfil, proyectos, noticias } = datos

  return (
    <>
      <main id="contenido" tabIndex={-1}>
        <Portada perfil={perfil} />
        <SobreMi parrafos={perfil.sobreMi} habilidades={perfil.habilidades} />
        <Proyectos proyectos={proyectos} />
        <section id="noticias" className="seccion" aria-labelledby="titulo-noticias">
          <Container>
            <TituloSeccion id="titulo-noticias" titulo="Noticias" subtitulo="Lo último en mi camino académico y técnico" />
            <Row className="gy-5">
              <Col xs={12} lg={6}>
                <SeccionNoticias id="titulo-noticias-academicas" titulo="Novedades académicas" categoria="academica" noticias={noticias} />
              </Col>
              <Col xs={12} lg={6}>
                <SeccionNoticias id="titulo-noticias-tecnicas" titulo="Aprendizajes técnicos" categoria="tecnica" noticias={noticias} />
              </Col>
            </Row>
          </Container>
        </section>
        <FormularioContacto />
      </main>
      <PiePagina nombre={perfil.nombre} redes={perfil.redes} />
    </>
  )
}

export default PaginaPortafolio
