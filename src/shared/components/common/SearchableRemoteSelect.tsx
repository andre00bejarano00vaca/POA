"use client";

import { useMemo, useState } from "react";
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

  // ✅ cargar lista al abrir
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

  const labelFromOptions = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value]
  );

  const closedLabel = labelFromOptions || selectedLabel || "";
  const displayValue = open ? query : closedLabel;

  const openDropdown = async () => {
    if (disabled) return;
    setOpen(true);

    // ✅ SIEMPRE intenta cargar al abrir (si te lo pasan)
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
    <div className="relative">
      <div className="relative">
        <input
          value={displayValue}
          onChange={(e) => setQuery(e.target.value)} // ✅ deja escribir siempre
          onFocus={openDropdown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg shadow-sm transition duration-150 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={toggle}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          aria-label="Abrir lista"
        >
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {open && !disabled && (
        <div
          className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          {loading && (
            <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
          )}

          {!loading && options.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Sin resultados
            </div>
          )}

          {!loading &&
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                onClick={() => {
                  onChange(opt.value, opt.label);
                  closeDropdown();
                }}
              >
                {opt.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
