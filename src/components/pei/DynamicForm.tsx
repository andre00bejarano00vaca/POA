// components/DynamicForm.tsx (Parte 2: Componente)

// components/DynamicForm.tsx (Parte 1: Tipos)

import React, { useState } from "react";

// Tipos de Input admitidos
type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'checkbox';
type FieldSize = 'full' | 'half'; // Para la grilla (una columna o dos)

// Interfaz para la configuración de cada campo
export interface FieldConfig<T> {
  key: keyof T; // La clave del campo en el objeto de datos (e.g., 'anio_ini')
  label: string; // Etiqueta visible en el formulario
  type: FieldType; // Tipo de control (input, textarea, etc.)
  required?: boolean;
  placeholder?: string;
  size?: FieldSize; // Controla el ancho en la grilla
  icon?: string; // Para mejorar el estilo (ej: '🗓️', '💵')
  // Opcional: para inputs numéricos
  min?: number;
  step?: number;
}

// Reutilizamos la lógica de manejo de cambios
const getNewValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, type } = e.target;
    
    if (type === 'checkbox') {
        return (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
        return value === '' ? '' : parseFloat(value);
    }
    return value;
};


interface DynamicFormProps<T> {
  initialData: T; // Los datos iniciales del formulario
  fields: FieldConfig<T>[]; // La configuración de los campos
  onSubmit: (data: T) => void; // Función que se llama al enviar
  onCancel?: () => void;
  submitButtonText?: string;
}

// Componente genérico
export function DynamicForm<T>({ 
    initialData, 
    fields, 
    onSubmit, 
    onCancel, 
    submitButtonText = "Guardar Cambios" 
}: DynamicFormProps<T>) {
  
  // Usamos un estado genérico T
  const [formData, setFormData] = useState<T>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    const newValue = getNewValue(e);

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías añadir una lógica de validación genérica si fuera necesario
    onSubmit(formData);
  };

  // Renderiza un campo individual
  const renderField = (field: FieldConfig<T>) => {
    const commonProps = {
        id: field.key as string,
        name: field.key as string,
        value: field.type !== 'checkbox' ? (formData[field.key] as string | number) : undefined,
        checked: field.type === 'checkbox' ? (formData[field.key] as boolean) : undefined,
        onChange: handleChange,
        required: field.required,
        placeholder: field.placeholder,
        className: 'w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500',
    };
    
    switch (field.type) {
        case 'textarea':
            return (
                <textarea
                    {...commonProps}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            );
        case 'checkbox':
            return (
                <div className="flex items-center pt-1">
                    <input
                        type="checkbox"
                        {...commonProps}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={field.key as string} className="ml-2 text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                </div>
            );
        default:
            return (
                <input
                    type={field.type}
                    {...commonProps}
                    min={field.min}
                    step={field.step}
                />
            );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {fields.map((field) => (
          <div 
            key={field.key as string} 
            className={`${field.size === 'half' ? 'col-span-12 md:col-span-6' : 'col-span-12'}`}
          >
            {field.type !== 'checkbox' && (
              <label htmlFor={field.key as string} className="block text-sm font-medium text-gray-700 mb-1">
                {field.icon} {field.label}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}