import { render, screen, within, cleanup } from '@testing-library/react'
import TarjetaProyecto from './TarjetaProyecto.jsx'

// Imagen de 1×1 píxel incrustada: evita que el navegador de pruebas intente
// descargar un archivo que no existe (y llene la salida de avisos 404).
const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Proyecto de prueba base; cada caso cambia solo lo que necesita probar.
const PROYECTO = {
  id: 1,
  titulo: 'Proyecto de prueba',
  descripcion: 'Descripción de prueba',
  imagen: IMAGEN_FALSA,
  tecnologias: ['React', 'Bootstrap'],
  repositorio: 'https://github.com/usuario/repo',
  demo: null,
}

describe('TarjetaProyecto', () => {
  afterEach(cleanup)

  it('muestra título, descripción, imagen y tecnologías recibidos por props', () => {
    render(<TarjetaProyecto proyecto={PROYECTO} />)

    expect(screen.getByRole('heading', { name: 'Proyecto de prueba' })).toBeTruthy()
    expect(screen.getByText('Descripción de prueba')).toBeTruthy()
    expect(screen.getByRole('img').getAttribute('alt')).toBe('Vista previa del proyecto Proyecto de prueba')
    const lista = screen.getByRole('list', { name: 'Tecnologías utilizadas' })
    expect(within(lista).getAllByRole('listitem').length).toBe(2)
  })

  it('sin demo, muestra solo el botón del repositorio', () => {
    render(<TarjetaProyecto proyecto={PROYECTO} />)
    expect(screen.getByRole('link', { name: /Repositorio/ }).getAttribute('href')).toBe(PROYECTO.repositorio)
    expect(screen.queryByRole('link', { name: /Ver demo/ })).toBeNull()
  })

  it('con demo y sin repositorio, muestra solo el botón de la demo', () => {
    render(<TarjetaProyecto proyecto={{ ...PROYECTO, repositorio: null, demo: 'https://demo.cl' }} />)
    expect(screen.getByRole('link', { name: /Ver demo/ }).getAttribute('href')).toBe('https://demo.cl')
    expect(screen.queryByRole('link', { name: /Repositorio/ })).toBeNull()
  })
})
