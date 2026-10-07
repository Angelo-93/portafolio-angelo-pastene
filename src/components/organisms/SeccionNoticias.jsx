import TarjetaNoticia from '../molecules/TarjetaNoticia.jsx'
import { filtrarNoticiasPorCategoria } from '../../services/datosService.js'

/**
 * Una sección de noticias. El mismo componente se usa dos veces con distinta
 * categoría (props): así se cumplen las "dos secciones de noticias" sin duplicar código.
 * @param {object} props
 * @param {string} props.id - id del título de la sección (para aria-labelledby).
 * @param {string} props.titulo - Nombre visible de la sección.
 * @param {string} props.categoria - Categoría de noticias.json que muestra.
 * @param {object[]} props.noticias - Todas las noticias; aquí se filtran por categoría.
 */
function SeccionNoticias({ id, titulo, categoria, noticias }) {
  const noticiasVisibles = filtrarNoticiasPorCategoria(noticias, categoria)

  return (
    <section className="seccion-noticias" aria-labelledby={id}>
      <h3 id={id} className="seccion-noticias__titulo">{titulo}</h3>
      {noticiasVisibles.length === 0 ? (
        <p className="texto-suave">Aún no hay noticias en esta sección.</p>
      ) : (
        <div className="d-grid gap-3">
          {noticiasVisibles.map((noticia) => (
            <TarjetaNoticia key={noticia.id} noticia={noticia} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SeccionNoticias
