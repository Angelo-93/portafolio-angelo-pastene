import { render, screen, cleanup } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  afterEach(cleanup)

  it('ensambla el enlace de accesibilidad, el menú y la página', () => {
    // La página pide datos al montarse; el mock la deja en "cargando" sin tocar la red.
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {}))
    render(<App />)

    expect(screen.getByRole('link', { name: 'Saltar al contenido principal' })).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeTruthy()
    expect(screen.getByRole('main')).toBeTruthy()
  })

  it('el menú tiene un enlace a cada una de las cinco secciones', () => {
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {}))
    render(<App />)

    const destinos = ['#inicio', '#sobre-mi', '#proyectos', '#noticias', '#contacto']
    destinos.forEach((destino) => {
      expect(document.querySelector(`.navbar-nav a[href="${destino}"]`)).not.toBeNull()
    })
  })
})
