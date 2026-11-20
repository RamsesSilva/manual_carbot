import { useEffect, useMemo, useState } from "react";
import { Icon, HeroTitle } from "./components/UI";
import { modules } from "./data/siteData";
import { manualSteps as initialManualSteps, type ManualStep } from "./data/manualSteps";
import robotchat from "./images/inicio/robotchat.png";
import carritoycelular from "./images/inicio/carritoycelular.png";
import inicio from "./images/inicio/inicio.jpg";
import ninacarrito from "./images/inicio/ninacarrito.jpg";

type Page = "inicio" | "introduccion" | "piezas" | "manual" | "progreso" | "preguntas";

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//* AQUÍ COMIENZA BASE DE DATOS Y TABLAS DE LAS PIEZAS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

type Part = {
  code: string;
  name: string;
  qty: string;
  material: string;
  image: string;
};

type PartGroup = {
  name: string;
  icon: string;
  items: Part[];
};

/**
 * INVENTARIO DE PIEZAS
 * Cada pieza tiene su propia propiedad `image`.
 * Coloca cada archivo en `public/images/piezas/` y usa su ruta desde public,
 * por ejemplo: `/images/piezas/E-01.jpg`.
 * Cambiar una imagen no modifica el checklist ni los cálculos de progreso.
 */
const partGroups: PartGroup[] = [
  {
    name: "Estructura", icon: "grid", items: [
      { code: "E-01", name: "Chasis", qty: "2", material: "Bases de acrílico transparente", image: "/images/piezas/E-01.jpg" },
      { code: "E-02", name: "Llantas todo terreno", qty: "4", material: "Ruedas de plástico y goma", image: "/images/piezas/E-02.png" },
      { code: "E-03", name: "Soporte de motores", qty: "8", material: "(T) de acrílico transparente", image: "/images/piezas/E-03.png" },
      { code: "E-04", name: "Motores", qty: "4", material: "Con cables soldados", image: "/images/piezas/E-04.png" },
      { code: "E-05", name: "Ruedas negras", qty: "4", material: "Tapones internos____", image: "/images/piezas/E-05.png" },
    ],
  },
  {
    name: "Energía", icon: "wheel", items: [
      { code: "R-01", name: "Baterías", qty: "2", material: "Recargables, 3.7v, 2000 mAh, Tipo C", image: "/images/piezas/R-01.png" },
      { code: "R-02", name: "Portabaterías", qty: "1", material: "Cajita de plástico con cables soldados", image: "/images/piezas/R-02.jpg" },
    ],
  },
  {
    name: "Seguidor de línea", icon: "settings", items: [
      { code: "S-01", name: "Sensores de línea", qty: "2", material: "Placas con leds Azul y Negro", image: "/images/piezas/S-01.jpg" },
      { code: "S-02", name: "Jumper de sensor de línea", qty: "2", material: "Conector de ______ a _____", image: "/images/piezas/S-02.jpg" },
    ],
  },
  {
    name: "Anti-colisión", icon: "box", items: [
      { code: "A-01", name: "Sensor Ultrasónico", qty: "1", material: "Placa con 2 sensores de tubo gris", image: "/images/piezas/A-01.jpg" },
      { code: "A-02", name: "Base de sensor ultrasónico", qty: "1", material: "Base de acrílico tipo L Azul", image: "/images/piezas/A-02.jpg" },
      { code: "A-03", name: "Jumper de sensor ultrasónico", qty: "1", material: "Conector de ____ a ____", image: "/images/piezas/A-03.jpg" },
    ],
  },
  {
    name: "Placas", icon: "tool", items: [
      { code: "P-01", name: "ESP32", qty: "1", material: "Microprocesador de desarrollo", image: "/images/piezas/P-01.jpg" },
      { code: "P-02", name: "Shield ESP32", qty: "1", material: "Placa expansora de pines con sus conectores", image: "/images/piezas/P-02.jpg" },
      { code: "P-03", name: "Controlador de motores", qty: "1", material: "Placa roja con torre negra y cuadros azules", image: "/images/piezas/P-03.jpg" },
    ],
  },
  {
    name: "Luces", icon: "tool", items: [
      { code: "L-01", name: "Leds RGB", qty: "4", material: "Leds de desarrollo con pines", image: "/images/piezas/L-01.jpg" },
      { code: "L-02", name: "Jumper de focos led", qty: "4", material: "Conector de _____ a _____", image: "/images/piezas/L-02.jpg" },
    ],
  },
  {
    name: "Sonido", icon: "tool", items: [
      { code: "O-01", name: "Sensor buzzer", qty: "1", material: "Sensor tipo bocina que emite sonido", image: "/images/piezas/O-01.jpg" },
      { code: "O-02", name: "Jumper de sensor buzzer", qty: "1", material: "Conector de _____ a _____", image: "/images/piezas/O-02.jpg" },
    ],
  },
  {
    name: "Tornillería", icon: "panel", items: [
      { code: "T-01", name: "Tornillos blancos con tuercas", qty: "15", material: "Uso sin herramienta - Plástico", image: "/images/piezas/T-01.jpg" },
      { code: "T-02", name: "Tornillos medianos con tuercas", qty: "15", material: "Para componentes - Metal", image: "/images/piezas/T-02.jpg" },
      { code: "T-03", name: "Tornillos mini", qty: "4", material: "Para el sensor ultrasónico - Metal", image: "/images/piezas/T-03.jpg" },
      { code: "T-04", name: "Postes de soporte", qty: "4", material: "Para soporte entre el chasis - Cobre", image: "/images/piezas/T-04.jpg" },
      { code: "T-05", name: "Tornillos largos", qty: "8", material: "Para soportes de motores - Metal", image: "/images/piezas/T-05.jpg" },
      { code: "T-06", name: "Tornillos cabeza plana", qty: "4", material: "Para fijar el portapilas - Metal", image: "/images/piezas/T-06.jpg" },
      { code: "T-07", name: "Tornillos delgados con tuerca", qty: "4", material: "Para fijar cada LED con la base - Metal", image: "/images/piezas/T-07.jpg" },
    ],
  },
];

const parts = partGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.name })));

const faqs = [
  ["General", "¿Cuánto tiempo toma armar el carrito completo?", "Una persona sin experiencia suele tardar ________. Siguiendo los módulos en orden y sin saltarte la verificación de piezas, la mayoría lo completa en menos de 3 horas."],
  ["General", "¿Necesito herramientas especiales?", "No. para el armado el desarmador de cruz principal está incluido. El equipo de cómputo, el celular y el WiFi son necesarios, pero si no tienes busca apoyo en casa, escuela o en cualquier parte donde te encuentres construyendo tu Robot"],
  ["Armado", "¿Puedo armar el carrito yo solo?", "Sí. Este curso interactivo está diseñado especialmente para quien tiene poco o ningún conocimiento previo en robótica, electrónica o programación. , aunque recomendamos la supervisión y guía de algun tutor o maestro si estas en aprendizaje escolar o en casa y eres menor."],
  ["Armado", "¿Es obligatorio seguir el orden de los módulos?", "Sí. Cada módulo utiliza uniones y montajes preparados en el anterior y seguir el orden evita complicaciones innecesarias y malos funcionamientos."],
  ["Piezas y herrajes", "¿Qué hago si una pieza no encaja?", "No la fuerces. Confirma el código, la orientación y que los tornillos estén todavía flojos."],
  ["Piezas y herrajes", "¿Los tornillos se aprietan en algún orden concreto?", "Primero presenta todos los tornillos y luego aprieta en diagonal, alternando lados."],
  ["Piezas y herrajes", "¿Qué diferencia hay entre los tornillos F-01 y F-02?", "El F-02 es más largo y se utiliza en placas de rueda y soportes triangulares."],
  ["Piezas y herrajes", "¿Puedo pedir piezas de repuesto?", "Sí. Contacta a soporte indicando el modelo CM-1 y el código exacto de la pieza."],
  ["Mantenimiento", "¿Cuánto peso soporta cada bandeja?", "La superior soporta 12 kg, la intermedia 12 kg y la inferior 25 kg."],
  ["Mantenimiento", "¿Cómo limpio el carrito?", "Usa un paño húmedo y jabón neutro. Seca las piezas metálicas y evita abrasivos."],
  ["Mantenimiento", "¿Cada cuánto debo revisar los tornillos?", "Revisa las uniones cada tres meses o después de trasladar el carrito cargado."],
  ["Mantenimiento", "Las ruedas hacen ruido, ¿qué puedo hacer?", "Retira residuos de los ejes y aplica una pequeña cantidad de lubricante seco."],
];

function App() {
  const [page, setPage] = useState<Page>("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkedParts, setCheckedParts] = useState<string[]>(() => JSON.parse(localStorage.getItem("cm1-parts") || "[]"));
  const [checkedTasks, setCheckedTasks] = useState<string[]>(() => JSON.parse(localStorage.getItem("cm1-tasks") || "[]"));
  // Fuente única: el contenido se edita directamente en src/data/manualSteps.ts.
  const manualItems: ManualStep[] = initialManualSteps;
  const [partFilter, setPartFilter] = useState("Todas");
  const [partSearch, setPartSearch] = useState("");
  const [faqFilter, setFaqFilter] = useState("Todas");

  useEffect(() => localStorage.setItem("cm1-parts", JSON.stringify(checkedParts)), [checkedParts]);
  useEffect(() => localStorage.setItem("cm1-tasks", JSON.stringify(checkedTasks)), [checkedTasks]);

  const partsProgress = checkedParts.length / parts.length;
  const tasksProgress = checkedTasks.filter(id => manualItems.some(task => task.id === id)).length / Math.max(1, manualItems.length);
  const progress = Math.round(((partsProgress + tasksProgress) / 2) * 100);
  const go = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-[#181713]">
      <Header page={page} progress={progress} menuOpen={menuOpen} setMenuOpen={setMenuOpen} go={go} />
      {page === "inicio" && <Home go={go} progress={progress} checkedParts={checkedParts} checkedTasks={checkedTasks} tasks={manualItems} />}
      {page === "introduccion" && <Introduction go={go} />}
      {page === "piezas" && <PartsPage checked={checkedParts} setChecked={setCheckedParts} filter={partFilter} setFilter={setPartFilter} search={partSearch} setSearch={setPartSearch} go={go} />}
      {page === "manual" && <Manual checked={checkedTasks} setChecked={setCheckedTasks} go={go} tasks={manualItems} />}
      {page === "progreso" && <Progress checkedParts={checkedParts} checkedTasks={checkedTasks} setCheckedParts={setCheckedParts} setCheckedTasks={setCheckedTasks} progress={progress} go={go} tasks={manualItems} />}
      {page === "preguntas" && <FaqPage filter={faqFilter} setFilter={setFaqFilter} go={go} />}
      <Footer go={go} />
    </div>
  );
}

function Header({
  page,
  progress,
  menuOpen,
  setMenuOpen,
  go,
}: {
  page: Page;
  progress: number;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  go: (page: Page) => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar el encabezado al llegar al inicio
      if (currentScrollY < 50) {
        setVisible(true);
      }
      // Ocultar al bajar
      else if (currentScrollY > lastScrollY + 5) {
        setVisible(false);
      }
      // Mostrar al subir
      else if (currentScrollY < lastScrollY - 5) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links: [Page, string][] = [
    ["inicio", "Inicio"],
    ["introduccion", "Introducción"],
    ["piezas", "Lista de piezas"],
    ["manual", "Manual"],
    ["progreso", "Progreso"],
    ["preguntas", "Preguntas"],
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#201D16]/10 bg-[#FCF9F2]/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => go("inicio")}
          className="flex items-center gap-3 text-left"
        >
          <span className="grid size-10 place-items-center rounded-md bg-[#EC7A00] text-white">
            <Icon name="shapes" />
          </span>

          <span className="leading-none">
            <b className="font-display text-lg">ROBOTIC´S LAB MX</b>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-black/45">
              Aprende | Programa | Crea
            </small>
          </span>
        </button>

        <nav
          className={`${
            menuOpen
              ? "absolute left-4 right-4 top-20 flex"
              : "hidden"
          } flex-col gap-2 rounded-xl border bg-[#FCF9F2] p-4 shadow-xl md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                page === id
                  ? "bg-[#FFF0D9] text-[#A85300]"
                  : "text-black/70 hover:text-[#EC7A00]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("progreso")}
          className="hidden items-center gap-2 rounded-md bg-[#EC7A00] px-5 py-3 text-sm font-bold text-white md:flex"
        >
          <Icon name="clock" className="size-4" />
          Ver mi avance {progress > 0 && `· ${progress}%`}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md border p-2 md:hidden"
          aria-label="Abrir menú"
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </div>
    </header>
  );
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA LA PÁGINA INICIO ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Home({ go, progress, checkedParts, checkedTasks, tasks }: { go: (page: Page) => void; progress: number; checkedParts: string[]; checkedTasks: string[]; tasks: ManualStep[] }) {
  const partsPercentage = Math.round((checkedParts.length / parts.length) * 100);
  const activeCompleted = checkedTasks.filter(id => tasks.some(task => task.id === id)).length;
  const tasksPercentage = Math.round((activeCompleted / Math.max(1, tasks.length)) * 100);
  const remainingMinutes = Math.max(0, 391 - Math.round(391 * (activeCompleted / Math.max(1, tasks.length))));
  return <main>

    <section className="relative min-h-[650px] overflow-hidden bg-[#1B130D] text-white">
      <img src={inicio} alt="Taller de trabajo con herramientas" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <span className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50" />
      <div className="absolute bottom-10 right-[12%] hidden w-[200px] opacity-100 lg:block">
        <img
          src={robotchat} alt="robotchat" className="w-full max-w-[1000px] h-auto object-contain"/>
      </div>
      
      <div className="relative mx-auto flex min-h-[650px] max-w-[1080px] flex-col items-center justify-center px-5 text-center">
        <p className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em]">Manual interactivo · Modelo CB-1</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">Mi Primer Robot<br /> </h1>
        <p className="mt-3 max-w-4xl text-[15px] leading-6 text-white/85 ">¡Hola! Bienvenido a tu primer proyecto de Robótica: Construye, programa y diviértete desde cero.</p>
        <p className="mt-3 max-w-5xl text-[15px] leading-6 text-white/85">Este curso interactivo está diseñado especialmente para ti, que tienes poco o ningún conocimiento previo en robótica, electrónica o programación.<br></br><br></br>Olvídate de los manuales aburridos y llenos de tecnicismos imposibles: aquí aprenderás haciendo, experimentando y divirtiéndote en cada etapa del camino.</p>
        <p className="mt-3 max-w-5xl text-[15px] leading-6 text-white/85">Revisa la introducción, verifica e identifica cada pieza que viene en tu kit, sigue el tutorial por módulos y calcula tu avance en tiempo real en la escuela, laboratorio o en casa.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={() => go("introduccion")} className="rounded-md bg-[#EC7A00] px-8 py-3 text-sm font-bold">Comenzar el Proyecto</button><button onClick={() => go("progreso")} className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold">Consultar mi progreso</button></div>
        <div className="mt-12 grid w-full max-w-2xl grid-cols-2 border border-white/10 bg-black/20 sm:grid-cols-4">
          {[["6", "Módulos de armado"], ["30", "Pasos guiados"], ["26", "Piezas a verificar"], ["3–4 h", "Tiempo estimado"]].map(([value, label]) => <div key={label} className="border font-bold border-white/10 p-4"><b className="font-display text-xl">{value}</b><p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">{label}</p></div>)}
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-2 md:items-center">
      <div><p className="eyebrow">● Sobre éste Proyecto</p>
      <h2 className="display-title">Carrito - Robot</h2>
      <h2 className="display-subtitle">Modelo CB-1</h2>
      <p className="copy">
        MODOS Y FUNCIONALIDADES DESTACADAS:</p>
      <p className="copysub">
        📲 Control Total por App Descargable (APK) : Conecta tu smartphone 
        Android por vía Bluetooth y WiFi para controlar el robot en tiempo real.</p>
      <p className="copysub">
        💡 Faros LED RGB Personalizables: Cambia el color y los efectos de las luces 
        delanteras y traseras.</p>
      <p className="copysub">
        📢 Claxon Integrado: Emite alertas y señales sonoras utilizando el módulo buzzer incorporado.</p>
      <p className="copysub">
        ⛔ Sistema Anti-Colisión (Evasión de Obstáculos): Utiliza el sensor ultrasónico para detectar paredes u objetos en la ruta y evitar colisiones automáticamente.</p>
      <p className="copysub">
        🛣️ Seguidor de Línea: Autonomía mediante sensores infrarrojos para detectar y recorrer circuitos marcados en el suelo.</p>
      
      <div className="mt-7 grid grid-cols-2 gap-3">{[["Placa ESP32", "Microprocesador de doble núcleo con conectividad WiFi y Bluetooth."], ["Chasis de Acrílico", "Estructura resistente de doble piso y fácil ensamblaje."], ["Codigo Abierto", "Código base disponible en GitHub para modificar, aprender y personalizar."], ["Personaliza tu App Móvil", "Modifica JoySticks, fondos de pantalla y colores del sistema"]].map(([v,l])=><div key={l} className="rounded-md border border-black/8 bg-white/40 p-4"><b>{v}</b><p className="text-xs text-black/50">{l}</p></div>)}</div><button className="primary mt-7" onClick={() => go("introduccion")}>Lee la introducción completa <Icon name="arrow" className="size-4" /></button></div>
      
      <img
          src={carritoycelular} alt="Carrito" className="w-full max-w-[1000px] h-auto object-contain"/>
  
    </section>

    <section className="border-y border-black/8 bg-[#FFFDF8]">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow">● Contenido del Curso</p>
        <h2 className="display-title ">5 Secciones en éste manual.</h2>
        
        <p className="mt-2 max-w-2xl text-base leading- text-black/60">Cada sección tiene una función concreta dentro del armado. Puedes recorrerlas en orden la primera vez y volver a la que necesites después.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["introduccion", "Introducción", "Conoce el Robot, sus especificaciones, los aprendizajes que obtendrás, las herramientas que necesitas y cómo aprovechar cada sección de este manual..", "LECTURA PREVIA", "star"],
            ["piezas","Lista de piezas","Checklist completa por categoría. Marca cada pieza conforme la reconoces y no te falte nada.","90 PIEZAS","listCheck"],
            ["manual","Tutorial paso a paso","Seis módulos ordenados con pasos detallados, tips de taller y el tiempo que toma cada uno.","6 MÓDULOS","puzzle"],
            ["progreso","Calculadora de progreso","Mira tu avance general, el detalle por módulo y cuánto tiempo te queda por delante.","EN VIVO","clock"],
            ["preguntas","Preguntas frecuentes","Respuestas rápidas sobre armado, piezas, herrajes y mantenimiento del carrito.","12 DUDAS","help"],
          ].map(([id,title,text,badge,icon])=>
          <button key={id} onClick={()=>go(id as Page)} className="group flex min-h-64 flex-col rounded-lg border border-black/10 bg-[#FCF9F2] p-6 text-left transition hover:-translate-y-1 hover:border-[#E3AE68]">
            <span className="flex items-start justify-between gap-4"><span className="grid size-11 place-items-center rounded-md bg-[#FFE9C9] text-[#B86000]"><Icon name={icon} className="size-5" /></span><small className="rounded-full bg-[#FCEDE6] px-3 py-1.5 text-[9px] font-semibold tracking-[.08em] text-[#98503B]">{badge}</small></span>
            <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-black/60">{text}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#B86000]">Abrir sección <Icon name="arrow" className="size-4" /></span>
          </button>)}
          <button onClick={()=>go("progreso")} className="group flex min-h-64 flex-col rounded-lg border border-[#A8D5AE] bg-[#E4F5E4] p-6 text-left transition hover:-translate-y-1">
            <span className="grid size-11 place-items-center rounded-md bg-[#2F8F55] text-white"><Icon name="check" className="size-5" /></span>
            <h3 className="mt-6 font-display text-xl font-bold">Avance Guardado</h3>
            <p className="mt-3 text-sm leading-6 text-black/60">Tu avance se guarda automáticamente en este dispositivo. Puedes cerrar el manual y continuar justo donde lo dejaste.</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#267343]">Ver cómo funciona <Icon name="arrow" className="size-4" /></span>
          </button>
        </div>
      </div>
    </section>

    
    <section className="ruta-armado mx-auto max-w-6xl">

      {/* Encabezado */}
      <div className="ruta-armado-header">

        <div>
          <p className="eyebrow">
            ● Ruta de Armado
          </p>

          <h2 className="display-title">
            Completa los 6 módulos
          </h2>
          <h2 className="display-subtitle">y logra tus objetivos de manera organizada.</h2>
        </div>

        <button className="primary" onClick={()=>go("manual")}>Comenzar la Ruta de Armado <Icon name="arrow" className="size-4" /></button>

      </div>

      {/* Tarjetas de módulos */}
      <div className="ruta-armado-grid">

        {modules.map((module) => (
          <div
            key={module.id}
            className="ruta-armado-card"
          >

            <div className="ruta-armado-card-header">

              <span className="text-[#EC7A00]">
                <Icon name={module.icon} />
              </span>

              <span className="ruta-armado-card-number font-display">
                {String(module.id).padStart(2, "0")}
              </span>

            </div>

            <h3 className="font-display font-bold">
              {module.title}
            </h3>

            <p className="text-black/45">
              {module.count} pasos · ~{module.time} min
            </p>

          </div>
        ))}

      </div>

    </section>
```


    <section className="bg-[#160D09] text-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow text-[#E7A756]">● Calculadora de progreso</p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-[-.035em] sm:text-5xl">Tu avance, siempre a la vista</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/70">El manual recuerda qué piezas ya reuniste y qué pasos completaste. Solo tienes que marcar y el cálculo se actualiza al instante.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={()=>go("progreso")} className="primary"><Icon name="clock" className="size-4" />Abrir Calculadora</button>
            <button onClick={()=>go("piezas")} className="rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white">Revisar piezas</button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-8">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">Pasos completados</p><p className="mt-2 font-display text-3xl font-bold">{checkedTasks.length}/{tasks.length}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">Tiempo restante</p><p className="mt-2 font-display text-3xl font-bold">{Math.floor(remainingMinutes/60)} h {remainingMinutes%60} min</p></div>
          </div>
        </div>

        <div className="rounded-lg border border-white/20 bg-white/5 p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">Avance general</p><p className="mt-1 font-display text-5xl font-bold">{progress}%</p></div>
            <span className="grid size-14 place-items-center rounded-full bg-[#EC7A00]/20 text-[#EC7A00]"><Icon name="tool" className="size-6" /></span>
          </div>
          <div className="mt-6 space-y-4">
            {[["Piezas reunidas",partsPercentage],["Pasos del tutorial",tasksPercentage]].map(([label,value])=><div key={label as string}><div className="flex justify-between text-xs"><span>{label}</span><b>{value}%</b></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EAE3D7]"><div className="h-full rounded-full bg-[#EC7A00] transition-all" style={{width:`${value}%`}} /></div></div>)}
          </div>
          <div className="my-7 border-t border-white/15" />
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">Por módulo</p>
          <div className="mt-4 space-y-3">
            {modules.map((module)=>{
              const moduleTasks=tasks.filter((task)=>task.moduleId===module.id);
              const completed=moduleTasks.filter((task)=>checkedTasks.includes(task.id)).length;
              const modulePercentage=Math.round((completed/moduleTasks.length)*100);
              return <div key={module.id} className="grid grid-cols-[34px_1fr_36px] items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md bg-white/15 text-[#EC7A00]"><Icon name={module.icon} className="size-4" /></span>
                <span><span className="block text-xs font-semibold">{module.title}</span><span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[#EAE3D7]"><span className="block h-full rounded-full bg-[#EC7A00] transition-all" style={{width:`${modulePercentage}%`}} /></span></span>
                <b className="text-right text-xs">{modulePercentage}%</b>
              </div>;
            })}
          </div>
        </div>
      </div>
    </section>


<section className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[.7fr_1.3fr]">

  {/* Imagen del robot superpuesta */}
  <div className="absolute bottom-15 right-[65%] z-20 hidden w-[200px] opacity-100 lg:block pointer-events-none">
    <img
      src={robotchat}
      alt="robotchat"
      className="w-full max-w-[1000px] h-auto object-contain"
    />
  </div>

  {/* Columna izquierda */}
  <div className="relative z-10">
    <p className="eyebrow">● Resuelve antes de empezar</p>

    <h2 className="display-title">
      Dudas que aparecen siempre
    </h2>

    <p className="copy">
      Reunimos las preguntas más repetidas de quienes arman el Carrito Bobot CB-1 por primera vez y te ayudamos a resolverlas.

    </p>

    <button
      onClick={() => go("preguntas")}
      className="secondary mt-6"
    >
      Ver todas las preguntas
    </button>
  </div>

  {/* Columna derecha: preguntas frecuentes */}
  <div className="relative z-10 space-y-3">
    {faqs.slice(0, 4).map(([, q, a]) => (
      <div
        key={q}
        className="rounded-lg border bg-white/30 p-5"
      >
        <h3 className="font-display font-bold">
          {q}
        </h3>

        <p className="mt-2 text-sm leading-6 text-black/50">
          {a}
        </p>
      </div>
    ))}
  </div>

</section>


    {/*<section className="relative overflow-hidden bg-[#1A100A] text-white"><img src={inicio2} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="relative mx-auto max-w-[1080px] px-5 py-20 text-center"><p className="eyebrow text-[#E7A756]">¿Manos a la obra?</p><h2 className="display-title">Todo listo para empezar tu carrito</h2><p className="mx-auto mt-4 max-w-lg text-sm text-white/60">Repasa la introducción, revisa tus piezas y sigue el tutorial módulo a módulo.</p><button className="primary mt-7" onClick={()=>go("introduccion")}>Ir al manual</button></div></section>*/}
  </main>;
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA PÁGINA INICIO -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// =>   COMIENZA PÁGINA INTRODUCCIÓN -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

  function Introduction({ go }: { go: (page: Page) => void }) {

  // ==========================================
  // 1.  TARJETA DE ESPECIFICACIONES TÉCNICAS
  // ==========================================

  const specs: [string, string][] = [
    ["Modelo", "Carrito Robot CB-1"],
    ["Medidas armado", "86 × 92 × 48 cm"],
    ["Peso del kit", "18,5 kg"],
    ["Peso armado", "20,2 kg"],
    ["Material del chasis", "Acrílico transparente"],
    ["Procesador", "Placa ESP32 de Doble núcleo con conectividad WiFi y Bluetooth."],
    ["Baterías", "Li-ion recargables (3.7v)"],
    ["Control remoto", "Aplicación Android"],
    ["Código fuente abierto", "Repositorio GitHub"],
  ];

  // ==========================================
  // 2. HERRAMIENTAS NECESARIAS
  // ==========================================

  const tools = [
    {
      name: "Desarmador de Cruz PH0",
      badge: "INCLUIDA",
      icon: "plus",
      description:
        "Diámetro aproximado de 2.5 mm, Ideal para tornillos pequeños  y que utilizaremos en el proceso.",
    },
    {
      name: "Laptop o PC",
      badge: "NO INCLUIDA",
      icon: "computer",
      description:
        "Equipo de cómputo donde puedas abrir liks y programar tu robot mediante código.",
    },
    {
      name: "Celular o Tablet",
      badge: "NO INCLUIDA",
      icon: "mobile",
      description:
        "Dispositivo para descargar la aplicación móvil del control remoto.",
    },
    {
      name: "WiFi",
      badge: "PIDE LA CLAVE",
      icon: "wifi",
      description:
        "Para descarga de Aplicación Móvil, Manual interactivo y Repositorios de GitHub .",
    },
  ];

  // ==========================================
  // 3. RECOMENDACIONES DE SEGURIDAD
  // ==========================================

  const safetyTips = [
    "Trabaja siempre sobre una superficie plana y firme.",
    "No aprietes los tornillos por completo hasta terminar cada módulo.",
    "No consumas alimentos ni bebidas en el área de trabajo.",
    "Mantén a mascotas lejos del área de trabajo.",
    "Si una pieza no encaja, no la fuerces: revisa el lado correcto.",
  ];

  // ==========================================
  // 4. RENDERIZADO DEL COMPONENTE
  // ==========================================

  return (
    <main>

      {/* ======================================
          BLOQUE 1: ENCABEZADO DE INTRODUCCIÓN
      ====================================== */}

      <HeroTitle
        eyebrow="Introducción"
        title={
          <>
            Todo lo que necesitas saber
            <br />
            antes de comenzar
          </>
        }
        description="Un repaso rápido del carrito, sus especificaciones, los aprendizajes que obtendrás, las herramientas que necesitas y cómo aprovechar cada sección de este manual."
        action={
          <button
            className="primary"
            onClick={() => go("piezas")}
          >
            Ir a la lista de piezas
          </button>
        }
      />

      {/* ======================================
          BLOQUE 2: DESCRIPCIÓN Y ESPECIFICACIONES
      ====================================== */}

      <section className="mx-auto grid max-w-[1080px] gap-12 px-5 py-20 md:grid-cols-[1.15fr_.85fr]">

        {/* DESCRIPCIÓN DEL CARRITO */}

        <div>
          <h2 className="font-display text-2xl font-bold">
            ¿Qué es el Carrito Robot CB-1?
          </h2>

          <div className="copy space-y-4">
            <p>
              El CB-1 es un prototipo de carrito robot armable, donde se integran diferentes areas de aprendizajes como:
              <br></br><br></br>
              <strong>1. Sistemas eléctricos y electrónicos:</strong> Conocerás cómo fluye 
              la energía, qué es un circuito y para qué sirven componentes 
              clave como motores, sensores y baterías.
              <br></br><br></br>
              <strong>2. Robótica aplicada:</strong> Entenderás cómo ensamblar un chasis y conectar 
              la parte mecánica con el "cerebro" de tu robot.
              <br></br> <br></br>
              <strong>3. Programación básica:</strong> Aprenderás a darle vida a tus creaciones 
              escribiendo tus primeras líneas de código para que tu robot obedezca 
              tus órdenes y se mueva por sí mismo.
              <br></br> <br></br>
              Todo el kit se arma con un sólo desarmador de cruz pequeño, sin
              necesidad de herramientas especiales.
            </p>

            <p><br></br>
              <strong>Sus funcionalidades destacadas son:</strong>
              <br></br> <br></br>
              <strong>- Control Total por App Descargable (APK):</strong> Conecta tu smartphone Android 
              por vía Bluetooth y WiFi para controlar el robot en tiempo real. Modifica JoySticks, 
              fondos de pantalla y colores del sistema a tu gusto.
              <br></br> <br></br>
              <strong>- Faros LED RGB Personalizables:</strong> Cambia el color y los efectos de las luces delanteras y traseras.
              <br></br> <br></br>
              <strong>- Claxon Integrado:</strong> Emite alertas y señales sonoras utilizando el módulo buzzer incorporado.
              <br></br> <br></br>
              <strong>- Sistema Anti-Colisión (Evasión de Obstáculos):</strong> Utiliza el sensor ultrasónico para detectar 
              paredes u objetos en la ruta y evitar colisiones automáticamente.
              <br></br> <br></br>
              <strong>- Seguidor de Línea:</strong> Autonomía mediante sensores infrarrojos para detectar y recorrer circuitos marcados en el suelo.
            </p>

            <p><br></br> 
              Este manual incorpora una checklist de piezas, módulos y pasos que conecta con una
              calculadora de avance que te indica en todo momento
              cuánto llevas y cuánto te falta.
            </p>
          </div>

          {/* AVISO: CÓMO USAR EL MANUAL */}

          <div className="mt-7 flex gap-4 rounded-lg border border-[#AFDAB2] bg-[#E4F5E4] p-5">

            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[#2F8F55] text-white">
              <Icon name="check" />
            </span>

            <div>
              <b>Cómo usar este manual</b>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Sigue el orden natural: primero revisa la lista de
                piezas, después avanza por los módulos del tutorial
                y consulta tu progreso cuando quieras.
              </p>
            </div>

          </div>
        </div>

        {/* IMAGEN Y FICHA TÉCNICA */}

        <div>

          {/* IMAGEN DE DETALLE */}

          <div className="overflow-hidden rounded-lg border bg-[#EFE2CD]">

            <img
              src={ninacarrito}
              alt="Detalle de una unión estructural de taller"
              className="h-64 w-full object-cover"
            />

            <p className="p-4 text-xs leading-5 text-black/55">
              Cada unión combina tornillo, arandela plana y tuerca
              autoblocante.
            </p>

          </div>

          {/* TABLA DE ESPECIFICACIONES */}

          <div className="mt-4 rounded-lg border p-5">

            <h3 className="font-display font-bold">
              Especificaciones técnicas
            </h3>

            <div className="mt-4 divide-y">

              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 py-3 text-xs"
                >
                  <span className="text-black/50">
                    {label}
                  </span>

                  <b className="text-right">
                    {value}
                  </b>
                </div>
              ))}

            </div>
          </div>

        </div>

      </section>

      {/* ======================================
          BLOQUE 3: HERRAMIENTAS NECESARIAS
      ====================================== */}

      <section className="border-y border-black/8 bg-[#F7F3EB]">

        <div className="mx-auto max-w-[1200px] px-5 py-20">

          <h2 className="font-display text-3xl font-bold tracking-[-.03em]">
            Herramientas necesarias
          </h2>

          <p className="mt-3 text-base text-black/65">
            El desarmador de cruz viene incluido. El resto son apoyos
            opcionales que puedes tener en casa, escuela o laboratorio.
          </p>

          {/* TARJETAS DE HERRAMIENTAS */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {tools.map((tool) => (

              <article
                key={tool.name}
                className="min-h-56 rounded-lg border border-black/10 bg-[#FFFCF7] p-6"
              >

                {/* ICONO Y ETIQUETA */}

                <div className="flex items-start justify-between gap-4">

                  <span className="grid size-12 place-items-center rounded-md bg-[#FFE7C2] text-[#B85E00]">

                    <Icon
                      name={tool.icon}
                      className="size-5"
                    />

                  </span>

                  <small
                    className={`rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[.08em] ${
                      tool.badge === "INCLUIDA"
                        ? "bg-[#DDF2DF] text-[#267343]"
                        : "bg-[#F9E5DE] text-[#8E4B38]"
                    }`}
                  >
                    {tool.badge}
                  </small>

                </div>

                {/* INFORMACIÓN DE LA HERRAMIENTA */}

                <h3 className="mt-5 font-display text-lg font-bold">
                  {tool.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/60">
                  {tool.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ======================================
          BLOQUE 4: SEGURIDAD DURANTE EL ARMADO
      ====================================== */}

      <section className="mx-auto max-w-[900px] px-5 py-20">

        <h2 className="font-display text-2xl font-bold">
          Seguridad durante el armado
        </h2>

        {/* LISTA DE RECOMENDACIONES */}

        <div className="mt-7 space-y-3">

          {safetyTips.map((text) => (

            <p
              key={text}
              className="flex gap-3 rounded-lg border bg-white/30 p-4 text-sm"
            >

              <Icon
                name="check"
                className="size-4 shrink-0 text-[#2F8F55]"
              />

              {text}

            </p>

          ))}

        </div>

        {/* BOTÓN PARA CONTINUAR */}

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-lg bg-[#FFF0D9] p-5 sm:flex-row sm:items-center">

          <p className="text-sm">
            ¿Todo claro? El siguiente paso es revisar que tengas
            todas las piezas.
          </p>

          <button
            className="primary"
            onClick={() => go("piezas")}
          >
            Ver la lista de piezas
          </button>

        </div>

      </section>

    </main>
  );
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA PÁGINA INTRODUCCIÓN -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA PÁGINA LISTA DE PIEZAS -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------


function PartsPage({
  checked,
  setChecked,
  filter,
  setFilter,
  search,
  setSearch,
  go,
}: {
  checked: string[];
  setChecked: (value: string[]) => void;
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  go: (page: Page) => void;
}) {
  // Imagen seleccionada para mostrar en el visor ampliado.
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  // Cerrar el visor con Escape.
  useEffect(() => {
    if (!selectedPart) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPart(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPart]);

  // ==========================================
  // 1. FUNCIONES
  // ==========================================

  // Marcar o desmarcar una pieza únicamente desde su casilla.
  const toggle = (code: string) => {
    setChecked(
      checked.includes(code)
        ? checked.filter((id) => id !== code)
        : [...checked, code]
    );
  };

  // ==========================================
  // 2. FILTRADO DE PIEZAS
  // ==========================================

  const visibleGroups = partGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          (filter === "Todas" || filter === group.name) &&
          `${item.code} ${item.name} ${item.material}`
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  // ==========================================
  // 3. CÁLCULO DEL PROGRESO
  // ==========================================

  const pct = Math.round((checked.length / parts.length) * 100);

  // ==========================================
  // 4. ESTRUCTURA PRINCIPAL
  // ==========================================

  return (
    <main>
      {/* ======================================
          4.1. ENCABEZADO
      ====================================== */}

      <HeroTitle
        eyebrow="Lista de piezas"
        title={
          <>
            Identifica cada pieza antes de
            comenzar
          </>
        }
        description="Marca las piezas conforme las reconovas reconociendo. Así confirmas que el contenido está completo y puedes comenzar a construir tu Robot de manera segura."
        action={
          <button
            className="primary"
            onClick={() => go("manual")}
          >
            Ir al manual<Icon name="arrow" className="size-5" /> 
          </button>
        }
      />

      {/* ======================================
          4.2. CONTENEDOR DE INVENTARIO
      ====================================== */}

      <section className="mx-auto max-w-[1040px] px-5 py-12">

        {/* ====================================
            4.2.1. TARJETA DE PROGRESO
        ==================================== */}

        <div className="rounded-lg border p-5">
          <div className="flex justify-between text-sm">
            <span>
              Piezas reunidas
              <br />
              <b className="text-xl">
                {checked.length} / {parts.length}
              </b>
            </span>

            <span className="text-right text-xs text-black/45">
              Avance de inventario
              <br />
              {pct}%
            </span>
          </div>

          {/* Barra de progreso */}

          <div className="mt-4 h-2 rounded-full bg-[#EAE3D7]">
            <div
              className="h-full rounded-full bg-[#2F8F55]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* ====================================
            4.2.2. BUSCADOR Y FILTROS
        ==================================== */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          {/* Buscador */}

          <label className="flex flex-1 items-center gap-2 rounded-md border bg-white/40 px-4 py-3 text-sm">
            <Icon
              name="search"
              className="size-4 text-black/40"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, código o material"
              className="w-full bg-transparent outline-none"
            />
          </label>

          {/* Botones de categorías */}

          <div className="flex flex-wrap gap-2">
            {["Todas", ...partGroups.map((g) => g.name)].map(
              (name) => (
                <button
                  key={name}
                  onClick={() => setFilter(name)}
                  className={`rounded-full px-4 py-2 text-xs ${
                    filter === name
                      ? "bg-[#ec7a00] text-white font-bold"
                      : "bg-white/50 hover:bg-[#FFF0D9]"
                  }`}
                >
                  {name}
                </button>
              )
            )}
          </div>
        </div>

        {/* ====================================
            4.2.3. LISTA DE GRUPOS DE PIEZAS
        ==================================== */}

        <div className="mt-10 space-y-8">
          {visibleGroups.map((group) => {
            // Obtener el índice del grupo original
            const groupIndex = partGroups.findIndex(
              (item) => item.name === group.name
            );

            return (
              <section key={group.name}>

                {/* Encabezado del grupo */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-md bg-[#FFE9C9] text-[#B86000]">
                      <Icon
                        name={group.icon}
                        className="size-4"
                      />
                    </span>

                    <div>
                      <h2 className="font-display font-bold">
                        {group.name}
                      </h2>

                      <p className="text-[10px] text-black/40">
                        {group.items.length} tipos de pieza
                      </p>
                    </div>
                  </div>

                  {/* Marcar todas las piezas del grupo */}

                  {/* Marcar o desmarcar todas las piezas de la sección */}

{(() => {
  // Comprobar si todas las piezas de esta sección están marcadas
  const allChecked = group.items.every((item) =>
    checked.includes(item.code)
  );

  // Obtener los códigos de las piezas de esta sección
  const groupCodes = group.items.map((item) => item.code);

  return (
    <button
      type="button"
      onClick={() => {
        if (allChecked) {
          // Si todas están marcadas, desmarcar únicamente esta sección
          setChecked(
            checked.filter((code) => !groupCodes.includes(code))
          );
        } else {
          // Si falta alguna, marcar todas las piezas de esta sección
          setChecked(
            Array.from(
              new Set([
                ...checked,
                ...groupCodes,
              ])
            )
          );
        }
      }}
      className={`rounded-md px-3 py-2 text-xs font-bold transition-all duration-200 ${
        allChecked
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-[#FFF0D9] text-[#B86000] hover:bg-[#FFE0B2]"
      }`}
    >
      {allChecked ? "Desmarcar todas" : "Marcar todas"}
    </button>
  );
})()}
                </div>

                {/* ==================================
                    Tarjetas individuales de piezas
                ================================== */}

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {group.items.map((part) => {
                    const { code, name, qty, material, image } = part;
                    const imageSrc = image
                      ? `${import.meta.env.BASE_URL}${image.replace(/^\/+/, "")}`
                      : "";

                    return (
                      <article
                        key={code}
                        className={`flex items-center gap-3 rounded-lg border p-3 transition ${
                          checked.includes(code)
                            ? "border-[#9CCC9F] bg-[#EDF8EA]"
                            : "bg-white/25 hover:border-[#E3AE68]"
                        }`}
                      >
                        {/* La imagen tiene una acción propia: abrir el visor. */}
                        <button
                          type="button"
                          onClick={() => image && setSelectedPart(part)}
                          disabled={!image}
                          aria-label={`Ampliar imagen de ${name}`}
                          title={image ? "Ver imagen ampliada" : "Imagen no disponible"}
                          className={`relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-md bg-[#E9DFD0] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec7a00] ${
                            image ? "cursor-zoom-in" : "cursor-not-allowed"
                          }`}
                        >
                          {image ? (
                            <img
                              src={imageSrc}
                              alt={`Imagen de ${name}`}
                              loading="lazy"
                              onError={(event) => {
                                console.error(`No se pudo cargar la imagen de ${name}:`, image);
                                event.currentTarget.style.display = "none";
                                const placeholder = event.currentTarget.parentElement?.querySelector(".image-error");
                                placeholder?.classList.remove("hidden");
                              }}
                              className="h-full w-full object-contain p-1 transition duration-300 hover:scale-105"
                            />
                          ) : null}
                          <span
                            className={`image-error px-2 text-center text-[10px] text-black/50 ${image ? "hidden" : ""}`}
                          >
                            Imagen no disponible
                          </span>
                          <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1.5 py-0.5 text-[8px] font-bold text-white">
                            {code}
                          </span>
                          {image && (
                            <span className="absolute right-1 top-1 rounded bg-black/65 px-1.5 py-1 text-[10px] text-white" aria-hidden="true">
                              ⤢
                            </span>
                          )}
                        </button>

                        {/* Área de activación ampliada, independiente de la imagen. */}
                        <label
                          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-lg transition hover:bg-[#2F8F55]/10 focus-within:ring-2 focus-within:ring-[#2F8F55]"
                          title={`Marcar ${name} como reunida`}
                        >
                          <input
                            type="checkbox"
                            aria-label={`Marcar ${name} como reunida`}
                            checked={checked.includes(code)}
                            onChange={() => toggle(code)}
                            className="size-6 cursor-pointer accent-[#2F8F55]"
                          />
                        </label>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <b className="text-sm">{name}</b>
                            <strong className="shrink-0 text-right">
                              {qty}
                              <small className="ml-1 block text-[10px] font-normal text-black/70">
                                PZA
                              </small>
                            </strong>
                          </div>
                          <p className="mt-2 text-xs text-black/45">{material}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* ====================================
            4.2.4. BLOQUE FINAL DE NAVEGACIÓN
        ==================================== */}

        <div className="mt-12 flex flex-col justify-between gap-4 rounded-lg border border-[#A8D5AE] bg-[#E4F5E4] p-5 sm:flex-row sm:items-center">

          <p className="text-sm">
            ¿Ya reuniste tus piezas? Continúa con el armado paso a paso.
          </p>

          <button
            className="primary"
            onClick={() => go("manual")}
          >
            Empezar el Módulo 1<Icon name="arrow" className="size-4" />
          </button>
        </div>

      </section>

      {/* Visor ampliado: cerrar con la X, Escape o clic en el fondo oscuro. */}
      {selectedPart && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedPart(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="part-image-title"
            className="relative w-full max-w-4xl rounded-xl border border-white/15 bg-[#171717] p-4 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPart(null)}
              aria-label="Cerrar imagen ampliada"
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ×
            </button>
            <div className="mb-4 pr-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#ec7a00]">{selectedPart.code}</p>
              <h2 id="part-image-title" className="mt-1 text-lg font-bold text-white sm:text-xl">{selectedPart.name}</h2>
              <p className="mt-1 text-sm text-white/60">Cantidad: {selectedPart.qty} PZA · {selectedPart.material}</p>
            </div>
            <div className="grid min-h-[220px] max-h-[75vh] place-items-center overflow-hidden rounded-lg bg-white p-2 sm:p-4">
              <img
                src={`${import.meta.env.BASE_URL}${selectedPart.image.replace(/^\/+/, "")}`}
                alt={`Imagen ampliada de ${selectedPart.name}`}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs text-white/50">Haz clic fuera de la imagen o presiona Esc para cerrar.</p>
          </div>
        </div>
      )}
    </main>
  );
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA PÁGINA LISTA DE PIEZAS -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA PÁGINA MANUAL -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

function Manual({
  checked,
  setChecked,
  go,
  tasks,
}: {
  checked: string[];
  setChecked: (value: string[]) => void;
  go: (page: Page) => void;
  tasks: ManualStep[];
}) {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [videoTask, setVideoTask] = useState<ManualStep | null>(null);
  const toggle = (id: string) => setChecked(checked.includes(id) ? checked.filter(value => value !== id) : [...checked, id]);
  const completedCount = tasks.filter(task => checked.includes(task.id)).length;
  const manualProgress = Math.round(completedCount / Math.max(1, tasks.length) * 100);
  const remainingMinutes = Math.max(0, tasks.reduce((total, task) => total + task.duration, 0) - tasks.filter(task => checked.includes(task.id)).reduce((total, task) => total + task.duration, 0));
  const getCover = (moduleId: number) => modules.find((module) => module.id === moduleId)?.cover || "";
  const getVideoKind = (url = "") => /\.mp4(?:$|\?)/i.test(url) ? "mp4" : "embed";
  const toEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
  };

  return (
    <main>
      <HeroTitle eyebrow="Tutorial paso a paso" title={<>Seis módulos para armar<br />sin perder el hilo</>} description="Completa las tareas en orden. Cada marca se guarda automáticamente y alimenta tu calculadora de progreso." action={<button className="secondary" onClick={() => go("progreso")}>Ver mi progreso</button>} />
      <section className="mx-auto max-w-[1280px] px-5 py-12">
        <div className="mb-10 rounded-xl border border-black/10 bg-[#FBF8F1] p-6 sm:p-8"><div className="grid gap-8 lg:grid-cols-[1.3fr_.9fr] lg:items-center"><div><div className="flex items-end justify-between gap-4"><div><p className="text-base text-black/70">Avance del armado</p><p className="mt-1 font-display text-5xl font-bold">{manualProgress}%</p></div><p className="pb-1 text-base text-black/60">{completedCount} de {tasks.length} pasos</p></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-[#EAE3D7]"><div className="h-full rounded-full bg-[#2F8F55] transition-all duration-500" style={{ width: `${manualProgress}%` }}/></div></div><div className="flex items-center gap-4 rounded-xl border border-black/10 bg-[#FFFDF8] p-5"><span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#DDF2DF] text-[#267343]"><Icon name="clock" className="size-6"/></span><div><p className="text-xs font-medium uppercase tracking-[.12em] text-black/55">Tiempo restante estimado</p><p className="mt-1 font-display text-2xl font-bold">{Math.floor(remainingMinutes / 60)} h {remainingMinutes % 60} min</p></div></div></div>
          <div className="my-7 border-t border-black/10"/><div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{modules.map(module => { const moduleTasks = tasks.filter(task => task.moduleId === module.id); const completed = moduleTasks.filter(task => checked.includes(task.id)).length; const percent = Math.round(completed / Math.max(1, moduleTasks.length) * 100); return <button key={module.id} onClick={() => setExpanded(expanded === module.id ? null : module.id)} className={`rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${expanded === module.id ? "border-[#E2B06E] bg-[#FFF0D9]" : "border-black/10 bg-[#FFFDF8]"}`}><img src={getCover(module.id)} alt="" className="mb-3 h-20 w-full rounded-md object-cover"/><span className="flex items-center gap-2 text-[#B86000]"><Icon name={percent === 100 ? "check" : module.icon} className="size-4"/><span className="text-[10px] font-bold uppercase tracking-[.12em]">Módulo {String(module.id).padStart(2,"0")}</span></span><p className="mt-3 text-sm">{completed}/{moduleTasks.length} pasos</p><span className="mt-3 block h-2 overflow-hidden rounded-full bg-[#EAE3D7]"><span className="block h-full rounded-full bg-[#2F8F55]" style={{ width: `${percent}%` }}/></span></button>; })}</div>
        </div>

        <div className="space-y-4">{modules.map(module => { const moduleTasks = tasks.filter(task => task.moduleId === module.id); const complete = moduleTasks.filter(task => checked.includes(task.id)).length; const percentage = Math.round(complete / Math.max(1, moduleTasks.length) * 100); const isExpanded = expanded === module.id; return <article key={module.id} className={`overflow-hidden rounded-xl border transition ${isExpanded ? "border-[#E2B06E] bg-[#FFFDF8] shadow-sm" : "bg-[#FCF9F2]"}`}>
          <button onClick={() => setExpanded(isExpanded ? null : module.id)} className="grid w-full grid-cols-[88px_1fr_auto] items-center gap-4 p-3 text-left sm:grid-cols-[160px_1fr_auto] sm:gap-5 sm:p-4"><span className="relative h-24 overflow-hidden rounded-lg bg-[#24170F] sm:h-28"><img src={getCover(module.id)} alt={`Portada del módulo ${module.id}: ${module.title}`} className="h-full w-full object-cover opacity-80"/><span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/><span className={`absolute bottom-2 left-2 grid size-8 place-items-center rounded-md ${percentage === 100 ? "bg-[#2F8F55] text-white" : "bg-[#FFF0D9] text-[#B86000]"}`}><Icon name={percentage === 100 ? "check" : module.icon} className="size-4"/></span><span className="absolute right-2 top-2 rounded bg-black/55 px-2 py-1 font-display text-[10px] font-bold text-white">0{module.id}</span></span><span className="min-w-0"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B86000]">Módulo {String(module.id).padStart(2,"0")}</span><span className="mt-1 block font-display text-lg font-bold">{module.title}</span><span className="mt-3 block max-w-xl"><span className="flex justify-between text-[10px] text-black/45"><span>{complete}/{moduleTasks.length} pasos</span><span>{percentage}%</span></span><span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#EAE3D7]"><span className="block h-full rounded-full bg-[#2F8F55]" style={{ width: `${percentage}%` }}/></span></span></span><span className="flex items-center gap-3"><span className="hidden text-xs text-black/45 sm:block">~{module.time} min</span><span className={`grid size-9 place-items-center rounded-full border transition ${isExpanded ? "rotate-180 bg-[#FFF0D9]" : ""}`}><Icon name="chevron" className="size-4"/></span></span></button>
          {isExpanded && <div className="border-t border-black/8 bg-[#F8F4EB] p-4 sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><div><p className="font-display font-bold">Pasos del módulo</p><p className="mt-1 text-xs text-black/45">Revisa las instrucciones, consulta los recursos y marca cada paso al terminar.</p></div>{complete > 0 && <button onClick={() => setChecked(checked.filter(id => !moduleTasks.some(task => task.id === id)))} className="text-xs text-[#98503B] underline underline-offset-4">Desmarcar módulo</button>}</div>
            <div className="space-y-5">{moduleTasks.map((task, taskIndex) => { const done = checked.includes(task.id); const image = task.image || getCover(module.id); return <div key={task.id} className={`overflow-hidden rounded-lg border transition ${done ? "border-[#9CCC9F] bg-[#EDF8EA]" : "border-black/10 bg-[#FFFDF8]"}`}><div className="flex flex-col justify-between gap-3 border-b border-black/8 p-4 sm:flex-row sm:items-start"><div className="flex gap-3"><button type="button" onClick={() => toggle(task.id)} aria-label={done ? "Marcar como pendiente" : "Marcar como completado"} className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-[#2F8F55] text-white" : "bg-[#FFE9C9] text-[#B86000]"}`}>{done ? <Icon name="check" className="size-4"/> : taskIndex + 1}</button><div><h3 className={`font-display font-bold ${done ? "text-[#267343]" : ""}`}>{task.title}</h3><p className="text-sm text-gray-600 whitespace-pre-line">
  {task.description}
</p></div></div><span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-wider text-black/40"><Icon name="clock" className="size-3"/>{task.duration} min</span></div>
              <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-2"><figure className="overflow-hidden rounded-lg border border-black/10 bg-[#FFFDF8]"><div className="relative grid h-56 place-items-center overflow-hidden bg-[#E8DCC8]">{task.image ? <img src={task.image} alt={`Ilustración del paso: ${task.title}`} className="h-full w-full object-contain"/> : <span className="px-5 text-center text-sm text-black/45">Agrega una imagen en src/data/manualSteps.ts.</span>}<span className="absolute left-3 top-3 rounded bg-[#FFFDF8]/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">Imagen · Paso {taskIndex + 1}</span></div><figcaption className="flex items-center gap-2 px-4 py-3 text-xs text-black/55"><Icon name="panel" className="size-4 text-[#2F8F55]"/>{task.imageCaption || "Referencia visual del paso"}</figcaption></figure>
                <button type="button" disabled={!task.videoUrl} onClick={() => setVideoTask(task)} className="group overflow-hidden rounded-lg border border-black/10 bg-[#FFFDF8] text-left disabled:cursor-not-allowed disabled:opacity-60"><span className="relative grid h-56 place-items-center overflow-hidden bg-[#1D130D]">{task.image && <img src={task.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45"/>}<span className="absolute inset-0 bg-black/25"/><span className="relative grid size-16 place-items-center rounded-full bg-white text-[#EC7A00] shadow-xl transition group-hover:scale-105"><Icon name="play" className="size-7"/></span><span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">{task.videoUrl ? (getVideoKind(task.videoUrl) === "mp4" ? "Video MP4" : "Video en línea") : "Sin video asignado"}</span></span><span className="flex items-center gap-2 px-4 py-3 text-xs text-black/55"><Icon name="play" className="size-4 text-[#EC7A00]"/>{task.videoUrl ? "Reproducir video de este paso" : "Asigna un video en src/data/manualSteps.ts"}</span></button>
              </div>
            </div>; })}</div>
          </div>}
        </article>; })}</div>
        <div className="mt-10 flex justify-end"><button className="primary" onClick={() => go("progreso")}>Calcular mi avance</button></div>
      </section>
      {videoTask && <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setVideoTask(null)}><div className="w-full max-w-4xl overflow-hidden rounded-xl bg-[#FFFDF8] shadow-2xl" onClick={event => event.stopPropagation()}><div className="flex items-center justify-between p-4 sm:px-6"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#B86000]">Video del paso</p><h3 className="font-display text-lg font-bold">{videoTask.title}</h3></div><button onClick={() => setVideoTask(null)} aria-label="Cerrar video" className="grid size-10 place-items-center rounded-full border"><Icon name="x"/></button></div><div className="relative aspect-video bg-black">{videoTask.videoUrl && getVideoKind(videoTask.videoUrl) === "mp4" ? <video className="h-full w-full" src={videoTask.videoUrl} controls autoPlay playsInline /> : <iframe className="h-full w-full" src={toEmbedUrl(videoTask.videoUrl || "")} title={`Video: ${videoTask.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>}</div><p className="p-4 text-sm text-black/50 sm:px-6">Observa la orientación de las piezas y pausa el video cuando necesites comprobar una unión.</p></div></div>}
    </main>
  );
}

function Progress({ checkedParts, checkedTasks, setCheckedParts, setCheckedTasks, progress, go, tasks }: { checkedParts:string[];checkedTasks:string[];setCheckedParts:(v:string[])=>void;setCheckedTasks:(v:string[])=>void;progress:number;go:(p:Page)=>void;tasks:ManualStep[] }) {
  const activeCompleted = checkedTasks.filter(id => tasks.some(task => task.id === id)).length;
  const remaining=Math.max(0,391-Math.round(391*(activeCompleted/Math.max(1,tasks.length))));
  return <main><HeroTitle eyebrow="Calculadora de progreso" title={<>Tu avance de armado, al<br/>detalle</>} description="Aquí se combina el inventario de piezas y los pasos completados para calcular tu progreso real y el tiempo que te queda." action={<button className="secondary" onClick={()=>{setCheckedParts([]);setCheckedTasks([])}}><Icon name="reset" className="size-4"/> Reiniciar avance</button>} />
    <section className="mx-auto max-w-[1080px] px-5 py-16"><div className="grid gap-4 md:grid-cols-[260px_1fr_1fr]"><div className="row-span-2 grid place-items-center rounded-lg border p-7 text-center"><div className="grid size-44 place-items-center rounded-full border-[14px] border-[#EAE3D7]"><div><b className="font-display text-4xl">{progress}%</b><p className="text-[10px] uppercase tracking-wider text-black/45">Avance general</p></div></div><p className="mt-5 text-sm leading-6 text-black/55">El cálculo pondera el inventario de piezas y los pasos del tutorial completados.</p></div>{[
      ["Piezas reunidas",`${checkedParts.length} / ${parts.length}`,"grid","#DDF2DF"],
      ["Pasos completados",`${activeCompleted} / ${tasks.length}`,"tool","#FFE9C9"],
      ["Tiempo restante",`${Math.floor(remaining/60)} h ${remaining%60} min`,"clock","#FCE6DE"],
      ["Módulos terminados",`${modules.filter(m=>{const moduleTasks=tasks.filter(t=>t.moduleId===m.id);return moduleTasks.length>0 && moduleTasks.every(t=>checkedTasks.includes(t.id))}).length} / 6`,"check","#DDF2DF"],
    ].map(([label,value,icon,color])=><div key={label} className="rounded-lg border p-6"><span className="grid size-9 place-items-center rounded-md" style={{backgroundColor:color}}><Icon name={icon} className="size-4"/></span><p className="mt-4 text-xs uppercase tracking-wider text-black/45">{label}</p><b className="mt-2 block font-display text-3xl">{value}</b></div>)}</div>
      <div className="mt-10 rounded-lg border p-7"><div className="flex justify-between"><h2 className="font-display text-xl font-bold">Desglose por módulo</h2><button onClick={()=>go("manual")} className="text-sm font-bold text-[#B86000]">Continuar el tutorial →</button></div><div className="mt-6 space-y-4">{modules.map((module)=>{const moduleTasks=tasks.filter(t=>t.moduleId===module.id);const amount=moduleTasks.filter(t=>checkedTasks.includes(t.id)).length;const pct=Math.round(amount/Math.max(1,moduleTasks.length)*100);return <div key={module.id} className="grid grid-cols-[42px_1fr_48px] items-center gap-4 rounded-lg border p-3"><span className={`grid size-10 place-items-center rounded-md ${pct===100?"bg-[#2F8F55] text-white":"bg-[#FFE9C9] text-[#B86000]"}`}><Icon name={pct===100?"check":module.icon} className="size-4"/></span><div><div className="flex justify-between gap-3"><b className="text-sm">{module.id}. {module.title}</b><small className="text-black/45">{amount}/{moduleTasks.length} pasos · ~{module.time} min</small></div><div className="mt-3 h-1.5 rounded-full bg-[#EAE3D7]"><div className="h-full rounded-full bg-[#2F8F55]" style={{width:`${pct}%`}}/></div></div><b>{pct}%</b></div>})}</div></div>
    </section></main>;
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
//  PÁGINA MANUAL -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------


function FaqPage({ filter, setFilter, go }: { filter:string;setFilter:(v:string)=>void;go:(p:Page)=>void }) {
  const filtered=faqs.filter(([category])=>filter==="Todas"||category===filter);
  return <main><HeroTitle eyebrow="Preguntas frecuentes" title={<>Respuestas para las dudas<br/>más comunes</>} description="Filtra por tema y encuentra respuestas rápidas sobre el armado, las piezas, los herrajes y el mantenimiento del carrito." action={<button className="secondary" onClick={()=>go("progreso")}>Ver mi progreso</button>} />
    <section className="mx-auto max-w-[820px] px-5 py-16"><div className="flex flex-wrap gap-2">{["Todas","General","Armado","Piezas y herrajes","Mantenimiento"].map((name)=><button key={name} onClick={()=>setFilter(name)} className={`rounded-full px-4 py-2 text-xs ${filter===name?"bg-[#18100B] text-white":"bg-[#F8F2E8]"}`}>{name}</button>)}</div><div className="mt-7 space-y-3">{filtered.map(([category,q,a],i)=><details key={q} className="group rounded-lg border bg-white/20 p-5" open={i===0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold"><span className="flex items-center gap-3"><Icon name="help" className="size-4 text-[#B86000]"/>{q}</span><span className="grid size-8 place-items-center rounded border text-lg group-open:rotate-45">+</span></summary><p className="pt-4 pl-7 text-sm leading-6 text-black/55">{a}</p><small className="mt-3 block pl-7 text-[9px] uppercase tracking-wider text-[#B86000]">{category}</small></details>)}</div><div className="mt-10 grid gap-4 sm:grid-cols-3">{[["Vuelve al tutorial","Repasa cualquier módulo si te quedó alguna duda.","manual"],["Revisa tus piezas","Confirma códigos y cantidades antes de pedir repuestos.","piezas"],["¿Sigues con dudas?","Escribe a soporte@ensambla-kits.com","preguntas"]].map(([title,text,target])=><button onClick={()=>go(target as Page)} key={title} className="rounded-lg border p-5 text-left"><h3 className="font-display font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-black/50">{text}</p><span className="mt-5 block text-xs font-bold text-[#B86000]">Abrir sección →</span></button>)}</div></section>
  </main>;
}

function Footer({ go }: { go:(p:Page)=>void }) {
  return <footer className="border-t border-[#DDBDAE] bg-[#F8DED3]">
    <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-md bg-[#EC7A00] text-white">
            <Icon name="shapes" />
          </span>

          <span className="leading-none">
            <b className="font-display text-lg">ROBOTIC´S LAB</b>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-black/45">
              Aprende | Programa | Crea
            </small>
          </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-black/55">Curso interactivo del Carrito - Robot Modelo CB-1. Diseñado para que armes tu carrito paso a paso, sin perder el avance.
          </p>
        </div>
        <div>
          <p className="footer-title">
          </p>
          <p className="footer-title">El manual
          </p>
          {[["introduccion","Introducción"],["piezas","Lista de piezas"],["manual","Tutorial paso a paso"]].map(([id,label])=><button key={id} onClick={()=>go(id as Page)} className="footer-link">{label}</button>)}
        </div>
        <div>
          <p className="footer-title">
          </p>
          <p className="footer-title">Herramientas
          </p>
          <button onClick={()=>go("progreso")} className="footer-link">Calculadora de progreso
          </button>
          <button onClick={()=>go("preguntas")} className="footer-link">Preguntas frecuentes
          </button>
          <button onClick={()=>go("introduccion")} className="footer-link">Especificaciones técnicas
          </button>
        </div>
        <div>
          <p className="footer-title">
          </p>
          <p className="footer-title">Soporte
          </p>
          <p className="footer-link">soporte@roboticslab.com
          </p>
          <p className="footer-link">55 5555 5555
          </p>
          <p className="footer-link">Lunes a viernes, 9:00 – 18:00 hrs
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-2 border-t border-black/8 px-5 py-6 text-[10px] text-black/45 sm:flex-row">
      <span>© 2026 Robotic´s Lab. Todos los derechos reservados.
      </span>
      <span>Carrito - Robot CB-1 · Manual revisión 2.4
      </span>
    </div>
  </footer>;
}

export default App;
