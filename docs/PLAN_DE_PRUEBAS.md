# Plan de pruebas — Portafolio personal

**Proyecto:** portafolio-angelo-pastene · **Asignatura:** DSY1104 Desarrollo Fullstack II · **Autor:** Angelo Pastene Acevedo

## 1. Objetivo

Verificar que cada componente del portafolio se dibuja correctamente, reacciona a las acciones del usuario y maneja sus datos y errores como se espera, sin depender de servicios externos.

## 2. Alcance

| Incluido | Excluido |
|---|---|
| Los 16 componentes React: 3 átomos, 4 moléculas, 7 organismos, la página y App | Estilos visuales (CSS): se revisan manualmente y con capturas |
| Servicio de carga de datos (`datosService.js`) | Envío real de correos (el formulario es de demostración) |
| Utilidades: validaciones, fechas y geometría | `main.jsx` (solo monta la app en el HTML) |
| Estructura de los JSON reales (pruebas de contrato) | |

## 3. Entorno y herramientas

| Herramienta | Versión | Función |
|---|---|---|
| Karma | 6.4.4 | Ejecuta las pruebas en navegadores reales |
| Jasmine | 4.6.1 | Sintaxis `describe` / `it` / `expect`, espías y mocks |
| React Testing Library | 16.3.3 | Renderiza componentes y los consulta como lo haría una persona (por rol, texto o etiqueta) |
| webpack + Babel | 5.111.1 / 8.0.6 | Traducen JSX para el navegador de pruebas |
| istanbul (karma-coverage) | 2.2.1 | Mide la cobertura de código |
| Navegadores | Chrome, Firefox y Edge (modo headless) | Ejecución en varios navegadores |

## 4. Tipos de prueba aplicados

| Tipo | Qué verifica | Ejemplo |
|---|---|---|
| Renderizado | El componente aparece en el DOM con su contenido | CP-51 Proyectos dibuja 3 tarjetas |
| Props | El componente muestra lo que recibe del padre | CP-40 TarjetaProyecto |
| Renderizado condicional | Muestra u oculta partes según los datos | CP-41 sin demo no hay botón "Ver demo" |
| Estado | El estado interno cambia y se refleja en pantalla | CP-55 formulario controlado |
| Eventos | Clics y escritura producen el efecto esperado | CP-45 botón del menú móvil |
| Mocks | Se reemplaza lo externo por una versión controlada | CP-12 `fetch` simulado con `spyOn` |
| Casos de borde | Valores justo en el límite de una regla | CP-05 mensaje de 9 vs 10 caracteres |
| Contrato | Los JSON reales tienen la forma que esperan los componentes | CP-20 a CP-28 |
| Accesibilidad | Nombres accesibles, `alt`, roles y regiones | CP-38, CP-47 |

## 5. Mocks y datos de prueba

Los datos de prueba se diseñaron a propósito para disparar cada caso, en vez de esperar que aparezcan solos:

- **`spyOn(window, 'fetch')`** reemplaza las descargas reales. Según la prueba responde datos válidos, un error HTTP 404 o 500, un fallo de red, o una promesa que nunca termina (para congelar la página en "cargando").
- **Promesas controladas:** se guardan sin resolver, para decidir cuándo llegan los datos (por ejemplo, después de cerrar la página: CP-66 y CP-67).
- **`jasmine.createSpy('onEnviar')`** reemplaza la función que recibe los datos del formulario, para comprobar si se llamó y con qué valores.
- **`spyOn(console, 'error')`** verifica que los errores se registren, sin ensuciar la salida.
- **Fechas desordenadas y el 1 de enero:** prueban el orden de las noticias y la corrección de zona horaria.
- **Mensaje de 9 y de 10 caracteres:** el límite exacto de la validación.
- **Imagen de 1×1 píxel incrustada (data URI):** evita descargas de imágenes durante las pruebas.

## 6. Criterios de aceptación

- El 100% de las pruebas debe pasar.
- La cobertura global debe ser de al menos **60%** en sentencias, ramas, funciones y líneas, umbral indicado por el docente (clase del 28-09-2026). `karma.conf.cjs` lo exige: si baja, `npm test` falla.

## 7. Casos de prueba (69)

### Utilidades

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-01 | `utils/validaciones.spec.js` | no devuelve errores cuando todos los campos son correctos | Lógica | `{}` (objeto vacío) | ✅ |
| CP-02 | `utils/validaciones.spec.js` | marca los tres campos cuando el formulario llega vacío | Lógica | Errores en `nombre`, `correo` y `mensaje` | ✅ |
| CP-03 | `utils/validaciones.spec.js` | considera vacío un nombre con solo espacios | Caso de borde | Error 'Ingresa tu nombre.' | ✅ |
| CP-04 | `utils/validaciones.spec.js` | rechaza un correo sin dominio | Lógica | Error 'El correo no tiene un formato válido.' | ✅ |
| CP-05 | `utils/validaciones.spec.js` | exige el largo mínimo exacto del mensaje | Caso de borde | 9 caracteres → error; 10 caracteres → sin error | ✅ |
| CP-06 | `utils/fechas.spec.js` | convierte AAAA-MM-DD en texto legible en español | Lógica | '2026-09-08' → '8 de septiembre de 2026' | ✅ |
| CP-07 | `utils/fechas.spec.js` | no corre la fecha un día hacia atrás por la zona horaria | Caso de borde | '2026-01-01' → '1 de enero de 2026' (no 31 de diciembre) | ✅ |
| CP-08 | `utils/fechas.spec.js` | devuelve el texto original si no es una fecha válida | Caso de borde | 'sin fecha' → 'sin fecha' | ✅ |
| CP-09 | `utils/geometria.spec.js` | puntoPolar convierte distancia y ángulo en coordenadas | Lógica | (10, 90°) → x ≈ 0, y ≈ 10 | ✅ |
| CP-10 | `utils/geometria.spec.js` | la Flor de la vida tiene 19 centros y el primero está en el origen | Lógica | 19 centros; el primero en (0, 0) | ✅ |
| CP-11 | `utils/geometria.spec.js` | los 6 círculos del primer anillo están a exactamente un radio del centro | Lógica | Distancia de cada centro = radio | ✅ |

### Servicio de datos (con mocks de `fetch`)

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-12 | `services/datosService.spec.js` | cargarJson pide el archivo a data/ y devuelve los datos convertidos | Mock | `fetch` llamado una vez con 'data/noticias.json'; devuelve el arreglo | ✅ |
| CP-13 | `services/datosService.spec.js` | cargarJson lanza un error con el código HTTP cuando el archivo no existe (404) | Mock · error | Error 'No se pudo cargar inexistente.json (HTTP 404)' | ✅ |
| CP-14 | `services/datosService.spec.js` | cargarJson propaga el error cuando falla la conexión | Mock · error | Rechaza con `TypeError('Failed to fetch')` | ✅ |
| CP-15 | `services/datosService.spec.js` | cargarDatosPortafolio carga los tres archivos y agrupa cada uno con su nombre | Mock | 3 llamadas a `fetch`; objeto `{perfil, proyectos, noticias}` | ✅ |
| CP-16 | `services/datosService.spec.js` | cargarDatosPortafolio falla completo si uno de los archivos no se puede cargar | Mock · error | Error 'No se pudo cargar proyectos.json (HTTP 500)' | ✅ |
| CP-17 | `services/datosService.spec.js` | filtrarNoticiasPorCategoria deja solo la categoría pedida, de la más reciente a la más antigua | Lógica | ['Reciente', 'Antigua', 'Inicio de año'] | ✅ |
| CP-18 | `services/datosService.spec.js` | filtrarNoticiasPorCategoria no modifica el arreglo original | Lógica | El arreglo de entrada queda igual | ✅ |
| CP-19 | `services/datosService.spec.js` | filtrarNoticiasPorCategoria devuelve un arreglo vacío si no hay coincidencias o no llegan noticias | Caso de borde | `[]` en ambos casos | ✅ |

### Contrato de los JSON reales

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-20 | `services/contratoDatos.spec.js` | perfil.json trae nombre, título, biografía y foto | Contrato | Los 4 campos son textos con contenido | ✅ |
| CP-21 | `services/contratoDatos.spec.js` | perfil.json trae párrafos para 'Sobre mí' y una lista de habilidades | Contrato | Al menos 1 párrafo y 1 habilidad | ✅ |
| CP-22 | `services/contratoDatos.spec.js` | perfil.json: cada red social tiene nombre y una URL segura (https) | Contrato | Todas las URL empiezan con https:// | ✅ |
| CP-23 | `services/contratoDatos.spec.js` | proyectos.json tiene al menos tres proyectos | Contrato | 3 o más proyectos (lo exige el enunciado) | ✅ |
| CP-24 | `services/contratoDatos.spec.js` | proyectos.json: cada proyecto trae título, descripción, imagen y tecnologías | Contrato | Campos presentes y al menos 1 tecnología | ✅ |
| CP-25 | `services/contratoDatos.spec.js` | proyectos.json: cada proyecto tiene enlace a su repositorio o a su demo | Contrato | Ningún proyecto sin enlace | ✅ |
| CP-26 | `services/contratoDatos.spec.js` | noticias.json: cada noticia trae título, contenido, categoría válida y fecha AAAA-MM-DD | Contrato | Categoría 'academica' o 'tecnica'; fecha con formato válido | ✅ |
| CP-27 | `services/contratoDatos.spec.js` | noticias.json no repite identificadores | Contrato | Todos los `id` son distintos | ✅ |
| CP-28 | `services/contratoDatos.spec.js` | noticias.json tiene noticias para las dos secciones | Contrato | Al menos 1 noticia por categoría | ✅ |

### Átomos

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-29 | `atoms/GeometriaSagrada.spec.jsx` | dibuja los 19 círculos de la Flor de la vida | Renderizado | 19 elementos `.geometria-sagrada__petalo` | ✅ |
| CP-30 | `atoms/GeometriaSagrada.spec.jsx` | es decorativa (aria-hidden) y suma la clase recibida por props | Props · Accesibilidad | `aria-hidden="true"` y clase 'mi-clase' | ✅ |
| CP-31 | `atoms/Icono.spec.jsx` | dibuja el ícono pedido con el tamaño indicado | Props | Ícono 'github' con ancho 32 | ✅ |
| CP-32 | `atoms/Icono.spec.jsx` | usa el ícono genérico de enlace si el nombre no existe | Renderizado condicional | Se dibuja el ícono 'enlace' | ✅ |
| CP-33 | `atoms/EnlaceSaltarContenido.spec.jsx` | apunta a #contenido por defecto | Renderizado · Accesibilidad | `href="#contenido"` | ✅ |
| CP-34 | `atoms/EnlaceSaltarContenido.spec.jsx` | apunta al destino recibido por props | Props | `href="#proyectos"` | ✅ |

### Moléculas

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-35 | `molecules/TituloSeccion.spec.jsx` | muestra el título como h2 con el id recibido | Props | h2 'Proyectos' con id 'titulo-x' | ✅ |
| CP-36 | `molecules/TituloSeccion.spec.jsx` | muestra el subtítulo solo cuando lo recibe | Renderizado condicional | Sin prop: no hay subtítulo; con prop: aparece | ✅ |
| CP-37 | `molecules/EnlacesRedes.spec.jsx` | crea un enlace por cada red recibida | Props | 2 enlaces para 2 redes | ✅ |
| CP-38 | `molecules/EnlacesRedes.spec.jsx` | cada enlace tiene nombre accesible y abre pestaña nueva de forma segura | Accesibilidad | aria-label, `target="_blank"`, `rel` con noopener | ✅ |
| CP-39 | `molecules/EnlacesRedes.spec.jsx` | no dibuja enlaces si no recibe redes | Caso de borde | 0 enlaces | ✅ |
| CP-40 | `molecules/TarjetaProyecto.spec.jsx` | muestra título, descripción, imagen y tecnologías recibidos por props | Props | Título, texto, `alt` de la imagen y 2 tecnologías | ✅ |
| CP-41 | `molecules/TarjetaProyecto.spec.jsx` | sin demo, muestra solo el botón del repositorio | Renderizado condicional | Enlace 'Repositorio' sí; 'Ver demo' no | ✅ |
| CP-42 | `molecules/TarjetaProyecto.spec.jsx` | con demo y sin repositorio, muestra solo el botón de la demo | Renderizado condicional | Enlace 'Ver demo' sí; 'Repositorio' no | ✅ |
| CP-43 | `molecules/TarjetaNoticia.spec.jsx` | muestra título, contenido y la fecha legible con su valor estándar en datetime | Props · DOM | `<time datetime="2026-09-08">8 de septiembre de 2026</time>` | ✅ |

### Organismos

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-44 | `organisms/BarraNavegacion.spec.jsx` | muestra la marca y un enlace por cada sección recibida | Props | Marca visible y enlace '#proyectos' | ✅ |
| CP-45 | `organisms/BarraNavegacion.spec.jsx` | el botón de menú despliega y vuelve a plegar los enlaces | Eventos · Estado | Clic: se quita 'collapsed'; segundo clic: vuelve | ✅ |
| CP-46 | `organisms/Portada.spec.jsx` | muestra el nombre como título principal (h1), el título y la biografía | Renderizado · Props | h1 con el nombre, título y biografía visibles | ✅ |
| CP-47 | `organisms/Portada.spec.jsx` | muestra la foto con texto alternativo descriptivo | Accesibilidad | img con `alt` 'Fotografía de …' | ✅ |
| CP-48 | `organisms/Portada.spec.jsx` | ofrece accesos a proyectos, contacto y redes | DOM | Enlaces a '#proyectos', '#contacto' y GitHub | ✅ |
| CP-49 | `organisms/SobreMi.spec.jsx` | muestra cada párrafo y cada habilidad recibidos por props | Props | 2 párrafos y 3 habilidades | ✅ |
| CP-50 | `organisms/SobreMi.spec.jsx` | la sección queda nombrada por su título para lectores de pantalla | Accesibilidad | Región con nombre 'Sobre mí' | ✅ |
| CP-51 | `organisms/Proyectos.spec.jsx` | dibuja una tarjeta por cada proyecto recibido | Renderizado · Props | 3 `article` para 3 proyectos | ✅ |
| CP-52 | `organisms/SeccionNoticias.spec.jsx` | muestra solo las noticias de su categoría, la más reciente primero | Props · Lógica | ['Académica reciente', 'Académica antigua'] | ✅ |
| CP-53 | `organisms/SeccionNoticias.spec.jsx` | el mismo componente sirve para otra categoría con otras props | Props · Reutilización | Título 'Técnicas' y 1 noticia | ✅ |
| CP-54 | `organisms/SeccionNoticias.spec.jsx` | muestra un mensaje cuando la categoría no tiene noticias | Renderizado condicional | 'Aún no hay noticias en esta sección.' | ✅ |
| CP-55 | `organisms/FormularioContacto.spec.jsx` | cada campo muestra lo que se escribe | Estado · Eventos | El input 'Nombre' vale 'Ana' | ✅ |
| CP-56 | `organisms/FormularioContacto.spec.jsx` | al enviar vacío muestra los tres errores y no envía nada | Eventos · Mock | 3 mensajes de error; espía `onEnviar` sin llamadas | ✅ |
| CP-57 | `organisms/FormularioContacto.spec.jsx` | avisa cuando el correo no tiene formato válido | Eventos · Estado | 'El correo no tiene un formato válido.' | ✅ |
| CP-58 | `organisms/FormularioContacto.spec.jsx` | borra el error de un campo apenas la persona lo corrige | Estado · Eventos | Desaparece `is-invalid` y el mensaje | ✅ |
| CP-59 | `organisms/FormularioContacto.spec.jsx` | con datos válidos entrega los datos, confirma con el nombre y limpia el formulario | Eventos · Mock · Estado | Espía llamado 1 vez con los datos; '¡Gracias, Ana!'; campos vacíos | ✅ |
| CP-60 | `organisms/FormularioContacto.spec.jsx` | la confirmación se puede cerrar | Eventos · Condicional | Desaparece el aviso de confirmación | ✅ |
| CP-61 | `organisms/PiePagina.spec.jsx` | muestra el año actual, el nombre y las redes | Renderizado | '© <año> Persona', enlace a GitHub y `<footer>` | ✅ |

### Página y App

| ID | Archivo | Caso de prueba | Tipo | Resultado esperado | Obtenido |
|---|---|---|---|---|---|
| CP-62 | `pages/PaginaPortafolio.spec.jsx` | mientras espera los datos muestra el indicador de carga | Mock · Condicional | Spinner con 'Cargando portafolio…' | ✅ |
| CP-63 | `pages/PaginaPortafolio.spec.jsx` | cuando llegan los datos dibuja todas las secciones con ellos | Mock · Estado · Asíncrono | h1, 3 proyectos, 2 secciones de noticias y formulario | ✅ |
| CP-64 | `pages/PaginaPortafolio.spec.jsx` | si la carga falla muestra el aviso de error y registra el problema | Mock · Error | Aviso 'No pudimos cargar…'; `console.error` llamado | ✅ |
| CP-65 | `pages/PaginaPortafolio.spec.jsx` | el botón Reintentar vuelve a pedir los datos y, si llegan, muestra la página | Eventos · Mock · Estado | 6 llamadas a `fetch` (3 fallidas + 3 exitosas); página visible | ✅ |
| CP-66 | `pages/PaginaPortafolio.spec.jsx` | si se cierra antes de que lleguen los datos, no dibuja contenido | Caso de borde · Mock | Sin h1 y sin errores registrados | ✅ |
| CP-67 | `pages/PaginaPortafolio.spec.jsx` | si se cierra antes de que llegue un error, no muestra el aviso | Caso de borde · Mock | Sin aviso de error | ✅ |
| CP-68 | `App.spec.jsx` | ensambla el enlace de accesibilidad, el menú y la página | Renderizado | Enlace 'Saltar…', `<nav>` y `<main>` presentes | ✅ |
| CP-69 | `App.spec.jsx` | el menú tiene un enlace a cada una de las cinco secciones | DOM | 5 enlaces: #inicio … #contacto | ✅ |

## 8. Cómo ejecutar

```bash
npm test                  # Chrome headless + informe de cobertura en coverage/index.html
npm run test:navegadores  # Chrome, Firefox y Edge
npm run test:watch        # Chrome con ventana; vuelve a ejecutar al guardar cambios
```

## 9. Resultado

**69 de 69 pruebas aprobadas.** El detalle de la cobertura está en [INFORME_COBERTURA.md](INFORME_COBERTURA.md).
