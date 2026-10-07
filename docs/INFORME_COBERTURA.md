# Informe de cobertura de pruebas — Portafolio personal

**Proyecto:** portafolio-angelo-pastene · **Asignatura:** DSY1104 Desarrollo Fullstack II · **Autor:** Angelo Pastene Acevedo

## 1. ¿Qué es la cobertura?

La cobertura mide qué porcentaje del código se ejecutó mientras corrían las pruebas. La herramienta **istanbul** (integrada con `babel-plugin-istanbul` y `karma-coverage`) marca cada línea, rama y función del código fuente, y al terminar cuenta cuáles se usaron.

| Métrica | Qué cuenta |
|---|---|
| **Statements (sentencias)** | Instrucciones ejecutadas |
| **Branches (ramas)** | Caminos de cada decisión: los dos lados de un `if`, de un `? :` o de un `&&` |
| **Functions (funciones)** | Funciones que se llamaron al menos una vez |
| **Lines (líneas)** | Líneas de código ejecutadas |

## 2. Configuración

- **Qué se mide:** todo el código de `src/`, salvo los archivos de prueba (`*.spec.js`, `*.spec.jsx`) y `main.jsx`.
- **Archivos sin prueba:** también se incluyen en la medición, para que aparezcan con 0% en vez de quedar ocultos. Sin esto, el porcentaje saldría inflado.
- **Umbral mínimo:** 60% en las cuatro métricas, el valor que el docente indicó como aceptable (clase del 28-09-2026). Está configurado en `karma.conf.cjs`: si la cobertura baja de ese número, `npm test` termina con error.
- **Informes generados en `coverage/`:** HTML navegable (`index.html`), resumen en la terminal y formato `lcov` para herramientas externas.

## 3. Resultado global

Ejecución con `npm test` (Chrome headless): **69 de 69 pruebas aprobadas.**

| Métrica | Cubierto | Porcentaje | Umbral | Estado |
|---|---|---|---|---|
| Statements | 118 / 118 | **100%** | 60% | ✅ Cumple |
| Branches | 48 / 48 | **100%** | 60% | ✅ Cumple |
| Functions | 49 / 49 | **100%** | 60% | ✅ Cumple |
| Lines | 117 / 117 | **100%** | 60% | ✅ Cumple |

![Informe HTML de cobertura](img/informe-cobertura.webp)

## 4. Detalle por archivo

| Archivo | Líneas | Ramas | Funciones |
|---|---|---|---|
| `src/App.jsx` | 100% (2/2) | — (0/0) | 100% (1/1) |
| `src/components/atoms/EnlaceSaltarContenido.jsx` | 100% (1/1) | 100% (1/1) | 100% (1/1) |
| `src/components/atoms/GeometriaSagrada.jsx` | 100% (9/9) | 100% (1/1) | 100% (5/5) |
| `src/components/atoms/Icono.jsx` | 100% (4/4) | 100% (5/5) | 100% (2/2) |
| `src/components/molecules/EnlacesRedes.jsx` | 100% (2/2) | 100% (2/2) | 100% (2/2) |
| `src/components/molecules/TarjetaNoticia.jsx` | 100% (2/2) | — (0/0) | 100% (1/1) |
| `src/components/molecules/TarjetaProyecto.jsx` | 100% (3/3) | 100% (4/4) | 100% (2/2) |
| `src/components/molecules/TituloSeccion.jsx` | 100% (1/1) | 100% (2/2) | 100% (1/1) |
| `src/components/organisms/BarraNavegacion.jsx` | 100% (2/2) | — (0/0) | 100% (2/2) |
| `src/components/organisms/FormularioContacto.jsx` | 100% (21/21) | 100% (7/7) | 100% (5/5) |
| `src/components/organisms/PiePagina.jsx` | 100% (2/2) | — (0/0) | 100% (1/1) |
| `src/components/organisms/Portada.jsx` | 100% (2/2) | — (0/0) | 100% (1/1) |
| `src/components/organisms/Proyectos.jsx` | 100% (2/2) | — (0/0) | 100% (2/2) |
| `src/components/organisms/SeccionNoticias.jsx` | 100% (3/3) | 100% (2/2) | 100% (2/2) |
| `src/components/organisms/SobreMi.jsx` | 100% (3/3) | — (0/0) | 100% (3/3) |
| `src/pages/PaginaPortafolio.jsx` | 100% (25/25) | 100% (8/8) | 100% (6/6) |
| `src/services/datosService.js` | 100% (10/10) | 100% (3/3) | 100% (5/5) |
| `src/utils/fechas.js` | 100% (4/4) | 100% (2/2) | 100% (1/1) |
| `src/utils/geometria.js` | 100% (7/7) | — (0/0) | 100% (5/5) |
| `src/utils/validaciones.js` | 100% (12/12) | 100% (11/11) | 100% (1/1) |

Un "—" significa que el archivo no tiene ramas (no tiene decisiones `if` o `? :`).

## 5. Ejecución en varios navegadores

`npm run test:navegadores` ejecuta las mismas 69 pruebas en Chrome, Firefox y Edge.

| Navegador | Resultado |
|---|---|
| Chrome Headless 154 (Windows 10) | 69 / 69 ✅ |
| Firefox 157 (Windows 10) | 69 / 69 ✅ |
| Edge 154 (Windows 10) | 69 / 69 ✅ |
| **Total** | **207 / 207** |

## 6. Análisis

**¿Se cumple el proceso de testeo?** Sí. Las cuatro métricas superan con holgura el umbral del 60%, y todas las pruebas pasan en los tres navegadores.

**Cómo llegamos al 100% de ramas.** En la primera medición, las ramas quedaron en 95,8% (46 de 48). El informe mostró que faltaba probar un caso: qué ocurre si la página se cierra antes de que lleguen los datos. Ese camino protege contra actualizar un componente que ya no existe. Se agregaron dos pruebas con promesas controladas (CP-66 y CP-67) y la cobertura llegó a 100%. Es el uso correcto del informe: no como meta en sí, sino como guía para encontrar casos que nadie había pensado.

**Límites de la cobertura.** Un 100% no garantiza que no haya errores. Solo indica que todo el código se ejecutó al menos una vez durante las pruebas. Por eso las pruebas también revisan **resultados concretos** (textos, atributos, llamadas a los mocks), e incluyen casos de borde y pruebas de contrato de los datos reales. La parte visual (CSS) no la mide la cobertura; se verificó manualmente en escritorio y móvil, y con una auditoría automática de accesibilidad (axe-core: 0 problemas en las normas WCAG 2 A/AA).

## 7. Cómo regenerar este informe

```bash
npm test
```

Luego abre `coverage/index.html` en el navegador. La carpeta `coverage/` no se sube a GitHub (está en `.gitignore`) porque se regenera en cada ejecución.
