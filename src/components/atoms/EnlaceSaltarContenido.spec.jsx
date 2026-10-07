import { render, screen, cleanup } from '@testing-library/react'
import EnlaceSaltarContenido from './EnlaceSaltarContenido.jsx'

describe('EnlaceSaltarContenido', () => {
  afterEach(cleanup)

  it('apunta a #contenido por defecto', () => {
    render(<EnlaceSaltarContenido />)
    const enlace = screen.getByRole('link', { name: 'Saltar al contenido principal' })
    expect(enlace.getAttribute('href')).toBe('#contenido')
  })

  it('apunta al destino recibido por props', () => {
    render(<EnlaceSaltarContenido destino="proyectos" />)
    expect(screen.getByRole('link').getAttribute('href')).toBe('#proyectos')
  })
})
