import Container from 'react-bootstrap/Container'

/**
 * Componente raíz del portafolio.
 * En el bloque 1 solo confirma que React y Bootstrap quedaron bien conectados;
 * en los bloques siguientes ensamblará la página con los organismos.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Container as="main" className="py-5 text-center">
      <h1>Angelo Pastene Acevedo</h1>
      <p className="lead">Portafolio en construcción.</p>
    </Container>
  )
}

export default App
