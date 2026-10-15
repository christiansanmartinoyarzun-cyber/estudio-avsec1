# Estudio AVSEC · Objetos prohibidos y mercancías peligrosas (Proyecto DASA - ETA)

Sitio de estudio para estudiantes TNS AVSEC de la ETA-DGAC, construido sobre la PWA
«Elementos Prohibidos en Vuelos». Incluye 8 módulos, práctica con retroalimentación,
puesto de control simulado, fichas de estudio y glosario ES/EN. La consulta rápida para
pasajeros (bilingüe) sigue disponible en `consulta.html`.

## Normativa base
- OACI Doc 9284, Instrucciones Técnicas, Ed. 2025–2026 (edición DGAC), Parte 8, Tabla 8-1.
- Adenda 1 (vigente desde el 27/3/2026): baterías de litio y bancos de energía.
- Elementos AVSEC no cubiertos por la Tabla 8-1 (líquidos 100 ml, cortopunzantes, etc.)
  van marcados con origen `avsec` para su validación por el área técnica.

## Archivos
| Archivo | Función |
|---|---|
| index.html / estudio.js / estudio.css | Sitio de estudio: módulos, práctica, puesto de control, fichas, glosario, avance guardado en el navegador |
| contenido.js | Texto de los 8 módulos, banco de 36 preguntas, 9 clases y glosario (editar aquí para cambiar el material didáctico) |
| consulta.html / script.js | Consulta rápida para pasajeros: búsqueda, 9 categorías, 4 filtros del proyecto, ES/EN, tema claro/oscuro |
| admin.html / admin.js | Mantenedor: crear, editar, eliminar, importar/exportar JSON, vista previa |
| data.js | Categorías, catálogo semilla bilingüe (48 elementos), validación y carga |
| catalogo.json | Catálogo publicado que leen la consulta y el estudio (práctica, puesto de control y fichas se alimentan de él) |
| styles.css | Estilos del portal y del mantenedor |
| sw.js | Service worker (sin conexión). Subir `CACHE` (epv-vN) en cada versión |
| manifest.json, icon.svg, logo.png | Instalación como app e identidad DGAC |

## Flujo de publicación
1. En `admin.html`, editar el catálogo (queda como borrador en ese navegador).
2. Revisar con "Vista previa".
3. "Exportar JSON" → descarga `catalogo.json`.
4. Subir `catalogo.json` al repositorio reemplazando el anterior.

GitHub Pages es un hosting estático: el mantenedor no requiere contraseña porque
nadie puede publicar sin permisos de escritura en el repositorio.
Para producción (Fase 2–3): backend institucional, base de datos y autenticación.

## Modelo de datos (cada elemento)
`id`, `categoria`, `icono`, `origen` (tabla81 | no_listado | avsec),
`nombre{es,en}`, `claves{es[],en[]}`, `mano`, `bodega` (permitido | restringido | prohibido),
`aprobacion` (true | false | null), `limite{es,en}`, `detalle{es[],en[]}`, `fuente{es,en}`.
