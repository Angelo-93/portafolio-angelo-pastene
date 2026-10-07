import Card from 'react-bootstrap/Card'
import { formatearFecha } from '../../utils/fechas.js'

/**
 * Tarjeta de una noticia: fecha, título y contenido breve.
 * La fecha va en <time dateTime="AAAA-MM-DD">: la persona lee el formato largo
 * y el navegador o buscador recibe la fecha en formato estándar.
 * @param {object} props
 * @param {{titulo: string, fecha: string, contenido: string}} props.noticia - Una noticia de noticias.json.
 */
function TarjetaNoticia({ noticia }) {
  const { titulo, fecha, contenido } = noticia

  return (
    <Card as="article" className="tarjeta tarjeta--noticia">
      <Card.Body>
        <time dateTime={fecha} className="tarjeta__fecha">{formatearFecha(fecha)}</time>
        <Card.Title as="h4" className="tarjeta__titulo h5 mt-2">{titulo}</Card.Title>
        <Card.Text className="mb-0">{contenido}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TarjetaNoticia
