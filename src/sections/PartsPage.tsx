import type React from "react";
import { workshopImage, toolsImage, moduleImages, modules, taskNames, allTasks, partGroups, parts, faqs, robotchat, carritoycelular, inicio, ninacarrito } from "../data/siteData";
import type { Page } from "../data/siteData";
import { Icon, CartArt, HeroTitle } from "../components/UI";

export function PartsPage({
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
  // ==========================================
  // 1. FUNCIONES
  // ==========================================

  // Marcar o desmarcar una pieza
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
          `${item[0]} ${item[1]} ${item[3]}`
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
            empezar
          </>
        }
        description="Marca las piezas conforme las reconoces en el kit. Así confirmas que el contenido está completo y puedes comenzar construir tu Robot de manera segura."
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
    </main>
  );
}

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// TERMINA PÁGINA LISTA DE PIEZAS -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------

// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA PÁGINA MANUAL -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ==========================================---------------------------------------------------------------------------------------------------------------------------------------------
