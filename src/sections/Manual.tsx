import { useState } from "react";
import { moduleImages, modules } from "../data/siteData";
import { manualSteps as initialManualSteps } from "../data/manualSteps";
import type { ManualStep } from "../data/manualSteps";
import type { Page } from "../data/siteData";
import { Icon, CartArt, HeroTitle } from "../components/UI";


const DEFAULT_DEMO_VIDEO = "https://www.youtube-nocookie.com/embed/3Q1Zc7hJQ8g";

function toEmbedUrl(url: string) {
  const trimmed = url.trim();
  const youtubeMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return youtubeMatch ? `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}` : trimmed || DEFAULT_DEMO_VIDEO;
}

export function Manual({
  checked,
  setChecked,
  go,
}: {
  checked: string[];
  setChecked: (value: string[]) => void;
  go: (page: Page) => void;
}) {
  // ==================================================
  // 1. ESTADOS DEL COMPONENTE
  // ==================================================

  const [expanded, setExpanded] = useState<number | null>(1);
  // El contenido del manual se mantiene únicamente en src/data/manualSteps.ts.
  const manualItems: ManualStep[] = initialManualSteps;

  const [videoTask, setVideoTask] = useState<{
    title: string;
    image: string;
    videoUrl: string;
  } | null>(null);

  // ==================================================
  // 2. FUNCIONES
  // ==================================================

  // Marcar o desmarcar una tarea
  const toggle = (id: string) => {
    setChecked(
      checked.includes(id)
        ? checked.filter((x) => x !== id)
        : [...checked, id]
    );
  };

  // ==================================================
  // 3. CÁLCULOS DEL PROGRESO GENERAL
  // ==================================================

  const ManualProgress = Math.round(
    (checked.filter(id => manualItems.some(item => item.id === id)).length / Math.max(1, manualItems.length)) * 100
  );

  // Calcular tiempo restante estimado
  const remainingMinutes = Math.max(
    0,
    391 -
      Math.round(
        (391 * checked.filter(id => manualItems.some(item => item.id === id)).length) / Math.max(1, manualItems.length)
      )
  );

  // ==================================================
  // 4. ESTRUCTURA PRINCIPAL
  // ==================================================

  return (
    <main>
      {/* ==================================================
          4.1. ENCABEZADO PRINCIPAL
      ================================================== */}

      <HeroTitle
        eyebrow="Tutorial paso a paso"
        title={
          <>
            Seis módulos para armar
            <br />
            sin perder el hilo
          </>
        }
        description="Completa las tareas en orden. Cada marca se guarda automáticamente y alimenta tu calculadora de progreso."
        action={
          <button
            className="secondary"
            onClick={() => go("progreso")}
          >
            Ver mi progreso
          </button>
        }
      />

      {/* ==================================================
          4.2. CONTENEDOR GENERAL
      ================================================== */}

      <section className="mx-auto max-w-[1280px] px-5 py-16">
        <div className="mb-10 rounded-xl border border-black/10 bg-[#FBF8F1] p-6 sm:p-8">

          <div className="grid gap-8 lg:grid-cols-[1.3fr_.9fr] lg:items-center">

            {/* Avance del armado */}

            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-base text-black/70">
                    Avance del armado
                  </p>

                  <p className="mt-1 font-display text-5xl font-bold">
                    {ManualProgress}%
                  </p>
                </div>

                <p className="pb-1 text-base text-black/60">
                  {checked.filter(id => manualItems.some(item => item.id === id)).length} de {manualItems.length} pasos
                </p>
              </div>

              {/* Barra de progreso */}

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#EAE3D7]">
                <div
                  className="h-full rounded-full bg-[#2F8F55] transition-all duration-500"
                  style={{
                    width: `${ManualProgress}%`,
                  }}
                />
              </div>
            </div>

            {/* Tiempo restante */}

            <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-[#FFFDF8] p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#DDF2DF] text-[#267343]">
                <Icon
                  name="clock"
                  className="size-6"
                />
              </span>

              <div>
                <p className="text-xs font-medium uppercase tracking-[.12em] text-black/55">
                  Tiempo restante estimado
                </p>

                <p className="mt-1 font-display text-2xl font-bold">
                  {Math.floor(remainingMinutes / 60)} h{" "}
                  {remainingMinutes % 60} min
                </p>
              </div>
            </div>
          </div>

          {/* Separador */}

          <div className="my-7 border-t border-black/10" />

          {/* ==================================================
              4.2.2. TARJETAS DE NAVEGACIÓN POR MÓDULO
          ================================================== */}

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {modules.map((module) => {
              const moduleTasks = manualItems.filter(
                (task) => task.moduleId === module.id
              );

              const completed = moduleTasks.filter(
                (task) => checked.includes(task.id)
              ).length;

              const moduleProgress = Math.round(
                (completed / moduleTasks.length) * 100
              );

              return (
                <button
                  key={module.id}
                  onClick={() =>
                    setExpanded(
                      expanded === module.id
                        ? null
                        : module.id
                    )
                  }
                  className={`rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${
                    expanded === module.id
                      ? "border-[#E2B06E] bg-[#FFF0D9]"
                      : "border-black/10 bg-[#FFFDF8]"
                  }`}
                >
                  {/* Número e icono */}

                  <span className="flex items-center gap-2 text-[#B86000]">
                    <Icon
                      name={
                        moduleProgress === 100
                          ? "check"
                          : module.icon
                      }
                      className="size-4"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[.12em]">
                      Módulo {module.id}
                    </span>
                  </span>

                  {/* Tareas completadas */}

                  <p className="mt-4 text-sm">
                    {completed}/{moduleTasks.length} pasos
                  </p>

                  {/* Progreso del módulo */}

                  <span className="mt-3 block h-2 overflow-hidden rounded-full bg-[#EAE3D7]">
                    <span
                      className="block h-full rounded-full bg-[#2F8F55] transition-all"
                      style={{
                        width: `${moduleProgress}%`,
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            4.2.3. LISTA PRINCIPAL DE MÓDULOS
        ================================================== */}

        <div className="space-y-4">
          {modules.map((module, moduleIndex) => {
            // Tareas pertenecientes al módulo
            const tasks = manualItems.filter(
              (t) => t.moduleId === module.id
            );

            // Cantidad de tareas completadas
            const complete = tasks.filter(
              (t) => checked.includes(t.id)
            ).length;

            // Porcentaje de progreso
            const percentage = Math.round(
              (complete / tasks.length) * 100
            );

            // Estado de expansión
            const isExpanded = expanded === module.id;

            return (
              <article
                key={module.id}
                className={`overflow-hidden rounded-xl border transition ${
                  isExpanded
                    ? "border-[#E2B06E] bg-[#FFFDF8] shadow-sm"
                    : "bg-[#FCF9F2]"
                }`}
              >
                {/* ==================================================
                    4.2.3.1. ENCABEZADO DEL MÓDULO
                ================================================== */}

                <button
                  onClick={() =>
                    setExpanded(
                      isExpanded ? null : module.id
                    )
                  }
                  className="grid w-full grid-cols-[88px_1fr_auto] items-center gap-4 p-3 text-left sm:grid-cols-[160px_1fr_auto] sm:gap-5 sm:p-4"
                >
                  {/* Imagen de portada */}

                  <span className="relative h-24 overflow-hidden rounded-lg bg-[#24170F] sm:h-28">
                    <img
                     src={module.cover ? `${import.meta.env.BASE_URL}${module.cover.replace(/^\/+/, "")}` : moduleImages[moduleIndex]}
                      alt={`Portada del módulo ${module.id}: ${module.title}`}
                      className="h-full w-full object-cover opacity-80 transition duration-500 hover:scale-105"
                    />

                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Icono de estado */}

                    <span
                      className={`absolute bottom-2 left-2 grid size-8 place-items-center rounded-md shadow-sm ${
                        percentage === 100
                          ? "bg-[#2F8F55] text-white"
                          : "bg-[#FFF0D9] text-[#B86000]"
                      }`}
                    >
                      {percentage === 100 ? (
                        <Icon
                          name="check"
                          className="size-4"
                        />
                      ) : (
                        <Icon
                          name={module.icon}
                          className="size-4"
                        />
                      )}
                    </span>

                    {/* Número del módulo */}

                    <span className="absolute right-2 top-2 rounded bg-black/55 px-2 py-1 font-display text-[10px] font-bold text-white">
                      0{module.id}
                    </span>
                  </span>

                  {/* Información del módulo */}

                  <span className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B86000]">
                      Módulo{" "}
                      {String(module.id).padStart(2, "0")}
                    </span>

                    <span className="mt-1 block font-display text-lg font-bold">
                      {module.title}
                    </span>

                    {/* Progreso individual */}

                    <span className="mt-3 block max-w-xl">
                      <span className="flex justify-between text-[10px] text-black/45">
                        <span>
                          {complete}/{tasks.length} pasos
                        </span>

                        <span>{percentage}%</span>
                      </span>

                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-[#EAE3D7]">
                        <span
                          className="block h-full rounded-full bg-[#2F8F55] transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </span>
                    </span>
                  </span>

                  {/* Tiempo y botón desplegable */}

                  <span className="flex items-center gap-3">
                    <span className="hidden text-xs text-black/45 sm:block">
                      ~{module.time} min
                    </span>

                    <span
                      className={`grid size-9 place-items-center rounded-full border transition ${
                        isExpanded
                          ? "rotate-180 bg-[#FFF0D9]"
                          : ""
                      }`}
                    >
                      <Icon
                        name="chevron"
                        className="size-4"
                      />
                    </span>
                  </span>
                </button>

                {/* ==================================================----------------------------------------------------------------------------------------------------
                    4.2.3.2. CONTENIDO DESPLEGABLE DEL MÓDULO
                ==================================================---------------------------------------------------------------------------------------------------------- */}

                {isExpanded && (
                  <div className="border-t border-black/8 bg-[#F8F4EB] p-4 sm:p-6">

                    {/* Encabezado de tareas */}

                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="font-display font-bold">
                          Pasos del módulo
                        </p>

                        <p className="mt-1 text-xs text-black/45">
                          Abre el video, revisa la imagen y marca
                          cada paso al terminar.
                        </p>
                      </div>

                      {/* Desmarcar tareas del módulo */}

                      {complete > 0 && (
                        <button
                          onClick={() =>
                            setChecked(
                              checked.filter(
                                (id) =>
                                  !tasks.some(
                                    (t) => t.id === id
                                  )
                              )
                            )
                          }
                          className="text-xs text-[#98503B] underline underline-offset-4"
                        >
                          Desmarcar módulo
                        </button>
                      )}
                    </div>

                    {/* ==================================================
                        4.2.3.3. LISTA DE TAREAS
                    ================================================== */}

                    <div className="space-y-5">
                      {tasks.map((task, taskIndex) => {
                        // Estado de la tarea
                        const done = checked.includes(task.id);

                        // Imagen de referencia
                        const image =
                          task.image ||
                          moduleImages[
                            (moduleIndex + taskIndex) %
                              moduleImages.length
                          ];

                        return (
                          <div
                            key={task.id}
                            className={`overflow-hidden rounded-lg border transition ${
                              done
                                ? "border-[#9CCC9F] bg-[#EDF8EA]"
                                : "border-black/10 bg-[#FFFDF8]"
                            }`}
                          >
                            {/* Encabezado de la tarea */}

                            <div className="flex flex-col justify-between gap-3 border-b border-black/8 p-4 sm:flex-row sm:items-start">
                              <div className="flex gap-3">

                                {/* Número o estado */}

                                <span
                                  className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                                    done
                                      ? "bg-[#2F8F55] text-white"
                                      : "bg-[#FFE9C9] text-[#B86000]"
                                  }`}
                                >
                                  {done ? (
                                    <Icon
                                      name="check"
                                      className="size-4"
                                    />
                                  ) : (
                                    taskIndex + 1
                                  )}
                                </span>

                                {/* Título y descripción */}

                                <div>
                                  <h3
                                    className={`font-display font-bold ${
                                      done
                                        ? "text-[#267343]"
                                        : ""
                                    }`}
                                  >
                                    {task.title}
                                  </h3>

                                  <p className="mt-1 text-xs leading-5 text-black/50">
                                    {task.description}
                                  </p>
                                </div>
                              </div>

                              {/* Tiempo estimado de la tarea */}

                              <span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-wider text-black/40">
                                <Icon
                                  name="clock"
                                  className="size-3"
                                />

                                {task.duration} min
                              </span>
                            </div>

                            {/* ==================================================
                                4.2.3.4. IMAGEN Y VIDEO
                            ================================================== */}

                            <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-2">

                              {/* Imagen de referencia */}

                              <figure className="overflow-hidden rounded-lg border border-black/10 bg-[#FFFDF8]">
                                <div className="relative h-56 overflow-hidden bg-[#E8DCC8]">
                                  <img
                                    src={image}
                                    alt={`Ilustración del paso: ${task.title}`}
                                    className="h-full w-full object-cover"
                                  />

                                  <span className="absolute left-3 top-3 rounded bg-[#FFFDF8]/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
                                    Ilustración · Paso{" "}
                                    {taskIndex + 1}
                                  </span>
                                </div>

                                <figcaption className="flex items-center gap-2 px-4 py-3 text-xs text-black/55">
                                  <Icon
                                    name="panel"
                                    className="size-4 text-[#2F8F55]"
                                  />

                                  {task.imageCaption}
                                </figcaption>
                              </figure>

                              {/* Botón para reproducir el video */}

                              <button
                                onClick={() =>
                                  setVideoTask({
                                    title: task.title,
                                    image,
                                    videoUrl: task.videoUrl || DEFAULT_DEMO_VIDEO,
                                  })
                                }
                                className="group overflow-hidden rounded-lg border border-black/10 bg-[#FFFDF8] text-left"
                              >
                                <span className="relative grid h-56 place-items-center overflow-hidden bg-[#1D130D]">
                                  <img
                                    src={image}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover opacity-45"
                                  />

                                  <span className="absolute inset-0 bg-black/25" />

                                  {/* Icono de reproducción */}

                                  <span className="relative grid size-16 place-items-center rounded-full bg-white text-[#EC7A00] shadow-xl transition group-hover:scale-105">
                                    <Icon
                                      name="play"
                                      className="size-7"
                                    />
                                  </span>

                                  <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                                    Video demostrativo
                                  </span>
                                </span>

                                <span className="flex items-center gap-2 px-4 py-3 text-xs text-black/55">
                                  <Icon
                                    name="play"
                                    className="size-4 text-[#EC7A00]"
                                  />

                                  Reproducir guía de este paso
                                </span>
                              </button>
                            </div>

                            {/* ==================================================
                                4.2.3.5. COMPLETAR TAREA
                            ================================================== */}

                            <div className="flex flex-col justify-between gap-3 border-t border-black/8 p-4 sm:flex-row sm:items-center">

                              <p className="text-xs text-black/45">
                                {done
                                  ? "Este paso ya suma al progreso del módulo."
                                  : "Marca el paso después de revisar imagen y video."}
                              </p>

                              <button
                                onClick={() => toggle(task.id)}
                                className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold ${
                                  done
                                    ? "bg-[#2F8F55] text-white"
                                    : "bg-[#ec7a00] text-white"
                                }`}
                              >
                                {done && (
                                  <Icon
                                    name="check"
                                    className="size-4"
                                  />
                                )}

                                {done
                                  ? "Paso completado"
                                  : "Marcar como completado"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* ==================================================
            4.2.4. BOTÓN FINAL DE NAVEGACIÓN
        ================================================== */}

        <div className="mt-10 flex justify-end">
          <button
            className="primary"
            onClick={() => go("progreso")}
          >
            Calcular mi avance
          </button>
        </div>
      </section>

      {/* ==================================================
          5. VENTANA MODAL DEL VIDEO
      ================================================== */}

      {videoTask && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setVideoTask(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-xl bg-[#FFFDF8] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Encabezado del modal */}

            <div className="flex items-center justify-between p-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#B86000]">
                  Video demostrativo
                </p>

                <h3 className="font-display text-lg font-bold">
                  {videoTask.title}
                </h3>
              </div>

              {/* Botón para cerrar */}

              <button
                onClick={() => setVideoTask(null)}
                aria-label="Cerrar video"
                className="grid size-10 place-items-center rounded-full border"
              >
                <Icon name="x" />
              </button>
            </div>

            {/* Reproductor de video */}

            <div className="relative aspect-video bg-black">
              <img
                src={videoTask.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />

              <iframe
                className="relative h-full w-full"
                src={toEmbedUrl(videoTask.videoUrl)}
                title={`Video: ${videoTask.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Descripción del video */}

            <p className="p-4 text-sm text-black/50 sm:px-6">
              Observa la orientación de las piezas y pausa el
              video cuando necesites comprobar una unión.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA PÁGINA MANUAL -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA PÁGINA PROGRESO -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------
