import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import BarraNavegacion from './BarraNavegacion.jsx'

const SECCIONES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'proyectos', texto: 'Proyectos' },
]

describe('BarraNavegacion', () => {
  afterEach(cleanup)

  it('muestra la marca y un enlace por cada sección recibida', () => {
    render(<BarraNavegacion marca="Angelo Pastene" secciones={SECCIONES} />)

    expect(screen.getByText('Angelo Pastene')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Proyectos' }).getAttribute('href')).toBe('#proyectos')
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeTruthy()
  })

  it('el botón de menú despliega y vuelve a plegar los enlaces (evento + estado)', () => {
    render(<BarraNavegacion marca="AP" secciones={SECCIONES} />)
    const boton = screen.getByRole('button', { name: 'Mostrar u ocultar el menú' })

    // React-Bootstrap marca el botón con la clase "collapsed" mientras el menú está cerrado.
    expect(boton.classList).toContain('collapsed')
    fireEvent.click(boton)
    expect(boton.classList).not.toContain('collapsed')
    fireEvent.click(boton)
    expect(boton.classList).toContain('collapsed')
  })
})
