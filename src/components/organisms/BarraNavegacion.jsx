import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import GeometriaSagrada from '../atoms/GeometriaSagrada.jsx'

/**
 * Barra de navegación fija arriba. En pantallas chicas los enlaces se esconden
 * detrás del botón "hamburguesa" (Navbar.Toggle) y se despliegan al tocarlo.
 * @param {object} props
 * @param {string} props.marca - Texto de la marca (izquierda).
 * @param {{id: string, texto: string}[]} props.secciones - Secciones de la página a enlazar.
 */
function BarraNavegacion({ marca, secciones }) {
  return (
    // collapseOnSelect: en móvil el menú se cierra solo al elegir una sección.
    <Navbar expand="lg" sticky="top" collapseOnSelect className="barra-navegacion" aria-label="Navegación principal">
      <Container>
        <Navbar.Brand href="#inicio" className="barra-navegacion__marca">
          <GeometriaSagrada className="barra-navegacion__logo" />
          {marca}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" label="Mostrar u ocultar el menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {secciones.map((seccion) => (
              <Nav.Link key={seccion.id} href={`#${seccion.id}`}>
                {seccion.texto}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BarraNavegacion
