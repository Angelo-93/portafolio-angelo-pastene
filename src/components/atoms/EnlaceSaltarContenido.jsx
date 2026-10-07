/**
 * Enlace "Saltar al contenido": invisible hasta que recibe el foco con Tab.
 * Permite a quien navega con teclado o lector de pantalla pasar directo al
 * contenido sin recorrer todo el menú. La clase visually-hidden-focusable es de Bootstrap.
 * @param {object} props
 * @param {string} [props.destino='contenido'] - id del elemento al que lleva.
 */
function EnlaceSaltarContenido({ destino = 'contenido' }) {
  return (
    <a href={`#${destino}`} className="enlace-saltar visually-hidden-focusable">
      Saltar al contenido principal
    </a>
  )
}

export default EnlaceSaltarContenido
