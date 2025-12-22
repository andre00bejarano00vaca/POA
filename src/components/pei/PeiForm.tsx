// components/PeiForm.tsx (Refactorizado)

"use client";
import React from "react";
// Importamos el generador y su tipo de configuración
import { DynamicForm, FieldConfig } from "@/components/pei/DynamicForm"; 


// --- 1. DEFINICIONES DE TIPOS (Reutilizamos los existentes) ---

interface PEI {
  id_pei: number;
  anio_ini: string;
  anio_fin: string;
  observaciones: string;
  meta_total: number;
  ejecucion: number;
  activo: boolean;
}

interface PEIFormProps {
  onAdd: (newPEI: PEI) => void;
  onCancel?: () => void; 
}

// Tipo de datos que el formulario gestionará (omitimos 'id_pei' porque se genera al final)
type PEIFormData = Omit<PEI, 'id_pei'>; 

// Valor inicial del formulario (ajustado al tipo PEIFormData)
const initialFormData: PEIFormData = {
    anio_ini: "",
    anio_fin: "",
    observaciones: "",
    meta_total: 0, 
    ejecucion: 0,
    activo: true,
};

// --- 2. CONFIGURACIÓN DINÁMICA DE CAMPOS ---
// Define la estructura, tipo y apariencia de los campos
const PEI_FIELDS: FieldConfig<PEIFormData>[] = [
    { 
        key: 'anio_ini', 
        label: 'Año Inicio', 
        type: 'date', 
        required: true, 
        size: 'half', 
        icon: '🗓️' 
    },
    { 
        key: 'anio_fin', 
        label: 'Año Fin', 
        type: 'date', 
        required: true, 
        size: 'half', 
        icon: '🗓️' 
    },
    { 
        key: 'meta_total', 
        label: 'Meta Total (Presupuesto)', 
        type: 'number', 
        required: true, 
        size: 'half', 
        icon: '💵',
        min: 0,
        step: 0.01,
    },
    { 
        key: 'ejecucion', 
        label: 'Ejecución Acumulada', 
        type: 'number', 
        required: false, 
        size: 'half', 
        icon: '💲',
        min: 0,
        step: 0.01,
    },
    { 
        key: 'activo', 
        label: 'Activo (Disponible para ejecución)', 
        type: 'checkbox', 
        required: false, 
        size: 'full' 
    },
    { 
        key: 'observaciones', 
        label: 'Observaciones y Comentarios', 
        type: 'textarea', 
        required: false, 
        size: 'full', 
        icon: '📝',
        placeholder: 'Detalles importantes...'
    },
];

// --- 3. COMPONENTE CONTENEDOR QUE USA EL GENERADOR ---
const PEIForm: React.FC<PEIFormProps> = ({ onAdd, onCancel }) => {

    // Función que transforma los datos del formulario a la interfaz PEI final
    const handleDynamicSubmit = (formData: PEIFormData) => {
        
        // Aquí se simularía la llamada a GraphQL (Mutation)
        const newPEI: PEI = {
            // Se genera el ID o se recibe de la API
            id_pei: Math.floor(Math.random() * 100000), 
            ...formData, // El resto de los datos ya están formateados
            // Aseguramos que los números sean 0 si quedaron como ''
            meta_total: typeof formData.meta_total === 'number' ? formData.meta_total : 0,
            ejecucion: typeof formData.ejecucion === 'number' ? formData.ejecucion : 0,
        };

        onAdd(newPEI);
    };

    return (
        <div className="p-4 bg-white">
            <DynamicForm<PEIFormData>
                initialData={initialFormData}
                fields={PEI_FIELDS}
                onSubmit={handleDynamicSubmit}
                onCancel={onCancel}
                submitButtonText="💾 Guardar PEI"
            />
        </div>
    );
};

export default PEIForm;