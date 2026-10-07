/**
 * Encabezado común de todas las secciones: ornamento, título y subtítulo opcional.
 * Un solo componente para todas las secciones mantiene el diseño consistente.
 * @param {object} props
 * @param {string} props.id - id del título; la sección lo referencia con aria-labelledby.
 * @param {string} props.titulo - Texto principal (h2).
 * @param {string} [props.subtitulo] - Frase breve bajo el título; si no viene, no se dibuja.
 */
function TituloSeccion({ id, titulo, subtitulo }) {
  return (
    <header className="titulo-seccion text-center mb-5">
      <span className="titulo-seccion__ornamento" aria-hidden="true">✦</span>
      <h2 id={id} className="titulo-seccion__texto">{titulo}</h2>
      {subtitulo && <p className="titulo-seccion__subtitulo">{subtitulo}</p>}
    </header>
  )
}

export default TituloSeccion
