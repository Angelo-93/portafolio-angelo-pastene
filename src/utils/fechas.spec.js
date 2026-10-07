import { formatearFecha } from './fechas.js'

describe('formatearFecha', () => {
  it('convierte AAAA-MM-DD en texto legible en español', () => {
    expect(formatearFecha('2026-09-08')).toBe('8 de septiembre de 2026')
  })

  // Caso de borde: el 1 de enero en UTC sigue siendo 31 de diciembre en Chile.
  // Si la zona horaria no se fija, esta prueba mostraría el año anterior.
  it('no corre la fecha un día hacia atrás por la zona horaria (caso de borde)', () => {
    expect(formatearFecha('2026-01-01')).toBe('1 de enero de 2026')
  })

  it('devuelve el texto original si no es una fecha válida', () => {
    expect(formatearFecha('sin fecha')).toBe('sin fecha')
  })
})
