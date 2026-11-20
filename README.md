# Manual de Carrito Armable

Sitio web con React, TypeScript, Vite y Tailwind CSS.

## Estructura del proyecto

- `index.html`: documento HTML principal.
- `src/main.tsx`: punto de entrada de React.
- `src/App.tsx`: navegación y páginas activas del sitio, incluida la administración del manual.
- `src/data/manualSteps.ts`: contenido inicial de cada paso del manual y sus tipos.
- `src/index.css` y `src/styles/`: estilos globales y específicos.
- `src/images/`: recursos gráficos importados desde el código.
- `public/images/`: imágenes accesibles por ruta pública.
- `public/video/manual/`: carpeta sugerida para los videos MP4 del manual.

Los archivos de `src/sections/`, `src/components/` y `src/data/siteData.ts` se conservaron para no eliminar código histórico del proyecto. La navegación activa de esta versión se ejecuta desde `src/App.tsx`.

## Instalar y ejecutar

Requisitos: Node.js y npm.

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Administrar el manual desde la página

Abre **Manual → Administrar contenido**. Desde ahí puedes:

1. Cambiar la portada de cada módulo por separado.
2. Crear, editar, eliminar y reordenar pasos dentro de cada módulo.
3. Cambiar de manera independiente el título, la descripción, la imagen, el texto bajo la imagen y la duración de cada paso.
4. Asignar un video MP4 local o un enlace de YouTube a cada paso.

Los cambios del contenido se guardan en el almacenamiento local del navegador. Las portadas se guardan por separado. Esto permite editar el contenido desde la interfaz sin cambiar archivos TypeScript. Los cambios almacenados en un navegador no se sincronizan automáticamente con otros dispositivos ni con otros navegadores.

## Cómo usar imágenes locales

1. Copia la imagen en una carpeta dentro de `public/`, por ejemplo `public/images/modulos/`.
2. En el administrador, escribe la ruta pública, sin incluir `public`. Por ejemplo:

```text
/images/modulos/modulo1-paso1.jpg
```

Cada paso tiene su propia ruta de imagen. Para no reutilizar la imagen de otro paso, configura la ruta individual en su formulario.

## Cómo usar videos MP4

1. Copia el video a `public/video/manual/` o a una subcarpeta por módulo.
2. En el campo **Video opcional (URL o MP4)** escribe la ruta pública, por ejemplo:

```text
/video/manual/modulo1/paso1.mp4
```

3. Guarda el paso y usa **Reproducir video de este paso**.

Los MP4 se reproducen con los controles nativos del navegador. También se admiten enlaces de YouTube como `https://www.youtube.com/watch?v=ID_DEL_VIDEO`.

## Progreso y checklist

Los identificadores de los pasos (`id`, por ejemplo `m1-1`) se usan para vincular cada paso con el checklist. Si editas un paso existente, conserva su identificador para mantener su estado completado. Si eliminas un paso desde el administrador, su marca de checklist también se elimina. Los pasos nuevos reciben un identificador nuevo y se incorporan al cálculo de avance.

El checklist de piezas y el checklist del manual continúan guardándose en el navegador. Para compartir los cambios de contenido entre equipos, habría que añadir más adelante una base de datos o exportación/importación de configuración.
