import { render, cleanup } from '@testing-library/react'
import Icono from './Icono.jsx'

describe('Icono', () => {
  afterEach(cleanup)

  it('dibuja el ícono pedido con el tamaño indicado', () => {
    const { container } = render(<Icono nombre="github" tamano={32} />)
    const svg = container.querySelector('svg')
    expect(svg.dataset.icono).toBe('github')
    expect(svg.getAttribute('width')).toBe('32')
  })

  it('usa el ícono genérico de enlace si el nombre no existe (renderizado condicional)', () => {
    const { container } = render(<Icono nombre="red-inexistente" />)
    expect(container.querySelector('svg').dataset.icono).toBe('enlace')
  })
})
