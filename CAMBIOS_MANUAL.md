# Cambios: edición del manual directamente en código

## Archivo principal

Ahora la fuente única de los pasos y las portadas es `src/data/manualSteps.ts`. Se eliminó de la interfaz el panel “Administrador del manual”.

## Editar un paso

En `src/data/manualSteps.ts`, busca el objeto por su `id` y modifica los campos que necesites:

```ts
{
  id: "m1-1",
  moduleId: 1,
  title: "Despejar la zona de armado",
  description: "Instrucciones detalladas para realizar el paso.",
  image: "/images/manual/pasos/modulo1-paso1.jpg",
  imageCaption: "Vista de referencia",
  videoUrl: "/video/manual/modulo1-paso1.mp4",
  duration: 12,
},
```

- **Imagen:** guarda el archivo dentro de `public/` y escribe la ruta web empezando por `/`.
- **Video MP4:** guarda el archivo dentro de `public/` (por ejemplo `public/video/manual/modulo1-paso1.mp4`) y usa `/video/manual/modulo1-paso1.mp4`.
- **YouTube:** también puedes usar la URL completa del video.
- Si no necesitas imagen o video, elimina la propiedad o déjala comentada.

## Agregar un paso

Copia un objeto dentro del arreglo `manualSteps`, cambia `moduleId` al módulo correcto y asigna un `id` único, por ejemplo `m1-5` para el quinto paso del módulo 1. No reutilices el ID de un paso eliminado si no quieres que herede su marca de progreso anterior.

## Eliminar un paso

Elimina el objeto completo del arreglo `manualSteps`. El cálculo de la cantidad de pasos se actualiza automáticamente. Los IDs de progreso que ya no existan se ignoran en el cálculo.

## Editar una portada o los datos de un módulo

Al final de `src/data/manualSteps.ts` está el arreglo `manualModules`. Cada objeto controla:

- `id`: identificador del módulo; debe coincidir con `moduleId` de sus pasos.
- `title`: título mostrado en la interfaz.
- `time`: tiempo estimado del módulo en minutos.
- `icon`: nombre del icono usado por el diseño.
- `cover`: ruta de la portada dentro de `public/`, iniciando con `/`.

Los cambios de título, imagen de portada, texto, duración, icono o video no reinician el avance. Para conservar las marcas de pasos completados, **mantén los IDs actuales de los pasos**. Si agregas un módulo, agrega también pasos con su `moduleId` y configura un `manualModules` con el mismo `id`.

## Datos que se conservan

El progreso de piezas continúa guardándose en `localStorage` con la clave `cm1-parts`; el progreso de pasos, con `cm1-tasks`. El contenido del manual ya no se lee desde `carrito-manual-steps` ni las portadas desde `carrito-manual-covers`, porque ahora proceden del código. Esto evita que una versión vieja guardada en el navegador oculte tus cambios en `manualSteps.ts`.

## Ver los cambios

Guarda el archivo y espera a que Vite actualice la aplicación. Si no se actualiza, recarga la página con `Ctrl + Shift + R`.
