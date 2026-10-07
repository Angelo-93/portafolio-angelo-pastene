import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// El CSS de Bootstrap va primero y nuestros estilos después, para que las
// reglas propias puedan sobrescribir a Bootstrap cuando tengan igual especificidad.
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/estilos.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
