import type React from "react";
import { workshopImage, toolsImage, moduleImages, modules, taskNames, allTasks, partGroups, parts, faqs, robotchat, carritoycelular, inicio, ninacarrito } from "../data/siteData";
import type { Page } from "../data/siteData";
import { Icon, CartArt, HeroTitle } from "../components/UI";

export function Introduction({ go }: { go: (page: Page) => void }) {

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
