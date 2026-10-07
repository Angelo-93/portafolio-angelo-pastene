import { render, screen, cleanup } from '@testing-library/react'
import TarjetaNoticia from './TarjetaNoticia.jsx'

describe('TarjetaNoticia', () => {
  afterEach(cleanup)

  it('muestra título, contenido y la fecha legible con su valor estándar en datetime', () => {
    render(<TarjetaNoticia noticia={{ titulo: 'Noticia', fecha: '2026-09-08', contenido: 'Texto breve' }} />)

    const fecha = screen.getByText('8 de septiembre de 2026')
    expect(fecha.tagName).toBe('TIME')
    expect(fecha.getAttribute('datetime')).toBe('2026-09-08')
    expect(screen.getByRole('heading', { name: 'Noticia' })).toBeTruthy()
    expect(screen.getByText('Texto breve')).toBeTruthy()
  })
})
