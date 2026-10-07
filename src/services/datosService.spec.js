import {
  cargarJson,
  cargarDatosPortafolio,
  filtrarNoticiasPorCategoria,
} from './datosService.js'

/*
 * Mock de fetch: estas pruebas NUNCA descargan archivos reales.
 * spyOn reemplaza window.fetch por una función falsa que responde lo que
 * definimos aquí, y Jasmine restaura el fetch original al terminar cada prueba.
 * Así se prueba la lógica del servicio sin depender de un servidor (clase 28-09).
 */

/** Arma una respuesta HTTP falsa con el cuerpo y el código indicados. */
function crearRespuesta(cuerpo, status = 200) {
  return new Response(JSON.stringify(cuerpo), { status })
}

// Datos de prueba diseñados a propósito:
// - fechas desordenadas, para comprobar que el filtro ordena;
// - una noticia de otra categoría, para comprobar que se excluye.
const NOTICIAS_DE_PRUEBA = [
  { id: 1, categoria: 'academica', titulo: 'Antigua', fecha: '2026-03-10' },
  { id: 2, categoria: 'tecnica', titulo: 'De otra categoría', fecha: '2026-12-31' },
  { id: 3, categoria: 'academica', titulo: 'Reciente', fecha: '2026-09-08' },
  { id: 4, categoria: 'academica', titulo: 'Inicio de año', fecha: '2026-01-01' },
]

describe('datosService', () => {
  describe('cargarJson', () => {
    it('pide el archivo a la carpeta data/ y devuelve los datos convertidos', async () => {
      spyOn(window, 'fetch').and.resolveTo(crearRespuesta([{ id: 1 }]))

      const datos = await cargarJson('noticias.json')

      expect(window.fetch).toHaveBeenCalledOnceWith('data/noticias.json')
      expect(datos).toEqual([{ id: 1 }])
    })

    it('lanza un error con el código HTTP cuando el archivo no existe (404)', async () => {
      spyOn(window, 'fetch').and.resolveTo(crearRespuesta({}, 404))

      await expectAsync(cargarJson('inexistente.json'))
        .toBeRejectedWithError('No se pudo cargar inexistente.json (HTTP 404)')
    })

    it('propaga el error cuando falla la conexión', async () => {
      spyOn(window, 'fetch').and.rejectWith(new TypeError('Failed to fetch'))

      await expectAsync(cargarJson('noticias.json'))
        .toBeRejectedWithError(TypeError, 'Failed to fetch')
    })
  })

  describe('cargarDatosPortafolio', () => {
    it('carga los tres archivos y agrupa cada uno con su nombre', async () => {
      // callFake responde distinto según la URL pedida, como lo haría un servidor.
      const respuestasPorUrl = {
        'data/perfil.json': { nombre: 'Angelo' },
        'data/proyectos.json': [{ id: 1 }],
        'data/noticias.json': [{ id: 2 }],
      }
      spyOn(window, 'fetch').and.callFake((url) =>
        Promise.resolve(crearRespuesta(respuestasPorUrl[url])),
      )

      const datos = await cargarDatosPortafolio()

      expect(window.fetch).toHaveBeenCalledTimes(3)
      expect(datos).toEqual({
        perfil: { nombre: 'Angelo' },
        proyectos: [{ id: 1 }],
        noticias: [{ id: 2 }],
      })
    })

    it('falla completo si uno de los archivos no se puede cargar', async () => {
      spyOn(window, 'fetch').and.callFake((url) =>
        Promise.resolve(url === 'data/proyectos.json' ? crearRespuesta({}, 500) : crearRespuesta({})),
      )

      await expectAsync(cargarDatosPortafolio())
        .toBeRejectedWithError('No se pudo cargar proyectos.json (HTTP 500)')
    })
  })

  describe('filtrarNoticiasPorCategoria', () => {
    it('deja solo la categoría pedida, de la más reciente a la más antigua', () => {
      const resultado = filtrarNoticiasPorCategoria(NOTICIAS_DE_PRUEBA, 'academica')

      expect(resultado.map((noticia) => noticia.titulo))
        .toEqual(['Reciente', 'Antigua', 'Inicio de año'])
    })

    it('no modifica el arreglo original', () => {
      const copia = [...NOTICIAS_DE_PRUEBA]

      filtrarNoticiasPorCategoria(NOTICIAS_DE_PRUEBA, 'academica')

      expect(NOTICIAS_DE_PRUEBA).toEqual(copia)
    })

    it('devuelve un arreglo vacío si no hay coincidencias o no llegan noticias', () => {
      expect(filtrarNoticiasPorCategoria(NOTICIAS_DE_PRUEBA, 'deportes')).toEqual([])
      expect(filtrarNoticiasPorCategoria(undefined, 'academica')).toEqual([])
    })
  })
})
