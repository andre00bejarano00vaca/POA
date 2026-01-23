// "use client";

// import { useMemo, useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import type { RemoteOption } from "@/shared/hooks/useRemoteOptions";

// interface Props {
//   value: number | "";
//   onChange: (value: number, label?: string) => void;

//   options: RemoteOption[];
//   query: string;
//   setQuery: (v: string) => void;
//   loading?: boolean;

//   placeholder?: string;
//   disabled?: boolean;

//   selectedLabel?: string;

//   onOpenLoad?: () => Promise<void>;
// }

// export default function SearchableRemoteSelect({
//   value,
//   onChange,
//   options,
//   query,
//   setQuery,
//   loading,
//   placeholder = "Buscar...",
//   disabled,
//   selectedLabel,
//   onOpenLoad,
// }: Props) {
//   const [open, setOpen] = useState(false);

//   // Buscar label en las opciones cargadas
//   const labelFromOptions = useMemo(
//     () => options.find((o) => o.value === value)?.label ?? "",
//     [options, value]
//   );

//   // ✅ PRIORIDAD: selectedLabel (de getByIdFn) > labelFromOptions > fallback
//   const closedLabel =
//     selectedLabel || labelFromOptions || (value ? `Cargando...` : "");

//   const displayValue = open ? query : closedLabel;

//   const openDropdown = async () => {
//     if (disabled) return;
//     setOpen(true);

//     if (onOpenLoad) {
//       await onOpenLoad();
//     }
//   };

//   const closeDropdown = () => {
//     setOpen(false);
//     setQuery("");
//   };

//   const toggle = async () => {
//     if (open) closeDropdown();
//     else await openDropdown();
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         <input
//           value={displayValue}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={openDropdown}
//           placeholder={placeholder}
//           disabled={disabled}
//           className="w-full px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg shadow-sm transition duration-150 disabled:bg-gray-100 disabled:cursor-not-allowed"
//         />

//         <button
//           type="button"
//           onClick={toggle}
//           disabled={disabled}
//           className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
//           aria-label="Abrir lista"
//         >
//           <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//         </button>
//       </div>

//       {open && !disabled && (
//         <div
//           className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto"
//           onMouseDown={(e) => e.preventDefault()}
//         >
//           {loading && (
//             <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
//           )}

//           {!loading && options.length === 0 && (
//             <div className="px-4 py-2 text-sm text-gray-500">
//               Sin resultados
//             </div>
//           )}

//           {!loading &&
//             options.map((opt) => (
//               <button
//                 key={opt.value}
//                 type="button"
//                 className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
//                 onClick={() => {
//                   onChange(opt.value, opt.label);
//                   closeDropdown();
//                 }}
//               >
//                 {opt.label}
//               </button>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { RemoteOption } from "@/shared/hooks/useRemoteOptions";

interface Props {
  value: number | "";
  onChange: (value: number, label?: string) => void;

  options: RemoteOption[];
  query: string;
  setQuery: (v: string) => void;
  loading?: boolean;

  placeholder?: string;
  disabled?: boolean;

  selectedLabel?: string;

  onOpenLoad?: () => Promise<void>;
}

export default function SearchableRemoteSelect({
  value,
  onChange,
  options,
  query,
  setQuery,
  loading,
  placeholder = "Buscar...",
  disabled,
  selectedLabel,
  onOpenLoad,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Buscar label en las opciones cargadas
  const labelFromOptions = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  // ✅ PRIORIDAD: selectedLabel (de getByIdFn) > labelFromOptions > fallback
  const closedLabel =
    selectedLabel || labelFromOptions || (value ? `Cargando...` : "");

  const displayValue = open ? query : closedLabel;

  // Calcular posición del dropdown para evitar que se corte
  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Si hay más espacio arriba y poco espacio abajo, abrir hacia arriba
      if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [open]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const openDropdown = async () => {
    if (disabled) return;
    setOpen(true);

    if (onOpenLoad) {
      await onOpenLoad();
    }
  };

  const closeDropdown = () => {
    setOpen(false);
    setQuery("");
  };

  const toggle = async () => {
    if (open) closeDropdown();
    else await openDropdown();
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          value={displayValue}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={openDropdown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg shadow-sm transition duration-150 disabled:bg-gray-100 disabled:cursor-not-allowed"
          autoComplete="off"
        />

        <button
          type="button"
          onClick={toggle}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
          aria-label="Abrir lista"
        >
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {open && !disabled && (
        <div
          ref={dropdownRef}
          className={`
            absolute z-[9999] w-full bg-white border border-gray-300 rounded-lg shadow-xl
            ${dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
          style={{
            maxHeight: "400px", // Aumentado de 256px a 400px
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* Contenedor con scroll */}
          <div className="overflow-y-auto max-h-[400px]">
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Cargando...
              </div>
            )}

            {!loading && options.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {query
                  ? `No se encontraron resultados para "${query}"`
                  : "Sin resultados"}
              </div>
            )}

            {!loading &&
              options.map((opt, index) => (
                <button
                  key={`${opt.value}-${index}`}
                  type="button"
                  className={`
                    w-full text-left px-4 py-2.5 text-sm transition-colors
                    hover:bg-blue-50 hover:text-blue-700
                    focus:bg-blue-100 focus:outline-none
                    ${opt.value === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}
                    border-b border-gray-100 last:border-b-0
                  `}
                  onClick={() => {
                    onChange(opt.value, opt.label);
                    closeDropdown();
                  }}
                >
                  {opt.label}
                </button>
              ))}
          </div>

          {/* Indicador de más resultados si aplica */}
          {!loading && options.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50 text-center">
              {options.length}{" "}
              {options.length === 1 ? "resultado" : "resultados"}
              {query && " encontrados"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
