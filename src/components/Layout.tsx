import { useEffect, useState } from "react";
import type React from "react";
import { workshopImage, toolsImage, moduleImages, modules, taskNames, allTasks, partGroups, parts, faqs, robotchat, carritoycelular, inicio, ninacarrito } from "../data/siteData";
import type { Page } from "../data/siteData";
import { Icon, CartArt, HeroTitle } from "../components/UI";

export function Header({
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
            <b className="font-display text-lg">ROBOTIC´S LAB</b>
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

export function Footer({ go }: { go:(p:Page)=>void }) {
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
          {[["introduccion","Introducción"],["piezas","Lista de piezas"],["tutorial","Tutorial paso a paso"]].map(([id,label])=><button key={id} onClick={()=>go(id as Page)} className="footer-link">{label}</button>)}
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

