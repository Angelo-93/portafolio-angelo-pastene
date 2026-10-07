/**
 * Calcula los centros de la "Flor de la vida": 19 círculos del mismo radio
 * ubicados en una red hexagonal (1 al centro, 6 en el primer anillo, 12 en el segundo).
 * Se calcula en vez de escribir las coordenadas a mano para que el dibujo sea exacto
 * y se pueda cambiar de tamaño con un solo número.
 * @param {number} radio - Radio de cada círculo.
 * @returns {{x: number, y: number}[]} Las 19 posiciones, con el centro en (0, 0).
 */
export function calcularCentrosFlorDeLaVida(radio) {
  const angulos = [0, 60, 120, 180, 240, 300]
  return [
    { x: 0, y: 0 },
    ...angulos.map((a) => puntoPolar(radio, a)),
    ...angulos.map((a) => puntoPolar(radio * 2, a)),
    // Los 6 puntos intermedios del segundo anillo están a radio·√3, girados 30°.
    ...angulos.map((a) => puntoPolar(radio * Math.sqrt(3), a + 30)),
  ]
}

/**
 * Convierte una distancia y un ángulo (en grados) en coordenadas x, y.
 * @param {number} distancia - Distancia desde el centro.
 * @param {number} grados - Ángulo medido desde el eje x, en grados.
 * @returns {{x: number, y: number}}
 */
export function puntoPolar(distancia, grados) {
  const radianes = (grados * Math.PI) / 180
  return { x: distancia * Math.cos(radianes), y: distancia * Math.sin(radianes) }
}
