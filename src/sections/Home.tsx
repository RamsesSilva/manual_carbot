import type React from "react";
import { workshopImage, toolsImage, moduleImages, modules, taskNames, allTasks, partGroups, parts, faqs, robotchat, carritoycelular, inicio, ninacarrito } from "../data/siteData";
import type { Page } from "../data/siteData";
import { Icon, CartArt, HeroTitle } from "../components/UI";

export function Home({ go, progress, checkedParts, checkedTasks }: { go: (page: Page) => void; progress: number; checkedParts: string[]; checkedTasks: string[] }) {
  const partsPercentage = Math.round((checkedParts.length / parts.length) * 100);
  const tasksPercentage = Math.round((checkedTasks.length / allTasks.length) * 100);
  const remainingMinutes = Math.max(0, 391 - Math.round(391 * (checkedTasks.length / allTasks.length)));
  return <main>

    <section className="relative min-h-[650px] overflow-hidden bg-[#1B130D] text-white">
      <img src={inicio} alt="Taller de trabajo con herramientas" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <span className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50" />
      <div className="absolute bottom-10 right-[12%] hidden w-[200px] opacity-100 lg:block">
        <img
          src={robotchat} alt="robotchat" className="w-full max-w-[1000px] h-auto object-contain"/>
      </div>
      
      {/*
      <div className="relative mx-auto flex min-h-[650px] max-w-[1080px] flex-col items-center justify-center px-5 text-center">
        <p className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em]">Manual interactivo · Modelo CB-1</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">Mi Primer Robot<br /> </h1>
        <p className="mt-3 max-w-4xl text-[15px] leading-6 text-white/85 ">¡Hola! Bienvenido a tu primer proyecto de Robótica: Construye, programa y diviértete desde cero.</p>
        <p className="mt-3 max-w-5xl text-[15px] leading-6 text-white/85">Este curso interactivo está diseñado especialmente para ti, que tienes poco o ningún conocimiento previo en robótica, electrónica o programación.<br></br><br></br>Olvídate de los manuales aburridos y llenos de tecnicismos imposibles: aquí aprenderás haciendo, experimentando y divirtiéndote en cada etapa del camino.</p>
        <p className="mt-3 max-w-5xl text-[15px] leading-6 text-white/85">Revisa la introducción, verifica e identifica cada pieza que viene en tu kit, sigue el tutorial por módulos y calcula tu avance en tiempo real en la escuela, laboratorio o en casa.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={() => go("introduccion")} className="rounded-md bg-[#EC7A00] px-8 py-3 text-sm font-bold">Comenzar el Proyecto</button><button onClick={() => go("progreso")} className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold">Consultar mi progreso</button></div>
        <div className="mt-12 grid w-full max-w-2xl grid-cols-2 border border-white/10 bg-black/20 sm:grid-cols-4">
          {[["6", "Módulos de armado"], ["30", "Pasos guiados"], ["29", "Piezas a verificar"], ["3–4 h", "Tiempo estimado"]].map(([value, label]) => <div key={label} className="border font-bold border-white/10 p-4"><b className="font-display text-xl">{value}</b><p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">{label}</p></div>)}
        </div>
      </div>*/}
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
            ["tutorial","Tutorial paso a paso","Seis módulos ordenados con pasos detallados, tips de taller y el tiempo que toma cada uno.","6 MÓDULOS","puzzle"],
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

 {/*  ==>  duplicada en App.tsx

    <section className="bg-[#160D09] text-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow text-[#E7A756]"> ● Calculadora de progreso</p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-[-.035em] sm:text-5xl">Tu avance, siempre a la vista</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/70">El manual recuerda qué piezas ya reuniste y qué pasos completaste. Solo tienes que marcar y el cálculo se actualiza al instante.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={()=>go("progreso")} className="primary"><Icon name="clock" className="size-4" />Abrir Calculadora</button>
            <button onClick={()=>go("piezas")} className="rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white">Revisar piezas</button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-8">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">Pasos completados</p><p className="mt-2 font-display text-3xl font-bold">{checkedTasks.length}/{allTasks.length}</p></div>
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
              const moduleTasks=allTasks.filter((task)=>task.moduleId===module.id);
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
  */}

<section className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[.7fr_1.3fr]">

  {/* Imagen del robot superpuesta */}
  <div className="absolute bottom-15 right-[65%] z-20 hidden w-[200px] opacity-100 lg:block pointer-events-none">
    <img
      src={robotchat}
      alt="robotchat"
      className="w-full max-w-[1000px] h-auto object-contain"
    />
  </div>

  {/* ==>   Columna izquierda duplicada en App.tsx

  <div className="relative z-10">
    <p className="eyebrow">Resuelve antes de empezar</p>

    <h2 className="display-title">
      Dudas que aparecen siempre
    </h2>

    <p className="copy">
      Reunimos las preguntas más repetidas de quienes arman el CM-1 por primera vez.
    </p>

    <button
      onClick={() => go("preguntas")}
      className="secondary mt-6"
    >
      Ver todas las preguntas
    </button>
  </div>
  */}

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
