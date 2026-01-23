"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchableRemoteSelect from "./SearchableRemoteSelect";
import { useRemoteOptions } from "@/shared/hooks/useRemoteOptions";

type RemoteSearchFn = (params: {
  search: string;
  limit: number;
  offset: number;
}) => Promise<{ results: any[]; count: number }>;

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "remote-search-select"
    | "date"
    | "email"
    | "password"
    | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string | number; label: string }>;
  size?: "full" | "half";
  disabled?: boolean;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  helpText?: string;
  searchFn?: RemoteSearchFn;
  mapToOption?: (item: any) => { value: number; label: string };
  getByIdFn?: (id: number | string) => Promise<string>;
}

interface DynamicFormProps<T> {
  initialData?: Partial<T>;
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
}

function RemoteSelectField<T extends Record<string, any>>({
  field,
  value,
  setValue,
}: {
  field: FieldConfig<T>;
  value: any;
  setValue: (v: any) => void;
}) {
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined,
  );
  const [loadingLabel, setLoadingLabel] = useState(false);

  const remote = useRemoteOptions({
    searchFn: field.searchFn!,
    mapToOption: field.mapToOption!,
  });

  // ✅ SIEMPRE carga el label usando getByIdFn cuando hay un value
  useEffect(() => {
    if (!value || !field.getByIdFn) {
      setSelectedLabel(undefined);
      return;
    }

    setLoadingLabel(true);
    field
      .getByIdFn(value)
      .then((label) => {
        setSelectedLabel(label);
      })
      .catch((err) => {
        console.error("Error loading label with getByIdFn:", err);
        setSelectedLabel(`ID: ${value}`);
      })
      .finally(() => {
        setLoadingLabel(false);
      });
  }, [value, field]);

  return (
    <SearchableRemoteSelect
      value={value}
      onChange={(val, label) => {
        setValue(val);
        if (label) setSelectedLabel(label);
      }}
      options={remote.options}
      query={remote.query}
      setQuery={remote.setQuery}
      loading={remote.loading || loadingLabel}
      placeholder={field.placeholder}
      selectedLabel={selectedLabel}
      onOpenLoad={remote.loadInitial}
    />
  );
}

export function DynamicForm<T extends Record<string, any>>({
  initialData = {},
  fields,
  onSubmit,
  onCancel,
  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
}: DynamicFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => setFormData(initialData), [initialData]);

  const setValue = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const inputClasses =
    "w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed";

  const renderField = (field: FieldConfig<T>) => {
    const value = (formData[field.key] ?? "") as any;

    if (field.type === "remote-search-select") {
      return (
        <RemoteSelectField<T>
          field={field}
          value={value}
          setValue={(v) => setValue(field.key, v)}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          id={String(field.key)}
          value={value}
          onChange={(e) => setValue(field.key, e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          rows={field.rows ?? 4}
          className={inputClasses}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          id={String(field.key)}
          value={value}
          onChange={(e) => setValue(field.key, e.target.value)}
          required={field.required}
          disabled={field.disabled}
          className={inputClasses}
        >
          <option value="">Seleccionar...</option>
          {field.options?.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "number") {
      return (
        <input
          type="number"
          id={String(field.key)}
          value={value === null || value === undefined ? "" : value}
          onChange={(e) => {
            const val = e.target.value;
            setValue(field.key, val === "" ? "" : Number(val));
          }}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          min={field.min}
          max={field.max}
          step={field.step}
          className={inputClasses}
        />
      );
    }

    return (
      <input
        type={field.type}
        id={String(field.key)}
        value={value}
        onChange={(e) => setValue(field.key, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        disabled={field.disabled}
        className={inputClasses}
      />
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData as T);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={String(field.key)}
            className={field.size === "full" ? "md:col-span-2" : ""}
          >
            <label
              htmlFor={String(field.key)}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {field.helpText && (
              <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-6 pt-6 mt-2 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          icon={XMarkIcon}
        >
          {cancelButtonText}
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          icon={CheckIcon}
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}

// // src/shared/components/common/DynamicForm.tsx

// "use client";

// import React, { useEffect, useState } from "react";
// import Button from "./Button";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import SearchableRemoteSelect from "./SearchableRemoteSelect";
// import { useRemoteOptions } from "@/shared/hooks/useRemoteOptions";

// // ✅ Cambiado: search ahora es opcional
// type RemoteSearchFn = (params: {
//   search?: string; // ← Cambio de string a string | undefined
//   limit: number;
//   offset: number;
// }) => Promise<{ results: any[]; count: number }>;

// export interface FieldConfig<T> {
//   key: keyof T;
//   label: string;
//   type:
//     | "text"
//     | "number"
//     | "textarea"
//     | "select"
//     | "remote-search-select"
//     | "date"
//     | "email"
//     | "password"
//     | "checkbox";
//   required?: boolean;
//   placeholder?: string;
//   options?: Array<{ value: string | number; label: string }>;
//   size?: "full" | "half";
//   disabled?: boolean;
//   icon?: React.ReactNode;
//   min?: number;
//   max?: number;
//   step?: number;
//   rows?: number;
//   helpText?: string;
//   searchFn?: RemoteSearchFn;
//   mapToOption?: (item: any) => { value: number; label: string };
//   getByIdFn?: (id: number | string) => Promise<string>;
// }

// interface DynamicFormProps<T> {
//   initialData?: Partial<T>;
//   fields: FieldConfig<T>[];
//   onSubmit: (data: T) => void | Promise<void>;
//   onCancel?: () => void;
//   submitButtonText?: string;
//   cancelButtonText?: string;
// }

// function RemoteSelectField<T extends Record<string, any>>({
//   field,
//   value,
//   setValue,
// }: {
//   field: FieldConfig<T>;
//   value: any;
//   setValue: (v: any) => void;
// }) {
//   const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
//     undefined
//   );
//   const [loadingLabel, setLoadingLabel] = useState(false);

//   const remote = useRemoteOptions({
//     searchFn: field.searchFn!,
//     mapToOption: field.mapToOption!,
//   });

//   // ✅ SIEMPRE carga el label usando getByIdFn cuando hay un value
//   useEffect(() => {
//     if (!value || !field.getByIdFn) {
//       setSelectedLabel(undefined);
//       return;
//     }

//     setLoadingLabel(true);
//     field
//       .getByIdFn(value)
//       .then((label) => {
//         setSelectedLabel(label);
//       })
//       .catch((err) => {
//         console.error("Error loading label with getByIdFn:", err);
//         setSelectedLabel(`ID: ${value}`);
//       })
//       .finally(() => {
//         setLoadingLabel(false);
//       });
//   }, [value, field]);

//   return (
//     <SearchableRemoteSelect
//       value={value}
//       onChange={(val, label) => {
//         setValue(val);
//         if (label) setSelectedLabel(label);
//       }}
//       options={remote.options}
//       query={remote.query}
//       setQuery={remote.setQuery}
//       loading={remote.loading || loadingLabel}
//       placeholder={field.placeholder}
//       selectedLabel={selectedLabel}
//       onOpenLoad={remote.loadInitial}
//     />
//   );
// }

// export function DynamicForm<T extends Record<string, any>>({
//   initialData = {},
//   fields,
//   onSubmit,
//   onCancel,
//   submitButtonText = "Guardar",
//   cancelButtonText = "Cancelar",
// }: DynamicFormProps<T>) {
//   const [formData, setFormData] = useState<Partial<T>>(initialData);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => setFormData(initialData), [initialData]);

//   const setValue = (key: keyof T, value: any) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const inputClasses =
//     "w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed";

//   const renderField = (field: FieldConfig<T>) => {
//     const value = (formData[field.key] ?? "") as any;

//     if (field.type === "remote-search-select") {
//       return (
//         <RemoteSelectField<T>
//           field={field}
//           value={value}
//           setValue={(v) => setValue(field.key, v)}
//         />
//       );
//     }

//     if (field.type === "textarea") {
//       return (
//         <textarea
//           id={String(field.key)}
//           value={value}
//           onChange={(e) => setValue(field.key, e.target.value)}
//           placeholder={field.placeholder}
//           required={field.required}
//           disabled={field.disabled}
//           rows={field.rows ?? 4}
//           className={inputClasses}
//         />
//       );
//     }

//     if (field.type === "select") {
//       return (
//         <select
//           id={String(field.key)}
//           value={value}
//           onChange={(e) => setValue(field.key, e.target.value)}
//           required={field.required}
//           disabled={field.disabled}
//           className={inputClasses}
//         >
//           <option value="">Seleccionar...</option>
//           {field.options?.map((opt) => (
//             <option key={String(opt.value)} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       );
//     }

//     if (field.type === "number") {
//       return (
//         <input
//           type="number"
//           id={String(field.key)}
//           value={value === null || value === undefined ? "" : value}
//           onChange={(e) => {
//             const val = e.target.value;
//             setValue(field.key, val === "" ? "" : Number(val));
//           }}
//           placeholder={field.placeholder}
//           required={field.required}
//           disabled={field.disabled}
//           min={field.min}
//           max={field.max}
//           step={field.step}
//           className={inputClasses}
//         />
//       );
//     }

//     return (
//       <input
//         type={field.type}
//         id={String(field.key)}
//         value={value}
//         onChange={(e) => setValue(field.key, e.target.value)}
//         placeholder={field.placeholder}
//         required={field.required}
//         disabled={field.disabled}
//         className={inputClasses}
//       />
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await onSubmit(formData as T);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {fields.map((field) => (
//           <div
//             key={String(field.key)}
//             className={field.size === "full" ? "md:col-span-2" : ""}
//           >
//             <label
//               htmlFor={String(field.key)}
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               {field.label}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             {renderField(field)}
//             {field.helpText && (
//               <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-6 pt-6 mt-2 border-t border-gray-200">
//         <Button
//           type="button"
//           variant="secondary"
//           onClick={onCancel}
//           disabled={isSubmitting}
//           icon={XMarkIcon}
//         >
//           {cancelButtonText}
//         </Button>
//         <Button
//           type="submit"
//           variant="primary"
//           loading={isSubmitting}
//           icon={CheckIcon}
//         >
//           {submitButtonText}
//         </Button>
//       </div>
//     </form>
//   );
// }
