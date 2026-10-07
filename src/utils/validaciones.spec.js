import { validarContacto, LARGO_MINIMO_MENSAJE } from './validaciones.js'

describe('validarContacto', () => {
  const DATOS_VALIDOS = { nombre: 'Ana', correo: 'ana@correo.cl', mensaje: 'Hola, me gustó tu portafolio.' }

  it('no devuelve errores cuando todos los campos son correctos', () => {
    expect(validarContacto(DATOS_VALIDOS)).toEqual({})
  })

  it('marca los tres campos cuando el formulario llega vacío', () => {
    const errores = validarContacto({})
    expect(Object.keys(errores)).toEqual(['nombre', 'correo', 'mensaje'])
  })

  it('considera vacío un nombre con solo espacios', () => {
    expect(validarContacto({ ...DATOS_VALIDOS, nombre: '   ' }).nombre).toBe('Ingresa tu nombre.')
  })

  it('rechaza un correo sin dominio', () => {
    expect(validarContacto({ ...DATOS_VALIDOS, correo: 'ana@correo' }).correo)
      .toBe('El correo no tiene un formato válido.')
  })

  // Caso de borde: el límite exacto. 9 caracteres no alcanza, 10 sí.
  it('exige el largo mínimo exacto del mensaje (caso de borde)', () => {
    const casiSuficiente = 'x'.repeat(LARGO_MINIMO_MENSAJE - 1)
    const justo = 'x'.repeat(LARGO_MINIMO_MENSAJE)

    expect(validarContacto({ ...DATOS_VALIDOS, mensaje: casiSuficiente }).mensaje).toBeDefined()
    expect(validarContacto({ ...DATOS_VALIDOS, mensaje: justo }).mensaje).toBeUndefined()
  })
})
