
import React from 'react';
import { Edit, Trash2 } from 'lucide-react'; 
import { Header, RowData } from './Matrizpi'; 

interface MatrizTableProps {
    headers: Header[];
    data: RowData[];
    openModal: (index: number | null) => void;
    handleDelete: (index: number) => void;
}

const MatrizTable: React.FC<MatrizTableProps> = ({ headers, data, openModal, handleDelete }) => {
    return (
        <div className="shadow-2xl rounded-xl overflow-hidden border-4 border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            {headers.map((h: Header) => (
                                <th 
                                    key={h.key} 
                                    className={`${h.color} p-4 font-bold text-gray-700 border-r border-gray-300 whitespace-nowrap text-left shadow-inner`}
                                >
                                    {h.label}
                                </th>
                            ))}
                            <th className="bg-gray-200 p-4 font-bold text-gray-700 whitespace-nowrap border-l border-gray-300 text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length + 1} className="text-center p-8 text-lg text-gray-500 italic">
                                    Aún no hay registros. ¡Usa el botón "Agregar Registro" para comenzar!
                                </td>
                            </tr>
                        ) : (
                            data.map((row: RowData, i: number) => (
                                <tr 
                                    key={i} 
                                    className="border-b border-gray-200 transition-colors duration-150 hover:bg-indigo-50"
                                >
                                    {headers.map((h: Header) => (
                                        <td 
                                            key={h.key} 
                                            className="p-3 border-r border-gray-200 text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={row[h.key]}
                                        >
                                            {row[h.key]}
                                        </td>
                                    ))}
                                    <td className="p-2 flex gap-2 justify-center items-center h-full">
                                        <button 
                                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-100 transition-colors" 
                                            onClick={() => openModal(i)} 
                                            title="Editar"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors" 
                                            onClick={() => handleDelete(i)} 
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatrizTable;