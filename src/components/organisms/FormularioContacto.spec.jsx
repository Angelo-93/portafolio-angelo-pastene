import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormularioContacto from './FormularioContacto.jsx'

/** Simula que la persona escribe en el campo con esa etiqueta. */
const escribir = (etiqueta, valor) => fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
const enviar = () => fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

describe('FormularioContacto', () => {
  afterEach(cleanup)

  it('cada campo muestra lo que se escribe (estado controlado)', () => {
    render(<FormularioContacto />)
    escribir('Nombre', 'Ana')
    expect(screen.getByLabelText('Nombre').value).toBe('Ana')
  })

  it('al enviar vacío muestra los tres errores y no envía nada', () => {
    // Mock: un espía de Jasmine reemplaza la función que recibiría los datos,
    // así se puede comprobar si se llamó y con qué, sin enviar nada real.
    const onEnviar = jasmine.createSpy('onEnviar')
    render(<FormularioContacto onEnviar={onEnviar} />)

    enviar()

    expect(screen.getByText('Ingresa tu nombre.')).toBeTruthy()
    expect(screen.getByText('Ingresa tu correo.')).toBeTruthy()
    expect(screen.getByText(/al menos 10 caracteres/)).toBeTruthy()
    expect(screen.getByLabelText('Nombre').classList).toContain('is-invalid')
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('avisa cuando el correo no tiene formato válido', () => {
    render(<FormularioContacto />)
    escribir('Correo', 'correo-sin-arroba')
    enviar()
    expect(screen.getByText('El correo no tiene un formato válido.')).toBeTruthy()
  })

  it('borra el error de un campo apenas la persona lo corrige', () => {
    render(<FormularioContacto />)
    enviar()
    expect(screen.getByLabelText('Nombre').classList).toContain('is-invalid')

    escribir('Nombre', 'Ana')

    expect(screen.getByLabelText('Nombre').classList).not.toContain('is-invalid')
    expect(screen.queryByText('Ingresa tu nombre.')).toBeNull()
  })

  it('con datos válidos entrega los datos, confirma con el nombre y limpia el formulario', () => {
    const onEnviar = jasmine.createSpy('onEnviar')
    render(<FormularioContacto onEnviar={onEnviar} />)

    escribir('Nombre', 'Ana')
    escribir('Correo', 'ana@correo.cl')
    escribir('Mensaje', 'Me gustó mucho tu portafolio.')
    enviar()

    expect(onEnviar).toHaveBeenCalledOnceWith({
      nombre: 'Ana',
      correo: 'ana@correo.cl',
      mensaje: 'Me gustó mucho tu portafolio.',
    })
    expect(screen.getByRole('status').textContent).toContain('¡Gracias, Ana!')
    expect(screen.getByLabelText('Nombre').value).toBe('')
  })

  it('la confirmación se puede cerrar', () => {
    render(<FormularioContacto />)
    escribir('Nombre', 'Ana')
    escribir('Correo', 'ana@correo.cl')
    escribir('Mensaje', 'Mensaje de prueba largo.')
    enviar()

    fireEvent.click(screen.getByRole('button', { name: 'Close alert' }))

    expect(screen.queryByRole('status')).toBeNull()
  })
})
