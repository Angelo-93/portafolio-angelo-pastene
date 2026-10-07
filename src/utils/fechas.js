/**
 * Convierte una fecha 'AAAA-MM-DD' en texto legible, por ejemplo '8 de septiembre de 2026'.
 *
 * Detalle importante: new Date('2026-09-08') se interpreta como medianoche en UTC.
 * En Chile (UTC-3 o UTC-4) esa hora todavía es el día 7, así que sin la opción
 * timeZone: 'UTC' la noticia aparecería con un día menos.
 *
 * @param {string} fechaIso - Fecha en formato 'AAAA-MM-DD'.
 * @returns {string} La fecha formateada, o el mismo texto recibido si no es una fecha válida.
 */
export function formatearFecha(fechaIso) {
  const fecha = new Date(fechaIso)
  if (Number.isNaN(fecha.getTime())) {
    return fechaIso
  }
  return fecha.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
