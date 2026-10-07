import { render, screen, cleanup } from '@testing-library/react'
import TituloSeccion from './TituloSeccion.jsx'

describe('TituloSeccion', () => {
  afterEach(cleanup)

  it('muestra el título como h2 con el id recibido', () => {
    render(<TituloSeccion id="titulo-x" titulo="Proyectos" />)
    const titulo = screen.getByRole('heading', { level: 2, name: 'Proyectos' })
    expect(titulo.id).toBe('titulo-x')
  })

  it('muestra el subtítulo solo cuando lo recibe (renderizado condicional)', () => {
    const { rerender, container } = render(<TituloSeccion id="t" titulo="Sin subtítulo" />)
    expect(container.querySelector('.titulo-seccion__subtitulo')).toBeNull()

    // rerender vuelve a dibujar el mismo componente con props nuevas.
    rerender(<TituloSeccion id="t" titulo="Con subtítulo" subtitulo="Frase breve" />)
    expect(screen.getByText('Frase breve')).toBeTruthy()
  })
})
