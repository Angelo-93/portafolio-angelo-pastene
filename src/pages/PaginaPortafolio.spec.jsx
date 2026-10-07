import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import PaginaPortafolio from './PaginaPortafolio.jsx'

// Imagen de 1×1 píxel incrustada: evita que el navegador de pruebas intente
// descargar un archivo que no existe (y llene la salida de avisos 404).
const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Datos de prueba: mínimos, pero con la misma forma que los JSON reales.
const PERFIL = {
  nombre: 'Persona de Prueba',
  titulo: 'Estudiante',
  biografia: 'Bio',
  foto: IMAGEN_FALSA,
  sobreMi: ['Párrafo'],
  habilidades: ['React'],
  redes: [{ nombre: 'GitHub', url: 'https://github.com/x' }],
}
const PROYECTOS = [1, 2, 3].map((id) => ({
  id, titulo: `Proyecto ${id}`, descripcion: 'd', imagen: IMAGEN_FALSA, tecnologias: ['React'], repositorio: 'https://github.com/x', demo: null,
}))
const NOTICIAS = [
  { id: 1, categoria: 'academica', titulo: 'Noticia académica', fecha: '2026-09-08', contenido: 'a' },
  { id: 2, categoria: 'tecnica', titulo: 'Noticia técnica', fecha: '2026-09-28', contenido: 'b' },
]
const RESPUESTAS = {
  'data/perfil.json': PERFIL,
  'data/proyectos.json': PROYECTOS,
  'data/noticias.json': NOTICIAS,
}

/** Mock de fetch que responde como un servidor con los tres JSON de prueba. */
function simularServidorOk() {
  return spyOn(window, 'fetch').and.callFake((url) =>
    Promise.resolve(new Response(JSON.stringify(RESPUESTAS[url]), { status: 200 })),
  )
}

/**
 * Mock de fetch "manual": guarda las promesas sin resolverlas, para que la prueba
 * decida CUÁNDO llegan los datos (por ejemplo, después de cerrar la página).
 */
function simularServidorControlado() {
  const pendientes = []
  spyOn(window, 'fetch').and.callFake((url) => new Promise((resolver) => pendientes.push({ url, resolver })))
  return {
    responder: (status) => pendientes.forEach(({ url, resolver }) =>
      resolver(new Response(JSON.stringify(RESPUESTAS[url]), { status }))),
  }
}

/** Espera a que terminen las promesas pendientes (un "tick" del navegador). */
const esperarUnTick = () => new Promise((resolver) => setTimeout(resolver, 0))

describe('PaginaPortafolio', () => {
  afterEach(cleanup)

  it('mientras espera los datos muestra el indicador de carga', () => {
    // Una promesa que nunca termina deja la página detenida en "cargando".
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {}))
    render(<PaginaPortafolio />)

    expect(screen.getByRole('status').textContent).toContain('Cargando portafolio')
  })

  it('cuando llegan los datos dibuja todas las secciones con ellos', async () => {
    simularServidorOk()
    render(<PaginaPortafolio />)

    // findBy espera (asíncrono) a que el elemento aparezca tras cargar los datos.
    expect(await screen.findByRole('heading', { level: 1, name: 'Persona de Prueba' })).toBeTruthy()
    expect(screen.getAllByRole('heading', { level: 3, name: /Proyecto \d/ }).length).toBe(3)
    expect(screen.getByRole('heading', { name: 'Novedades académicas' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Aprendizajes técnicos' })).toBeTruthy()
    expect(screen.getByText('Noticia académica')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Enviar mensaje' })).toBeTruthy()
    expect(screen.queryByText(/Cargando portafolio/)).toBeNull()
  })

  it('si la carga falla muestra el aviso de error y registra el problema', async () => {
    spyOn(window, 'fetch').and.resolveTo(new Response('{}', { status: 500 }))
    // Se espía console.error para comprobar que el error se registra (y no ensuciar la salida).
    spyOn(console, 'error')
    render(<PaginaPortafolio />)

    expect(await screen.findByText(/No pudimos cargar el portafolio/)).toBeTruthy()
    expect(console.error).toHaveBeenCalled()
  })

  it('el botón Reintentar vuelve a pedir los datos y, si llegan, muestra la página', async () => {
    // Primera vez falla, segunda vez funciona: callFake cambia según el número de llamadas.
    let llamadas = 0
    spyOn(window, 'fetch').and.callFake((url) => {
      llamadas += 1
      const fallar = llamadas <= 3
      return Promise.resolve(fallar
        ? new Response('{}', { status: 500 })
        : new Response(JSON.stringify(RESPUESTAS[url]), { status: 200 }))
    })
    spyOn(console, 'error')
    render(<PaginaPortafolio />)

    fireEvent.click(await screen.findByRole('button', { name: 'Reintentar' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Persona de Prueba' })).toBeTruthy()
    expect(window.fetch).toHaveBeenCalledTimes(6)
  })

  describe('si la página se cierra antes de que lleguen los datos', () => {
    it('no dibuja contenido cuando la respuesta llega tarde', async () => {
      const servidor = simularServidorControlado()
      spyOn(console, 'error')
      const { unmount } = render(<PaginaPortafolio />)

      unmount()
      servidor.responder(200)
      await esperarUnTick()

      expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
      expect(console.error).not.toHaveBeenCalled()
    })

    it('no muestra el aviso de error cuando el error llega tarde', async () => {
      const servidor = simularServidorControlado()
      spyOn(console, 'error')
      const { unmount } = render(<PaginaPortafolio />)

      unmount()
      servidor.responder(500)
      await esperarUnTick()

      expect(screen.queryByText(/No pudimos cargar el portafolio/)).toBeNull()
    })
  })
})
