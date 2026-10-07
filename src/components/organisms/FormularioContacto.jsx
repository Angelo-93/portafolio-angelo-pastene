import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import TituloSeccion from '../molecules/TituloSeccion.jsx'
import { validarContacto } from '../../utils/validaciones.js'

const FORMULARIO_VACIO = { nombre: '', correo: '', mensaje: '' }

/**
 * Formulario de contacto controlado: cada input muestra lo que hay en el estado
 * y cada tecla actualiza el estado (onChange). Así React es la única fuente de verdad.
 * No hay backend: al enviar, entrega los datos a onEnviar y muestra una confirmación.
 * @param {object} props
 * @param {(datos: {nombre: string, correo: string, mensaje: string}) => void} [props.onEnviar]
 *   Función que recibe los datos válidos. Las pruebas pasan un espía para revisar qué llegó.
 */
function FormularioContacto({ onEnviar = () => {} }) {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [nombreConfirmado, setNombreConfirmado] = useState('')

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    // Al corregir un campo se borra su error, para no seguir mostrando
    // un aviso que ya no corresponde mientras la persona escribe.
    if (errores[name]) {
      setErrores({ ...errores, [name]: undefined })
    }
  }

  const manejarEnvio = (evento) => {
    // Sin esto, el navegador recargaría la página al enviar el formulario.
    evento.preventDefault()
    const nuevosErrores = validarContacto(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      setNombreConfirmado('')
      return
    }
    onEnviar({ ...datos })
    setNombreConfirmado(datos.nombre.trim())
    setDatos(FORMULARIO_VACIO)
  }

  return (
    <section id="contacto" className="seccion" aria-labelledby="titulo-contacto">
      <Container>
        <TituloSeccion id="titulo-contacto" titulo="Contacto" subtitulo="¿Conversamos? Déjame un mensaje" />
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={7}>
            {nombreConfirmado && (
              <Alert variant="success" dismissible onClose={() => setNombreConfirmado('')} role="status">
                ¡Gracias, {nombreConfirmado}! Tu mensaje quedó registrado.
              </Alert>
            )}
            {/* noValidate: desactiva los avisos nativos del navegador para usar los nuestros, iguales en todos. */}
            <Form noValidate onSubmit={manejarEnvio} className="formulario-contacto">
              <Form.Group className="mb-3" controlId="contacto-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={datos.nombre}
                  onChange={manejarCambio}
                  isInvalid={Boolean(errores.nombre)}
                  autoComplete="name"
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contacto-correo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={datos.correo}
                  onChange={manejarCambio}
                  isInvalid={Boolean(errores.correo)}
                  autoComplete="email"
                />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="contacto-mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="mensaje"
                  value={datos.mensaje}
                  onChange={manejarCambio}
                  isInvalid={Boolean(errores.mensaje)}
                />
                <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex flex-wrap align-items-center gap-3">
                <Button type="submit" variant="oro">Enviar mensaje</Button>
                <Form.Text className="texto-suave">Formulario de demostración: no envía correos reales.</Form.Text>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default FormularioContacto
