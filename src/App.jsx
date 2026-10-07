import EnlaceSaltarContenido from './components/atoms/EnlaceSaltarContenido.jsx'
import BarraNavegacion from './components/organisms/BarraNavegacion.jsx'
import PaginaPortafolio from './pages/PaginaPortafolio.jsx'

// Secciones del menú. El id debe coincidir con el id de cada <section>.
const SECCIONES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'sobre-mi', texto: 'Sobre mí' },
  { id: 'proyectos', texto: 'Proyectos' },
  { id: 'noticias', texto: 'Noticias' },
  { id: 'contacto', texto: 'Contacto' },
]

/**
 * Componente raíz: solo ensambla las piezas que están siempre visibles
 * (enlace de accesibilidad y menú) y la página, que maneja sus propios datos.
 */
function App() {
  return (
    <>
      <EnlaceSaltarContenido />
      <BarraNavegacion marca="Angelo Pastene" secciones={SECCIONES} />
      <PaginaPortafolio />
    </>
  )
}

export default App
