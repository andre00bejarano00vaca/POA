
import React from 'react';
import { Header, RowData } from './Matrizpi'; 
import { X } from 'lucide-react'; 

interface MatrizModalProps {
    modalOpen: boolean;
    editIndex: number | null;
    form: RowData;
    headers: Header[];
    handleChange: (key: string, value: string) => void;
    handleSave: () => void;
    closeModal: () => void;
}

// Función auxiliar para renderizar el control de entrada (SELECT o TEXTAREA)
const renderField = (h: Header, form: RowData, handleChange: (key: string, value: string) => void) => {
    const baseControlClass = "w-full border border-gray-300 p-2 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors";

    if (h.options) {
        // SELECT: Desplegable
        return (
            <select
                className={`${baseControlClass} bg-white appearance-none`}
                value={form[h.key] || ""}
                onChange={(e) => handleChange(h.key, e.target.value)}
            >
                <option value="" disabled className="text-gray-400">Seleccionar...</option>
                
                {h.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    } else {
        // TEXTAREA: Texto Libre
        return (
            <textarea
                className={`${baseControlClass} min-h-[50px] resize-y font-normal`}
                value={form[h.key] || ""}
                onChange={(e) => handleChange(h.key, e.target.value)}
                rows={2}
                placeholder={`Escriba el ${h.label.toLowerCase()}...`}
            />
        );
    }
};


const MatrizModal: React.FC<MatrizModalProps> = ({ 
    editIndex, form, headers, handleChange, handleSave, closeModal 
}) => {
    
    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-80 flex justify-center items-center p-4 z-50 backdrop-blur-sm">

            <div className="bg-white p-6 w-full max-w-7xl rounded-lg shadow-2xl transform transition-all duration-300 scale-100">
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        {editIndex !== null ? "📝 Edición de Registro PEI" : "➕ Nuevo Registro PEI"}
                    </h3>
                    <button onClick={closeModal} className="text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="overflow-x-auto max-h-[70vh]">
                    <table className="min-w-max text-sm border-collapse">
                        
                        {/* 1. Fila de Encabezados (Sticky para referencia) */}
                        <thead className="sticky top-0 z-10">
                            <tr>
                                {headers.map((h: Header) => (
                                    <th 
                                        key={h.key} 
                                        className={`${h.color} p-3 font-semibold text-gray-800 border-r border-gray-300 whitespace-nowrap text-left min-w-[220px] shadow-sm`}
                                    >
                                        {h.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* 2. Fila de Controles de Entrada */}
                        <tbody>
                            <tr className="bg-gray-50 border-b border-gray-300">
                                {headers.map((h: Header) => (
                                    <td 
                                        key={h.key} 
                                        className="p-3 border-r border-gray-200 align-top min-w-[220px]"
                                    >
                                        {/* Renderiza el SELECT o TEXTAREA */}
                                        {renderField(h, form, handleChange)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ➡️ Pie de página y Botones de Acción */}
                <div className="flex justify-end mt-6 gap-3 pt-4 border-t border-gray-200">
                    <button 
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors" 
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md transition-colors" 
                        onClick={handleSave}
                    >
                        {editIndex !== null ? "Actualizar Registro" : "Guardar Registro"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatrizModal;