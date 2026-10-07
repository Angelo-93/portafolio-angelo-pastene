import { render, screen, cleanup } from '@testing-library/react'
import PiePagina from './PiePagina.jsx'

describe('PiePagina', () => {
  afterEach(cleanup)

  it('muestra el año actual, el nombre y las redes', () => {
    render(<PiePagina nombre="Persona" redes={[{ nombre: 'GitHub', url: 'https://github.com/x' }]} />)

    const anio = new Date().getFullYear()
    expect(screen.getByText(`© ${anio} Persona`)).toBeTruthy()
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeTruthy()
    expect(screen.getByRole('contentinfo')).toBeTruthy()
  })
})
