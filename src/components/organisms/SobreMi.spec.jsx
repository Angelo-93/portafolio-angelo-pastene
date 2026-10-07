import { render, screen, within, cleanup } from '@testing-library/react'
import SobreMi from './SobreMi.jsx'

describe('SobreMi', () => {
  afterEach(cleanup)

  it('muestra cada párrafo y cada habilidad recibidos por props', () => {
    render(<SobreMi parrafos={['Primer párrafo.', 'Segundo párrafo.']} habilidades={['React', 'Git', 'Java']} />)

    expect(screen.getByText('Primer párrafo.')).toBeTruthy()
    expect(screen.getByText('Segundo párrafo.')).toBeTruthy()
    const habilidades = screen.getByRole('heading', { name: 'Habilidades' }).nextElementSibling
    expect(within(habilidades).getAllByRole('listitem').length).toBe(3)
  })

  it('la sección queda nombrada por su título para lectores de pantalla', () => {
    render(<SobreMi parrafos={[]} habilidades={[]} />)
    expect(screen.getByRole('region', { name: 'Sobre mí' })).toBeTruthy()
  })
})
