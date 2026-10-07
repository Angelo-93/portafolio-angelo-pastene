/*
 * Reglas del formulario de contacto, separadas del componente para poder
 * probarlas sin renderizar nada y reutilizarlas si aparece otro formulario.
 */

// Algo@algo.dominio: sin espacios, una sola @ y un dominio de al menos 2 letras.
// No intenta cubrir todos los casos del estándar; basta para avisar errores de tipeo.
const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const LARGO_MINIMO_MENSAJE = 10

/**
 * Revisa los datos del formulario de contacto.
 * @param {{nombre?: string, correo?: string, mensaje?: string}} datos - Valores escritos por el usuario.
 * @returns {{nombre?: string, correo?: string, mensaje?: string}} Un mensaje por cada campo con error;
 *   un objeto vacío significa que todo está correcto.
 */
export function validarContacto({ nombre = '', correo = '', mensaje = '' }) {
  const errores = {}

  if (nombre.trim() === '') {
    errores.nombre = 'Ingresa tu nombre.'
  }

  if (correo.trim() === '') {
    errores.correo = 'Ingresa tu correo.'
  } else if (!FORMATO_CORREO.test(correo.trim())) {
    errores.correo = 'El correo no tiene un formato válido.'
  }

  if (mensaje.trim().length < LARGO_MINIMO_MENSAJE) {
    errores.mensaje = `El mensaje debe tener al menos ${LARGO_MINIMO_MENSAJE} caracteres.`
  }

  return errores
}
