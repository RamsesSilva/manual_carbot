/**
 * Pasos individuales del manual de armado.
 *
 * Para agregar un paso, copia un objeto dentro del módulo correspondiente y cambia:
 * - id: identificador único (ej. "m2-6")
 * - moduleId: número del módulo (1 a 6)
 * - title / description: contenido del paso
 * - image: ruta de imagen opcional dentro de public/ (ej. "/images/manual/pasos/modulo1-paso1.jpg")
 * - imageCaption: texto que aparece debajo de la imagen
 * - videoUrl: ruta MP4 dentro de public/ (ej. "/video/manual/modulo1-paso1.mp4") o enlace de YouTube
 * - duration: duración estimada en minutos
 *
 * IMPORTANTE: este archivo es la fuente única de contenido.
 * Para AGREGAR: copia un objeto y asigna un id nuevo, por ejemplo "m1-5".
 * Para EDITAR: modifica las propiedades del objeto correspondiente.
 * Para ELIMINAR: borra el objeto completo, incluyendo sus llaves y coma.
 * Para las PORTADAS: modifica el arreglo manualModules al final del archivo.
 * Conserva los ID existentes para mantener el progreso guardado.
 */
export type ManualStep = {
  id: string;
  moduleId: number;
  title: string;
  description: string;
  image?: string;
  imageCaption: string;
  videoUrl?: string;
  duration: number;
};

export const manualSteps: ManualStep[] = [
  // MÓDULO 1: agrega o edita cada paso de este módulo por separado.
  {
    id: "m1-1",
    moduleId: 1,
    title: "Despejar la zona de trabajo",
    description: "\nElije una superficie plana ya sea un escritorio o una mesa, limpia y retira todos los objetos ajenos tu proyecto.\n▹ Mantén líquidos y alimentos alejados.",
    imageCaption: "Referencia visual",
    duration: 5,
    //image: "public/images/manual/portadas/modulo1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m1-2",
    moduleId: 1,
    title: "Preparar las herramientas",
    description: "\nNecesitaremos:\n▹ Un Desarmador de Cruz\n▹ Una Laptop o Pc\n▹ Un Celular o Tablet\n▹ La Clave del Wifi de tu escuela o casa.",
    imageCaption: "Referencia visual",
    duration: 10,
    // image: "/images/modulos/modulo1-paso2.png",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m1-3",
    moduleId: 1,
    title: "Verificar el inventario",
    description: "\nColoca las piezas sobre la mesa, sigue la orientación mostrada y verifica que tengas todoas las piezas disponibles para su ensamblaje .",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 10,
    image: "public/images/manual/pasos/VerificarElInventario.png",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
 


  // MÓDULO 2: agrega o edita cada paso de este módulo por separado.
  {
    id: "m2-1",
    moduleId: 2,
    title: "Montar los motores al chasis",
    description: "\nMontamos los 4 motores [E-04] al chasis [E-01] con los soportes de acrílico tipo 'T' [E-03] fijandolos con 2 los tornillos [T-05] cada uno a la base con el desarmador de cruz y colocamos las ruedas de control de velocidad negras [E-05].",
    imageCaption: "Referencia visual",
    duration: 10,
    // image: "/images/modulos/modulo2-paso1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-2",
    moduleId: 2,
    title: "Conectar y montar controlador de motores",
    description: "\n▹ Preparamos la placa del controlador de motores [P-03] con 4 tornillos blancos [T-01]\n\n▹ Motores Izquierdos [E-04] a Controlador de Motores [P-03]:\nCables Negros conectarlos en el módulo 'Motor A Output - Out 1'\nCables Rojos del lado izquierdo al módulo 'Motor A Output - Out 2'\n\n▹ Motores Derechos [E-04] a Controlador de Motores [P-03]:\nCables Negros conectarlos en el módulo 'Motor B Output - Out 4'\nCables Rojos del lado izquierdo al módulo 'Motor B Output - Out 3'.",
    imageCaption: "Referencia visual",
    duration: 10,
    // image: "/images/modulos/modulo2-paso2.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-3",
    moduleId: 2,
    title: "Conectar Portabaterías al controlador de motores",
    description: "\n▹ Conectamos Cable Rojo del Portabaterías [R-02] al Controlador de Motores [P-03] en '12V Power for Motor'\n\n▹ Conectamos Cable Negro del Portabaterías [R-02] al Controlador de Motores [P-03] en 'GND'\n\n▹ Fijamos la placa del controlador de motores [P-03] con 4 tornillos blancos [T-01] al chasis [E-01]",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 12,
    // image: "/images/modulos/modulo2-paso3.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-4",
    moduleId: 2,
    title: "Montar Llantas",
    description: "\nColocar las llantas [E-02] a las puntas de los motores [E-04] y revisar alineación respecto a la marca de torque.",
    imageCaption: "Referencia visual",
    duration: 12,
    // image: "/images/modulos/modulo2-paso4.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-5",
    moduleId: 2,
    title: "Instalar los sensores de Seguidores de Línea",
    description: "\nMontar los seguidores de línea [S-01] al chasis [E-01] por la parte de enfrente (caja porta baterías va hacia atrás) y conectar Jumpers o cables conectores [S-02].",
    imageCaption: "Referencia visual",
    duration: 12,
    // image: "/images/modulos/modulo2-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-6",
    moduleId: 2,
    title: "Montar postes de soporte de chasis",
    description: "\nMontar 4 soportes [T-04] con un Tornillo blanco cada uno [T-01] al chasis [E-01] por la parte de arriba atornillando por debajo con 1 tornillos [T-02] cada poste.",
    imageCaption: "Referencia visual",
    duration: 12,
    // image: "/images/modulos/modulo2-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m2-7",
    moduleId: 2,
    title: "Montar Sensor Ultrasónico (Anti-colisión)",
    description: "\n▹ Montamos el sensor ultrasónico [A-01] a la base azul 'L' [A-02] fijandolo con 2 tornillos pequeños [T-03]\n\n▹ Fijar la base [A-02] al chasis [E-01] con 2 tornillos blancos con sus respectivas tuercas [T-01]\n\n▹ Conectar Buzzer o cables correspondientes [A-03].",
    imageCaption: "Referencia visual",
    duration: 12,
    // image: "/images/modulos/modulo2-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },




  // MÓDULO 3: agrega o edita cada paso de este módulo por separado.
  {
    id: "m3-1",
    moduleId: 3,
    title: "Montar el Sensor Buzzer (bocina)",
    description: "\nMontar el Sensor Buzzer [O-01] en el chasis superior [E-01] fijandolo con un tornillo blanco [T-01] y conectar sus respectivos Jumpers o cables [O-02].",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo3-paso1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m3-2",
    moduleId: 3,
    title: "Montar Leds RGB (luces)",
    description: "\nMontar los módulos led [l-01] en las ranuras [___] del chasis [E-01], fijandolos con 1 tornillo blanco cada uno [T-01] y conectar sus respectivos Jumpers o cables [L-02]\n'Negativo', 'R', 'G' y 'B'",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo3-paso2.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m3-3",
    moduleId: 3,
    title: "Montar Procesador ESP32 en placa expansora de pines Shield",
    description: "Conectar ESP32 [P-01] a Placa expansora Shield ESP32 [P-02] y fijar en las ranuras [___] del chasis superior [E-01] con 4 tornillos blancos y sus respectivas tuercas [T-01].",
    imageCaption: "Referencia visual",
    duration: 13,
    // image: "/images/modulos/modulo3-paso3.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m3-4",
    moduleId: 3,
    title: "Conectar Shield ESP32 al Controlador de Motores",
    description: ".",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo3-paso4.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m3-5",
    moduleId: 3,
    title: "Acomodar Jumpers o cables conectores",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo3-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  // MÓDULO 4: agrega o edita cada paso de este módulo por separado.
  {
    id: "m4-1",
    moduleId: 4,
    title: "Colocar la bandeja inferior",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 16,
    // image: "/images/modulos/modulo4-paso1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m4-2",
    moduleId: 4,
    title: "Fijar la bandeja intermedia",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 16,
    // image: "/images/modulos/modulo4-paso2.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m4-3",
    moduleId: 4,
    title: "Montar la bandeja superior",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 16,
    // image: "/images/modulos/modulo4-paso3.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m4-4",
    moduleId: 4,
    title: "Instalar soportes",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 16,
    // image: "/images/modulos/modulo4-paso4.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m4-5",
    moduleId: 4,
    title: "Verificar niveles",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 16,
    // image: "/images/modulos/modulo4-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  // MÓDULO 5: agrega o edita cada paso de este módulo por separado.
  {
    id: "m5-1",
    moduleId: 5,
    title: "Preparar las ruedas",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo5-paso1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m5-2",
    moduleId: 5,
    title: "Montar ruedas fijas",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo5-paso2.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m5-3",
    moduleId: 5,
    title: "Montar ruedas con freno",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo5-paso3.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m5-4",
    moduleId: 5,
    title: "Ajustar placas",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo5-paso4.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m5-5",
    moduleId: 5,
    title: "Probar los frenos",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 13,
    // image: "/images/modulos/modulo5-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  // MÓDULO 6: agrega o edita cada paso de este módulo por separado.
  {
    id: "m6-1",
    moduleId: 6,
    title: "Instalar la manija",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso1.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m6-2",
    moduleId: 6,
    title: "Colocar accesorios",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso2.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m6-3",
    moduleId: 6,
    title: "Apretar tornillería",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso3.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m6-4",
    moduleId: 6,
    title: "Retirar etiquetas",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso4.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m6-5",
    moduleId: 6,
    title: "Prueba de carga",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso5.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
  {
    id: "m6-6",
    moduleId: 6,
    title: "Inspección final",
    description: "Sigue la orientación mostrada, presenta las piezas sin forzar y confirma la alineación antes de apretar.",
    imageCaption: "Referencia visual de posición y montaje",
    duration: 11,
    // image: "/images/modulos/modulo6-paso6.jpg",
    // videoUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",
  },
];


/**
 * CONFIGURACIÓN DE PORTADAS Y ELEMENTOS DE CADA MÓDULO
 * Edita estos datos aquí mismo, en manualSteps.ts.
 * Las rutas de archivos deben apuntar dentro de public/ y comenzar con "/".
 * Puedes cambiar title, time, icon y cover sin modificar el progreso de pasos.
 */
export type ManualModule = {
  id: number;
  title: string;
  time: number;
  icon: string;
  cover: string;
};

export const manualModules: ManualModule[] = [
  { id: 1, title: "Preparación del área y herramientas", time: 25, icon: "tool", cover: "public/images/manual/portadas/modulo1.jpg"},
  { id: 2, title: "Montar componentes del chasis inferior", time: 60, icon: "grid", cover: "public/images/manual/portadas/modulo2.png" },
  { id: 3, title: "Montar componentes del chasis superior", time: 67, icon: "panel", cover: "public/images/manual/portadas/modulo3.png" },
  { id: 4, title: "Conectar los componentes electrónicos", time: 82, icon: "layers", cover: "/images/manual/portadas/modulo4.jpg" },
  { id: 5, title: "Descarga y personalización de tu Aplicación Móvil", time: 67, icon: "wheel", cover: "/images/manual/portadas/modulo5.jpg" },
  { id: 6, title: "Explicado en código del funcionamiento de tu Robot", time: 65, icon: "check", cover: "/images/manual/portadas/modulo6.jpg" },
];
