import { render, screen, cleanup } from '@testing-library/react'
import Proyectos from './Proyectos.jsx'

// Imagen de 1×1 píxel incrustada: evita que el navegador de pruebas intente
// descargar un archivo que no existe (y llene la salida de avisos 404).
const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const crearProyecto = (id) => ({
  id,
  titulo: `Proyecto ${id}`,
  descripcion: 'Descripción',
  imagen: IMAGEN_FALSA,
  tecnologias: ['React'],
  repositorio: 'https://github.com/x',
  demo: null,
})

describe('Proyectos', () => {
  afterEach(cleanup)

  it('dibuja una tarjeta por cada proyecto recibido', () => {
    render(<Proyectos proyectos={[crearProyecto(1), crearProyecto(2), crearProyecto(3)]} />)
    expect(screen.getAllByRole('article').length).toBe(3)
    expect(screen.getByRole('heading', { name: 'Proyecto 2' })).toBeTruthy()
  })
})
