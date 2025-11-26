"use client";

import { RiAlignRight } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaChalkboardUser, FaPeopleGroup } from "react-icons/fa6";
import { FaChevronDown, FaChevronRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { BiCalendarCheck, BiTask, BiGroup } from "react-icons/bi";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop mini mode
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const normalize = (p: string) => (p.startsWith("/") ? p : `/${p}`);

  // ⚡ Memoizamos todo para evitar renders innecesarios
  const menuItems = useMemo(
    () => [
      {
        icon: FaPeopleGroup,
        text: "PEI",
        path: "PEI",
        submenu: [
          { icon: BiCalendarCheck, text: "Matriz PEI", path: "matriz_pei" },
          { icon: BiTask, text: "PEI", path: "pei" },
          { icon: BiGroup, text: "Area Estrategica", path: "area_estrategica" },
          { icon: FaChalkboardUser, text: "Politica De Desarrollo", path: "politica_desarrollo" },
          { icon: BiGroup, text: "Objetivo Estrategico", path: "objetivo_estrategico_AMP" },
          { icon: BiGroup, text: "Producto Institucional", path: "producto_institucional" },
          { icon: BiGroup, text: "Acción Estrategica", path: "accion_estrategica_ins" },
          { icon: BiGroup, text: "Programa Anual De Meta", path: "programa_anual_de_meta" }
        ]
      },
      {
        icon: FaPeopleGroup,
        text: "POA",
        path: "POA",
        submenu: [
          { icon: BiCalendarCheck, text: "Actividad", path: "actividad" },
          { icon: BiTask, text: "Indicador POA", path: "indicador_poa" },
          { icon: BiGroup, text: "Objetivo Institucional", path: "objetivo_institucional_acp" },
          { icon: FaChalkboardUser, text: "Producto", path: "producto" },
          { icon: FaChalkboardUser, text: "Programación Trimestral Meta", path: "programacacion_trimestral_meta" },
          { icon: FaChalkboardUser, text: "Siguimiento POA Trimestral", path: "seguimiento_poa_trimestral" },
          { icon: FaChalkboardUser, text: "Programa POA", path: "programa_Poa" },
          { icon: FaChalkboardUser, text: "Seguimiento POA Trimestral Det", path: "seguimiento_poa_trimestral_det" },
          { icon: FaChalkboardUser, text: "Producto", path: "producto" },

        ]
      }
    ],
    []
  );

  const toggleSubmenu = (title: string) => {
    if (!collapsed) {
      setExpandedItems((prev) =>
        prev.includes(title) ? prev.filter((x) => x !== title) : [...prev, title]
      );
    }
  };

  const isItemActive = (item: any) => {
    const fullPath = item.path === "" ? "/" : normalize(item.path);
    if (pathname === fullPath) return true;
    return item.submenu?.some((sub: any) => pathname === normalize(sub.path));
  };

  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 h-full z-50 border-r border-blue-800 
          bg-blue-900 text-white flex flex-col transition-all duration-300
          ${sidebar ? "left-0" : "-left-full lg:left-0"}
          ${collapsed ? "lg:w-[80px]" : "lg:w-[260px]"}
        `}
      >
        {/* HEADER */}
        <div className="relative p-6 border-b border-blue-800 flex items-center justify-center">
          {!collapsed && <h1 className="text-2xl font-bold">UAGRM</h1>}

          {/* COLAPSADOR */}
          <button
            className="hidden lg:flex absolute -right-3 top-6 bg-blue-800 p-1 rounded-full shadow-md hover:bg-blue-700 transition"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
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
                        ${collapsed ? "justify-center px-0" : "justify-between px-5"}
                        py-3 text-lg transition-colors hover:bg-blue-800
                        ${active ? "bg-blue-800 border-r-4 border-blue-400" : ""}
                      `}
                    >
                      <div className="flex items-center">
                        <Icon className={`text-xl ${collapsed ? "" : "mr-3"}`} />
                        {!collapsed && item.text}
                      </div>
                      {!collapsed &&
                        (expanded ? <FaChevronDown /> : <FaChevronRight />)}
                    </button>
                  ) : (
                    <Link
                      href={fullPath}
                      prefetch
                      onClick={() => setSidebar(false)}
                      className={`
                        flex items-center py-3 transition-colors hover:bg-blue-800
                        ${collapsed ? "justify-center px-0" : "px-5 gap-3"}
                        ${active ? "bg-blue-800 border-r-4 border-blue-400" : ""}
                      `}
                    >
                      <Icon className="text-xl" />
                      {!collapsed && item.text}
                    </Link>
                  )}

                  {/* SUBMENÚ */}
                  {hasSub && expanded && !collapsed && (
                    <ul className="bg-blue-800 border-l-4 border-blue-600 ml-4 animate-fadeIn">
                      {item.submenu.map((sub: any, j: number) => {
                        const SubIcon = sub.icon;
                        const subPath = normalize(sub.path);
                        const subActive = pathname === subPath;

                        return (
                          <li key={j}>
                            <Link
                              href={subPath}
                              prefetch
                              onClick={() => setSidebar(false)}
                              className={`
                                flex items-center gap-3 px-6 py-2 text-base
                                hover:bg-blue-700 transition-colors
                                ${subActive ? "bg-blue-700 border-r-4 border-blue-300" : ""}
                              `}
                            >
                              <SubIcon className="text-lg" />
                              {sub.text}
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
