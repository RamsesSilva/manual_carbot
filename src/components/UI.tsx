import type React from "react";

function Icon({ name, className = "size-5" }: { name: string; className?: string }) 
{ const paths: Record<string, React.ReactNode> = {
    listCheck: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" /></>,
    robot: <><path d="M12 8V4H8" /><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M7 13h.01M17 13h.01M8 17h8M12 8V4" /><path d="M7 4h1" /></>,
    shapes: <><path d="M12 3 3 8l9 5 9-5-9-5z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    star: <><path d="m12 3 2.75 5.58 6.16.9-4.45 4.34 1.05 6.13L12 17.06l-5.51 2.89 1.05-6.13L3.09 9.48l6.16-.9L12 3z" /></>,
    tool: <><path d="m14 6 4-4a5 5 0 0 1-6 7l-7 7a2 2 0 0 0 3 3l7-7a5 5 0 0 1 7-6l-4 4-4-1z" /></>,
    grid: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M12 4v16M4 12h16" /></>,
    panel: <><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
    wheel: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /><path d="M12 4v6M12 14v6M4 12h6M14 12h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    arrow: <><path d="M5 12h14" /><path d="m15 8 4 4-4 4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    play: <path d="m9 7 8 5-8 5z" />,
    reset: <><path d="M4 11a8 8 0 1 1 2 6" /><path d="M4 5v6h6" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7M12 17h.01" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    screwdriver: <><path d="m14 4 6 6-3 3-6-6z" /><path d="m12 8-8 8a2 2 0 0 0 3 3l8-8" /></>,
    wrench: <><path d="M14 5h7v4h-3v11h-4V9h-3V5z" /><path d="M11 7H5V4h9" /></>,
    ruler: <><path d="M4 4h6v10h10v6H4z" /><path d="M7 7v3M7 14h3M14 17v-3M17 17v-3" /></>,
    puzzle: <><path d="M19 13h-2a2 2 0 1 0-4 0v2H9v-3H7a2 2 0 1 1 0-4h2V5h4V3a2 2 0 1 1 4 0v2h2v8z" /><path d="M9 15v4H5v-4H3a2 2 0 1 1 0-4h2V7" /></>,
    circleExclamation: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>,
    plus: <><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /><path d="M12 8v8M8 12h8" /></>,
    computer: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M8 9h8M8 13h5" /></>,
    mobile: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
    wifi: <><path d="M2 8.5a15 15 0 0 1 20 0" /><path d="M5 12a10 10 0 0 1 14 0" /><path d="M8.5 15.5a5 5 0 0 1 7 0" /><path d="M12 19h.01" /></>,
    
  };
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function CartArt() {
  return <svg viewBox="0 0 520 520" className="w-full" role="img" aria-label="Carrito modular CM-1">
    <defs><filter id="shadow"><feDropShadow dx="0" dy="14" stdDeviation="12" floodOpacity=".18" /></filter></defs>
    <g filter="url(#shadow)">
      <path d="M130 120v295M390 120v295" stroke="#292A25" strokeWidth="14" strokeLinecap="round" />
      <path d="M118 122h285M118 248h285M118 370h285" stroke="#292A25" strokeWidth="12" />
      <path d="m105 100 300 0 0 52-300 0zM105 226h300v52H105zM105 348h300v52H105z" fill="#A86C3D" stroke="#292A25" strokeWidth="5" />
      <path d="M390 120V62q0-22-22-22H240" stroke="#292A25" strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="135" cy="438" r="27" fill="#292A25" /><circle cx="390" cy="438" r="27" fill="#292A25" />
      <circle cx="135" cy="438" r="10" fill="#777" /><circle cx="390" cy="438" r="10" fill="#777" />
    </g>
  </svg>;
}

function HeroTitle({ eyebrow, title, description, action }: { eyebrow: string; title: React.ReactNode; description: string; action?: React.ReactNode }) {
  return <section className="border-b border-black/10">
    <div className="mx-auto max-w-[1080px] px-5 py-14 sm:py-20">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#B86000]"><span className="grid size-10 place-items-center rounded-md bg-[#FFE9C9]"><Icon name="arrow" className="size-5" /></span>{eyebrow}</p>
      <div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><h1 className="max-w-3xl font-display text-4xl font-bold leading-[.98] tracking-[-.045em] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl leading-7 text-black/60">{description}</p></div>{action}</div>
    </div>
  </section>;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMIENZA LA PÁGINA INICIO ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export { Icon, CartArt, HeroTitle };
