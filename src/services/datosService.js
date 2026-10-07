/*
 * Servicio de datos del portafolio.
 * Es el ÚNICO archivo que sabe dónde están los JSON y cómo se piden.
 * Los componentes solo llaman a estas funciones: si mañana los datos vienen
 * de una API real (EP3), se cambia este archivo y los componentes no se tocan.
 */

// Ruta relativa (sin "/" inicial): se resuelve desde la página actual, así funciona
// igual en localhost:5173/ que en GitHub Pages (angelo-93.github.io/portafolio-angelo-pastene/).
const RUTA_DATOS = 'data/'

/**
 * Descarga un archivo JSON de la carpeta public/data y lo convierte en objeto.
 * @param {string} nombreArchivo - Nombre del archivo, por ejemplo 'noticias.json'.
 * @returns {Promise<any>} Los datos ya convertidos desde JSON.
 * @throws {Error} Si el servidor responde con error (por ejemplo 404) o falla la red.
 */
export async function cargarJson(nombreArchivo) {
  const respuesta = await fetch(`${RUTA_DATOS}${nombreArchivo}`)
  // fetch NO lanza error ante un 404 o 500: solo marca respuesta.ok = false.
  // Hay que revisarlo a mano; si no, se intentaría leer como JSON una página de error.
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${nombreArchivo} (HTTP ${respuesta.status})`)
  }
  return respuesta.json()
}

/**
 * Carga perfil, proyectos y noticias al mismo tiempo.
 * Promise.all lanza las tres descargas en paralelo y espera a que terminen todas;
 * si una falla, falla el conjunto, y quien llama decide qué mostrar (try/catch).
 * @returns {Promise<{perfil: object, proyectos: object[], noticias: object[]}>}
 */
export async function cargarDatosPortafolio() {
  const [perfil, proyectos, noticias] = await Promise.all([
    cargarJson('perfil.json'),
    cargarJson('proyectos.json'),
    cargarJson('noticias.json'),
  ])
  return { perfil, proyectos, noticias }
}

/**
 * Devuelve solo las noticias de una categoría, de la más reciente a la más antigua.
 * Permite que un mismo componente de noticias se use para dos secciones distintas.
 * @param {object[]} noticias - Todas las noticias cargadas desde el JSON.
 * @param {string} categoria - Categoría a mostrar, por ejemplo 'academica' o 'tecnica'.
 * @returns {object[]} Un arreglo NUEVO; el original no se modifica.
 */
export function filtrarNoticiasPorCategoria(noticias = [], categoria) {
  return noticias
    .filter((noticia) => noticia.categoria === categoria)
    // Las fechas vienen como 'AAAA-MM-DD': ese formato se puede ordenar como texto,
    // porque año, mes y día van de mayor a menor importancia.
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}
