"use client";

import { RiAlignRight } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaChalkboardUser, FaPeopleGroup } from "react-icons/fa6";
import {
  FaChevronDown,
  FaChevronRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { BiCalendarCheck, BiTask, BiGroup } from "react-icons/bi";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Evitar hydration mismatch - solo renderizar después del mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const normalize = (p: string) => (p.startsWith("/") ? p : `/${p}`);
  const BASE = "/dashboard";

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

  const toggleSubmenu = (title: string) => {
    if (!collapsed) {
      setExpandedItems((prev) =>
        prev.includes(title)
          ? prev.filter((x) => x !== title)
          : [...prev, title],
      );
    }
  };

  const isItemActive = (item: any) => {
    const itemPath = normalize(`${BASE}/${item.path}`);
    if (pathname === itemPath) return true;

    return item.submenu?.some((sub: any) => {
      const subPath = normalize(`${BASE}/${item.path}/${sub.path}`);
      return pathname === subPath;
    });
  };

  // Mostrar placeholder durante SSR para evitar hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed lg:static top-0 h-screen z-50 border-r border-blue-800 bg-blue-900 text-white w-0 lg:w-[260px]" />
    );
  }

  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 h-screen z-50 border-r border-blue-800
          bg-blue-900 text-white flex flex-col transition-all duration-300
          ${sidebar ? "left-0" : "-left-full lg:left-0"}
          ${collapsed ? "lg:w-[80px]" : "lg:w-[260px]"}
        `}
      >
        {/* HEADER - ALTURA FIJA */}
        <div className="relative px-6 py-4 border-b border-blue-800 flex items-center justify-center flex-shrink-0 h-[70px]">
          {!collapsed && <h1 className="text-2xl font-bold">UAGRM</h1>}

          {/* COLAPSADOR */}
          <button
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-blue-800 p-1 rounded-full shadow-md hover:bg-blue-700 transition"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>

        {/* NAV - SCROLL SOLO AQUÍ */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900">
          <ul className="space-y-1 py-4">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const fullPath = item.path === "" ? "/" : normalize(item.path);
              const active = isItemActive(item);
              const hasSub = item.submenu;
              const expanded = expandedItems.includes(item.text);

              return (
                <li key={i}>
                  {/* ITEM PRINCIPAL */}
                  {hasSub ? (
                    <button
                      onClick={() => toggleSubmenu(item.text)}
                      className={`
                        w-full flex items-center
                        ${
                          collapsed
                            ? "justify-center px-0"
                            : "justify-between px-5"
                        }
                        py-3 text-sm transition-colors hover:bg-blue-800
                        ${
                          active ? "bg-blue-800 border-r-4 border-blue-400" : ""
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-lg flex-shrink-0" />
                        {!collapsed && (
                          <span className="truncate">{item.text}</span>
                        )}
                      </div>
                      {!collapsed &&
                        (expanded ? (
                          <FaChevronDown className="flex-shrink-0" />
                        ) : (
                          <FaChevronRight className="flex-shrink-0" />
                        ))}
                    </button>
                  ) : (
                    <Link
                      href={fullPath}
                      prefetch
                      onClick={() => setSidebar(false)}
                      className={`
                        flex items-center py-3 text-sm transition-colors hover:bg-blue-800
                        ${collapsed ? "justify-center px-0" : "px-5 gap-3"}
                        ${
                          active ? "bg-blue-800 border-r-4 border-blue-400" : ""
                        }
                      `}
                    >
                      <Icon className="text-lg flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.text}</span>
                      )}
                    </Link>
                  )}

                  {/* SUBMENÚ */}
                  {hasSub && expanded && !collapsed && (
                    <ul className="bg-blue-800/50 border-l-4 border-blue-600 ml-4">
                      {item.submenu.map((sub: any, j: number) => {
                        const SubIcon = sub.icon;
                        const subPath = sub.path
                          ? normalize(`${BASE}/${item.path}/${sub.path}`)
                          : normalize(`${BASE}/${item.path}`);

                        const subActive = pathname === subPath;

                        return (
                          <li key={j}>
                            <Link
                              href={subPath}
                              prefetch
                              onClick={() => setSidebar(false)}
                              className={`
                                flex items-center gap-3 px-6 py-2.5 text-sm
                                hover:bg-blue-700 transition-colors
                                ${
                                  subActive
                                    ? "bg-blue-700 border-r-4 border-blue-300"
                                    : ""
                                }
                              `}
                            >
                              <SubIcon className="text-base flex-shrink-0" />
                              <span className="truncate">{sub.text}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* BOTÓN MOBILE */}
      <button
        onClick={() => setSidebar(!sidebar)}
        className="lg:hidden fixed top-4 left-4 bg-blue-900 p-2 text-white rounded-lg text-xl z-[60] shadow-lg"
        aria-label={sidebar ? "Cerrar menú" : "Abrir menú"}
      >
        {sidebar ? <IoMdClose /> : <RiAlignRight />}
      </button>

      {/* OVERLAY */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </>
  );
};

export default Sidebar;



