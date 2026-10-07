/*
 * Pruebas de "contrato" de los JSON reales.
 * Los componentes confían en que los datos traen ciertos campos; si al editar un
 * JSON se borra un campo o se escribe mal una fecha, estas pruebas lo detectan
 * antes de que la página se rompa. A diferencia de datosService.spec.js, aquí
 * se leen los archivos verdaderos (webpack permite importar JSON directamente).
 */
import perfil from '../../public/data/perfil.json'
import proyectos from '../../public/data/proyectos.json'
import noticias from '../../public/data/noticias.json'

const CATEGORIAS_VALIDAS = ['academica', 'tecnica']
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/

/** true si el valor es un texto con contenido (no vacío ni solo espacios). */
const esTextoConContenido = (valor) => typeof valor === 'string' && valor.trim() !== ''

describe('Contrato de los datos JSON', () => {
  describe('perfil.json', () => {
    it('trae nombre, título, biografía y foto', () => {
      expect(esTextoConContenido(perfil.nombre)).toBeTrue()
      expect(esTextoConContenido(perfil.titulo)).toBeTrue()
      expect(esTextoConContenido(perfil.biografia)).toBeTrue()
      expect(esTextoConContenido(perfil.foto)).toBeTrue()
    })

    it('trae párrafos para "Sobre mí" y una lista de habilidades', () => {
      expect(perfil.sobreMi.length).toBeGreaterThan(0)
      perfil.sobreMi.forEach((parrafo) => expect(esTextoConContenido(parrafo)).toBeTrue())
      expect(perfil.habilidades.length).toBeGreaterThan(0)
    })

    it('cada red social tiene nombre y una URL segura (https)', () => {
      perfil.redes.forEach((red) => {
        expect(esTextoConContenido(red.nombre)).toBeTrue()
        expect(red.url).toMatch(/^https:\/\//)
      })
    })
  })

  describe('proyectos.json', () => {
    it('tiene al menos tres proyectos (lo exige el enunciado)', () => {
      expect(proyectos.length).toBeGreaterThanOrEqual(3)
    })

    it('cada proyecto trae título, descripción, imagen y tecnologías', () => {
      proyectos.forEach((proyecto) => {
        expect(esTextoConContenido(proyecto.titulo)).toBeTrue()
        expect(esTextoConContenido(proyecto.descripcion)).toBeTrue()
        expect(esTextoConContenido(proyecto.imagen)).toBeTrue()
        expect(proyecto.tecnologias.length).toBeGreaterThan(0)
      })
    })

    it('cada proyecto tiene enlace a su repositorio o a su demo', () => {
      const sinEnlace = proyectos
        .filter((proyecto) => !proyecto.repositorio && !proyecto.demo)
        .map((proyecto) => proyecto.titulo)
      expect(sinEnlace).toEqual([])
    })
  })

  describe('noticias.json', () => {
    it('cada noticia trae título, contenido, categoría válida y fecha AAAA-MM-DD', () => {
      noticias.forEach((noticia) => {
        expect(esTextoConContenido(noticia.titulo)).toBeTrue()
        expect(esTextoConContenido(noticia.contenido)).toBeTrue()
        expect(CATEGORIAS_VALIDAS).toContain(noticia.categoria)
        expect(noticia.fecha).toMatch(FORMATO_FECHA)
      })
    })

    it('no repite identificadores', () => {
      const ids = noticias.map((noticia) => noticia.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('tiene noticias para las dos secciones', () => {
      CATEGORIAS_VALIDAS.forEach((categoria) => {
        expect(noticias.some((noticia) => noticia.categoria === categoria)).toBeTrue()
      })
    })
  })
})
