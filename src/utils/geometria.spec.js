import { calcularCentrosFlorDeLaVida, puntoPolar } from './geometria.js'

describe('geometría', () => {
  it('puntoPolar convierte distancia y ángulo en coordenadas', () => {
    const punto = puntoPolar(10, 90)
    expect(punto.x).toBeCloseTo(0, 6)
    expect(punto.y).toBeCloseTo(10, 6)
  })

  it('la Flor de la vida tiene 19 centros y el primero está en el origen', () => {
    const centros = calcularCentrosFlorDeLaVida(30)
    expect(centros.length).toBe(19)
    expect(centros[0]).toEqual({ x: 0, y: 0 })
  })

  it('los 6 círculos del primer anillo están a exactamente un radio del centro', () => {
    const primerAnillo = calcularCentrosFlorDeLaVida(30).slice(1, 7)
    primerAnillo.forEach(({ x, y }) => expect(Math.hypot(x, y)).toBeCloseTo(30, 6))
  })
})
