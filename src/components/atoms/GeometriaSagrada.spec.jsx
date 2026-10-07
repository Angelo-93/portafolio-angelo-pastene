import { render, cleanup } from '@testing-library/react'
import GeometriaSagrada from './GeometriaSagrada.jsx'

describe('GeometriaSagrada', () => {
  // Testing Library dibuja en el mismo document; cleanup lo vacía tras cada prueba
  // para que lo renderizado en una no aparezca en la siguiente.
  afterEach(cleanup)

  it('dibuja los 19 círculos de la Flor de la vida', () => {
    const { container } = render(<GeometriaSagrada />)
    expect(container.querySelectorAll('.geometria-sagrada__petalo').length).toBe(19)
  })

  it('es decorativa (aria-hidden) y suma la clase recibida por props', () => {
    const { container } = render(<GeometriaSagrada className="mi-clase" />)
    const svg = container.querySelector('svg')
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.classList).toContain('mi-clase')
  })
})
