// "use client";

// import { useMemo, useState } from "react";
// import SearchBar from "./SearchBar";

// type Option = {
//   value: number;
//   label: string;
// };

// interface Props {
//   value: number | "";
//   onChange: (value: number) => void;
//   options: Option[];
//   placeholder?: string;
//   disabled?: boolean;
// }

// export default function SearchableSelect({
//   value,
//   onChange,
//   options,
//   placeholder = "Buscar...",
//   disabled,
// }: Props) {
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);

//   const selectedLabel = useMemo(
//     () => options.find((o) => o.value === value)?.label ?? "",
//     [options, value]
//   );

//   const filtered = useMemo(() => {
//     const term = search.toLowerCase().trim();
//     if (!term) return options;
//     return options.filter((o) => o.label.toLowerCase().includes(term));
//   }, [search, options]);

//   return (
//     <div className="relative">
//       <div onClick={() => setOpen(true)}>
//         <SearchBar
//           value={open ? search : selectedLabel}
//           onChange={setSearch}
//           placeholder={placeholder}
//           className="mb-0"
//         />
//       </div>

//       {open && !disabled && (
//         <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
//           {filtered.length === 0 && (
//             <div className="px-4 py-2 text-sm text-gray-500">
//               Sin resultados
//             </div>
//           )}

//           {filtered.map((opt) => (
//             <button
//               key={opt.value}
//               type="button"
//               onClick={() => {
//                 onChange(opt.value);
//                 setSearch("");
//                 setOpen(false);
//               }}
//               className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
//             >
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";

type Option = {
  value: number;
  label: string;
};

interface Props {
  value: number | "";
  onChange: (value: number) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Buscar...",
  disabled,
}: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return options;
    return options.filter((o) => o.label.toLowerCase().includes(term));
  }, [search, options]);

  // Calcular posición del dropdown
  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [open]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <div onClick={() => !disabled && setOpen(true)}>
        <SearchBar
          value={open ? search : selectedLabel}
          onChange={setSearch}
          placeholder={placeholder}
          className="mb-0"
        />
      </div>

      {open && !disabled && (
        <div
          className={`
            absolute z-[9999] w-full bg-white border border-gray-300 rounded-lg shadow-xl
            ${dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
          style={{
            maxHeight: "400px",
          }}
        >
          <div className="overflow-y-auto max-h-[400px]">
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {search
                  ? `No se encontraron resultados para "${search}"`
                  : "Sin resultados"}
              </div>
            )}

            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setSearch("");
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-colors
                  hover:bg-blue-50 hover:text-blue-700
                  focus:bg-blue-100 focus:outline-none
                  ${opt.value === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}
                  border-b border-gray-100 last:border-b-0
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50 text-center">
              {filtered.length}{" "}
              {filtered.length === 1 ? "resultado" : "resultados"}
              {search && " encontrados"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
