// Datos y contenido del manual del carrito armable.
import { manualSteps, manualModules } from "./manualSteps";
export type Page = "inicio" | "introduccion" | "piezas" | "manual" | "progreso" | "preguntas";

export const workshopImage = "https://unsplash.com/es/fotos/chica-joven-concentrada-en-montar-un-juguete-de-construccion-lM2ww7eebG4";

export const toolsImage = "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";
export const moduleImages = [
  toolsImage,
  "https://images.unsplash.com/photo-1763194180738-da6a7c8d7ae1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1000",
  workshopImage,
  "https://images.unsplash.com/photo-1738918935719-398c6cc3c51a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1000",
  "https://images.unsplash.com/photo-1777466205509-27b66fd66c20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1000",
  "https://images.unsplash.com/photo-1514443031610-8c063c7a9822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1000",
];

import robotchat from "../images/inicio/robotchat.png";
import carritoycelular from "../images/inicio/carritoycelular.png";
import inicio from "../images/inicio/inicio.jpg";
import ninacarrito from "../images/inicio/ninacarrito.jpg";
export { robotchat, carritoycelular, inicio, ninacarrito };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA APARTADO DE MODULOS DE PAGINA MANUAL----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------
export const modules = manualModules.map((module) => ({
  ...module,
  // La cantidad siempre coincide con los pasos definidos en manualSteps.ts.
  count: manualSteps.filter((step) => step.moduleId === module.id).length,
}));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA APARTADO DE MODULOS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------


// Lista de títulos por módulo conservada para compatibilidad con componentes existentes.
export const taskNames = modules.map((module) =>
  manualSteps
    .filter((step) => step.moduleId === module.id)
    .map((step) => step.title),
);

// Fuente única de pasos: cada paso tiene su propio texto, imagen, video y duración.
export const allTasks = manualSteps;

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//* AQUÍ COMIENZA BASE DE DATOS Y TABLAS DE LAS PIEZAS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const partGroups = [
  {
    name: "Estructura", icon: "grid", items: [
      ["E-01", "Chasis", "2", "Bases de acrílico transparente"],
      ["E-02", "Llantas todo terreno", "4", "Ruedas de plástico y goma"],
      ["E-04", "Soporte de motores", "8", "(T) de acrílico transpatente"],
      ["H-01", "Motores", "4", "Con cables soldados"],
      ["H-01", "Ruedas negras", "4", "Tapones internos____"],
    ],
  },
  {
    name: "Energía", icon: "wheel", items: [
      ["R-01", "Baterías", "2", "Recargables, 3.7v, 2000 mAh, Tipo C"],
      ["R-02", "Portabaterías", "1", "Cajita de plastico con cables soldados"],
      ["R-03", "Jumper de energía", "1", "Voltaje de baterias hacia controlador de motores"],
    ],
  },
  {
    name: "Seguidor de línea", icon: "settings", items: [
      ["F-01", "Sensores de línea", "2", "Placas con leds Azul y Negro"],
      ["F-02", "Jumper de sensor de línea", "2", "Conector de ______ a _____"],
    ],
  },
  {
    name: "Anti-colisión", icon: "box", items: [
      ["A-01", "Sensor Ultrasónico", "1", "Placa con 2 sensores de tubo gris"],
      ["A-01", "Base de sensor ulrasónico", "1", "Base tipo L Azul"],
      ["A-01", "Jumper de sensor ultrasónico", "1", "Conector de ____ a ____"],
    ],
  },
   {
    name: "Controladores", icon: "tool", items: [
      ["H-01", "Controlador de motores", "1", "Placa roja con torre negra y cuadros azules"],
      
    ],
  },
  {
    name: "Tornillería", icon: "panel", items: [
      ["P-01", "Tornillos blancos", "x", "Plástico"],
      ["P-02", "Tuercas blancas", "x", "Plástico"],
      ["P-03", "Tornillos grises", "x", "Metal"],
      ["P-04", "Tuercas grises", "x", "Metal"],
      ["P-05", "Tornillos miniatura", "x", "Metal"],
      ["E-03", "Postes de soporte", "4", "Metal con forma hexagonal"],
    ],
  },
];

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//* AQUÍ TERMINA BASE DE DATOS Y TABLAS DE LAS PIEZAS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const parts = partGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.name, code: item[0], name: item[1], qty: item[2], material: item[3] })));

export const faqs = [
  ["General", "¿Cuánto tiempo toma armar el carrito?", "Una persona sin experiencia suele tardar entre 3 y 4 horas. Siguiendo los módulos en orden y sin saltarte la verificación de piezas, la mayoría lo completa en una sola jornada."],
  ["General", "¿Necesito herramientas especiales?", "No. La llave Allen principal está incluida. Un destornillador de estrella, una llave fija y una cinta métrica son apoyos opcionales."],
  ["Armado", "¿Puedo armar el carrito yo solo?", "Sí. El diseño está pensado para una persona, aunque recomendamos ayuda al colocar la bandeja superior."],
  ["Armado", "¿Es obligatorio seguir el orden de los módulos?", "Sí. Cada módulo utiliza uniones preparadas en el anterior y seguir el orden evita desmontajes innecesarios."],
  ["Piezas y herrajes", "¿Qué hago si una pieza no encaja?", "No la fuerces. Confirma el código, la orientación y que los tornillos estén todavía flojos."],
  ["Piezas y herrajes", "¿Los tornillos se aprietan en algún orden concreto?", "Primero presenta todos los tornillos y luego aprieta en diagonal, alternando lados."],
  ["Piezas y herrajes", "¿Qué diferencia hay entre los tornillos F-01 y F-02?", "El F-02 es más largo y se utiliza en placas de rueda y soportes triangulares."],
  ["Piezas y herrajes", "¿Puedo pedir piezas de repuesto?", "Sí. Contacta a soporte indicando el modelo CM-1 y el código exacto de la pieza."],
  ["Mantenimiento", "¿Cuánto peso soporta cada bandeja?", "La superior soporta 12 kg, la intermedia 12 kg y la inferior 25 kg."],
  ["Mantenimiento", "¿Cómo limpio el carrito?", "Usa un paño húmedo y jabón neutro. Seca las piezas metálicas y evita abrasivos."],
  ["Mantenimiento", "¿Cada cuánto debo revisar los tornillos?", "Revisa las uniones cada tres meses o después de trasladar el carrito cargado."],
  ["Mantenimiento", "Las ruedas hacen ruido, ¿qué puedo hacer?", "Retira residuos de los ejes y aplica una pequeña cantidad de lubricante seco."],
];
