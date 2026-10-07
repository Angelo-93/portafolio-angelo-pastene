import { render, screen, cleanup } from '@testing-library/react'
import App from './App.jsx'

// Prueba "de humo": si esto pasa, el entorno Karma + Jasmine + React está
// bien armado. Se reemplaza por pruebas reales en el bloque 4.
describe('App', () => {
  // Testing Library monta cada componente en el mismo document; sin limpiar,
  // lo renderizado en una prueba seguiría visible en la siguiente.
  afterEach(cleanup)

  it('debería renderizar el nombre del dueño del portafolio', () => {
    render(<App />)
    const titulo = screen.getByRole('heading', { level: 1 })
    expect(titulo.textContent).toBe('Angelo Pastene Acevedo')
  })
})
