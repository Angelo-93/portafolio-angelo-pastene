import { render, screen, cleanup } from '@testing-library/react'
import Portada from './Portada.jsx'

// Imagen de 1×1 píxel incrustada: evita que el navegador de pruebas intente
// descargar un archivo que no existe (y llene la salida de avisos 404).
const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const PERFIL = {
  nombre: 'Persona de Prueba',
  titulo: 'Estudiante',
  biografia: 'Biografía de prueba.',
  foto: IMAGEN_FALSA,
  redes: [{ nombre: 'GitHub', url: 'https://github.com/x' }],
}

describe('Portada', () => {
  afterEach(cleanup)

  it('muestra el nombre como título principal (h1), el título y la biografía', () => {
    render(<Portada perfil={PERFIL} />)
    expect(screen.getByRole('heading', { level: 1, name: 'Persona de Prueba' })).toBeTruthy()
    expect(screen.getByText('Estudiante')).toBeTruthy()
    expect(screen.getByText('Biografía de prueba.')).toBeTruthy()
  })

  it('muestra la foto con texto alternativo descriptivo', () => {
    render(<Portada perfil={PERFIL} />)
    const foto = screen.getByRole('img', { name: 'Fotografía de Persona de Prueba' })
    expect(foto.getAttribute('src')).toBe(IMAGEN_FALSA)
  })

  it('ofrece accesos a proyectos, contacto y redes', () => {
    render(<Portada perfil={PERFIL} />)
    expect(screen.getByRole('link', { name: 'Ver proyectos' }).getAttribute('href')).toBe('#proyectos')
    expect(screen.getByRole('link', { name: 'Contactar' }).getAttribute('href')).toBe('#contacto')
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeTruthy()
  })
})
