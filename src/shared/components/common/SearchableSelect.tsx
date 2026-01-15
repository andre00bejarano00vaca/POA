"use client";

import { useMemo, useState } from "react";
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

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value]
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return options;
    return options.filter((o) => o.label.toLowerCase().includes(term));
  }, [search, options]);

  return (
    <div className="relative">
      <div onClick={() => setOpen(true)}>
        <SearchBar
          value={open ? search : selectedLabel}
          onChange={setSearch}
          placeholder={placeholder}
          className="mb-0"
        />
      </div>

      {open && !disabled && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filtered.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Sin resultados
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
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
