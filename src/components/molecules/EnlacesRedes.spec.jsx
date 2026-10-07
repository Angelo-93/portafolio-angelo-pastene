import { render, screen, cleanup } from '@testing-library/react'
import EnlacesRedes from './EnlacesRedes.jsx'

describe('EnlacesRedes', () => {
  afterEach(cleanup)

  const REDES = [
    { nombre: 'GitHub', url: 'https://github.com/x' },
    { nombre: 'LinkedIn', url: 'https://linkedin.com/in/x' },
  ]

  it('crea un enlace por cada red recibida', () => {
    render(<EnlacesRedes redes={REDES} />)
    expect(screen.getAllByRole('link').length).toBe(2)
  })

  it('cada enlace tiene nombre accesible y abre pestaña nueva de forma segura', () => {
    render(<EnlacesRedes redes={REDES} />)
    const github = screen.getByRole('link', { name: 'GitHub (se abre en una pestaña nueva)' })
    expect(github.getAttribute('href')).toBe('https://github.com/x')
    expect(github.getAttribute('target')).toBe('_blank')
    expect(github.getAttribute('rel')).toContain('noopener')
  })

  it('no dibuja enlaces si no recibe redes', () => {
    render(<EnlacesRedes />)
    expect(screen.queryAllByRole('link').length).toBe(0)
  })
})
