import { render, screen, cleanup } from '@testing-library/react'
import SeccionNoticias from './SeccionNoticias.jsx'

// Datos diseñados a propósito: dos categorías y fechas desordenadas.
const NOTICIAS = [
  { id: 1, categoria: 'academica', titulo: 'Académica antigua', fecha: '2026-03-01', contenido: 'a' },
  { id: 2, categoria: 'tecnica', titulo: 'Técnica', fecha: '2026-05-01', contenido: 'b' },
  { id: 3, categoria: 'academica', titulo: 'Académica reciente', fecha: '2026-09-01', contenido: 'c' },
]

describe('SeccionNoticias', () => {
  afterEach(cleanup)

  it('muestra solo las noticias de su categoría, la más reciente primero', () => {
    render(<SeccionNoticias id="s1" titulo="Académicas" categoria="academica" noticias={NOTICIAS} />)

    const titulos = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent)
    expect(titulos).toEqual(['Académica reciente', 'Académica antigua'])
    expect(screen.queryByText('Técnica')).toBeNull()
  })

  it('el mismo componente sirve para otra categoría con otras props (reutilización)', () => {
    render(<SeccionNoticias id="s2" titulo="Técnicas" categoria="tecnica" noticias={NOTICIAS} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Técnicas' })).toBeTruthy()
    expect(screen.getAllByRole('article').length).toBe(1)
  })

  it('muestra un mensaje cuando la categoría no tiene noticias (renderizado condicional)', () => {
    render(<SeccionNoticias id="s3" titulo="Vacía" categoria="deportes" noticias={NOTICIAS} />)
    expect(screen.getByText('Aún no hay noticias en esta sección.')).toBeTruthy()
    expect(screen.queryAllByRole('article').length).toBe(0)
  })
})
