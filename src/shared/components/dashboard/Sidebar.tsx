"use client";

import { RiAlignRight } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaChalkboardUser, FaPeopleGroup } from "react-icons/fa6";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { BiCalendarCheck, BiTask, BiGroup } from "react-icons/bi";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const normalize = (p: string) => (p.startsWith("/") ? p : `/${p}`);

  // Menú optimizado
  const menuItems = useMemo(
    () => [
      // {
      //   icon: FaPeopleGroup,
      //   text: "PERFIL",
      //   path: "perfil",
      //   submenu: [{ icon: BiCalendarCheck, text: "Perfil", path: "" }],
      // },
      {
        icon: FaPeopleGroup,
        text: "ORGANIZACIÓN",
        path: "organization",
        submenu: [
          { icon: BiCalendarCheck, text: "Entidad", path: "entidad" },
          {
            icon: BiCalendarCheck,
            text: "Direccion Administrativa",
            path: "direccion_administrativa",
          },
          {
            icon: BiCalendarCheck,
            text: "Unidad Ejecutora",
            path: "unidad_ejecutora",
          },
        ],
      },
      {
        icon: FaPeopleGroup,
        text: "PEI",
        path: "pei",
        submenu: [
          // { icon: BiCalendarCheck, text: "Matriz PEI", path: "matriz_pei" },
          { icon: BiTask, text: "PEI", path: "" },
          { icon: BiGroup, text: "Area Estrategica", path: "area_estrategica" },
          {
            icon: FaChalkboardUser,
            text: "Politica De Desarrollo",
            path: "politica_desarrollo",
          },
          {
            icon: BiGroup,
            text: "Objetivo Estrategico",
            path: "objetivo_estrategico_AMP",
          },
          {
            icon: BiGroup,
            text: "Producto Institucional",
            path: "producto_institucional",
          },
          {
            icon: BiGroup,
            text: "Acción Estrategica",
            path: "accion_estrategica_ins",
          },
          {
            icon: BiGroup,
            text: "Indicador Pei",
            path: "indicador_pei",
          },
          {
            icon: BiGroup,
            text: "Programa Anual De Meta",
            path: "programa_anual_de_meta",
          },
          {
            icon: BiGroup,
            text: "Seguimiento PEI",
            path: "seguimiento_pei",
          },
        ],
      },
      {
        icon: FaPeopleGroup,
        text: "POA",
        path: "poa",
        submenu: [
          { icon: BiCalendarCheck, text: "POA", path: "" },
          { icon: FaChalkboardUser, text: "Programa", path: "programa" },
          {
            icon: BiCalendarCheck,
            text: "Acción Corto Plazo",
            path: "accion_corto_plazo",
          },
          {
            icon: BiGroup,
            text: "Producto",
            path: "producto",
          },
          { icon: BiCalendarCheck, text: "Actividad", path: "actividad" },
          { icon: BiTask, text: "Indicador POA", path: "indicador_poa" },
          {
            icon: FaChalkboardUser,
            text: "Programación Trimestral Meta",
            path: "programacacion_trimestral_meta",
          },
          {
            icon: FaChalkboardUser,
            text: "Siguimiento POA Trimestral",
            path: "seguimiento_poa_trimestral",
          },
          // {
          //   icon: FaChalkboardUser,
          //   text: "Seguimiento POA Trimestral Det",
          //   path: "seguimiento_poa_trimestral_det",
          // },
        ],
      },
      {
        icon: FaPeopleGroup,
        text: "PRESUPUESTO",
        path: "presupuesto",
        submenu: [
          {
            icon: BiTask,
            text: "Matriz Presupuesto",
            path: "matriz_presupuesto",
          },
          { icon: BiTask, text: "Fuente", path: "fuente" },
          { icon: BiTask, text: "Organismo", path: "organismo" },
          { icon: BiTask, text: "Objeto Gasto", path: "objeto_gasto" },
          {
            icon: BiTask,
            text: "Entidad Transferencia",
            path: "entidad_transferencia",
          },
          { icon: BiTask, text: "Rubro", path: "rubro" },
          { icon: BiTask, text: "Recaudación", path: "recaudacion" },
        ],
      },
    ],
    [],
  );

  const isCollapsed = !isHovered; // En escritorio, colapsado si no hay hover

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed lg:static top-0 h-full z-50 border-r border-blue-800 
          bg-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out
          ${sidebar ? "left-0" : "-left-full lg:left-0"}
          ${isHovered ? "lg:w-[260px]" : "lg:w-[80px]"}
        `}
      >
        <div className="p-6 border-b border-blue-800 min-h-[80px] flex items-center">
          <h1 className={`text-xl font-bold transition-opacity duration-200 ${isCollapsed ? "lg:opacity-0" : "opacity-100"}`}>
            UAGRM
          </h1>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const expanded = expandedItems.includes(item.text);
              const active = pathname.includes(normalize(item.path));

              return (
                <li key={i}>
                  <button
                    onClick={() => setExpandedItems(prev => prev.includes(item.text) ? [] : [item.text])}
                    className={`w-full flex items-center py-3 transition-all ${isCollapsed ? "justify-center" : "px-5 justify-between"} hover:bg-blue-800 ${active ? "text-blue-400" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-2xl shrink-0" />
                      {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.text}</span>}
                    </div>
                    {!isCollapsed && (expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                  </button>

                  {!isCollapsed && expanded && (
                    <ul className="bg-blue-950/50 animate-fadeIn">
                      {item.submenu.map((sub, j) => (
                        <li key={j}>
                          <Link
                            href={normalize(sub.path)}
                            className={`flex items-center gap-3 pl-12 py-2 text-sm hover:text-white transition-colors ${pathname === normalize(sub.path) ? "text-blue-400 font-bold" : "text-gray-400"}`}
                          >
                            {sub.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <button onClick={() => setSidebar(!sidebar)} className="lg:hidden fixed top-4 left-4 bg-blue-900 p-2 text-white rounded-lg z-[60]">
        {sidebar ? <IoMdClose /> : <RiAlignRight />}
      </button>
      {sidebar && <div onClick={() => setSidebar(false)} className="lg:hidden fixed inset-0 bg-black/60 z-40" />}
    </>
  );
};

export default Sidebar;



