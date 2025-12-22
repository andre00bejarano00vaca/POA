"use client";
import React from "react";

interface DetalleData {
  codigoEstrategico: string;
  codigoGestion: string;
  accionMedianoPlazo: string;
  accionCortoPlazo: string;
  indicador: string;
  descripcion: string;
  unidadMedida: string;
  tipo: string;
  clase: string;
  trim1: number;
  trim2: number;
  trim3: number;
  trim4: number;
  total: number;
  fechaInicio: string;
  fechaConclusion: string;
}

interface Props {
  data: DetalleData[];
}

const DetalleTablaRetro: React.FC<Props> = ({ data }) => {
  return (
    <div className=" mx-auto bg-[#e0e0e0] border border-gray-500 p-3 rounded-md shadow-[inset_1px_1px_0_#fff,1px_1px_3px_#555] font-sans text-[13px] text-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-600 border-collapse text-[12px]">
          <thead>
            <tr className="bg-[#1a3d6d] text-white text-center">
              <th className="border border-gray-600 px-2 py-1">CÓDIGO</th>
              <th className="border border-gray-600 px-2 py-1">ACCIÓN DE MEDIANO PLAZO / CORTO PLAZO</th>
              <th className="border border-gray-600 px-2 py-1">INDICADORES</th>
              <th className="border border-gray-600 px-2 py-1">DESCRIPCIÓN DE LAS OPERACIONES Y ACTIVIDADES</th>
              <th className="border border-gray-600 px-2 py-1">UNIDAD DE<br />MEDIDA</th>
              <th className="border border-gray-600 px-2 py-1">TIPO</th>
              <th className="border border-gray-600 px-2 py-1">CLASE</th>
              <th className="border border-gray-600 px-2 py-1" colSpan={5}>PROGRAMACIÓN DE RESULTADOS</th>
              <th className="border border-gray-600 px-2 py-1" colSpan={2}>FECHA</th>
            </tr>
            <tr className="bg-[#d0d0d0] text-center font-semibold">
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1"></th>
              <th className="border border-gray-500 px-2 py-1">1er TRIM.</th>
              <th className="border border-gray-500 px-2 py-1">2do TRIM.</th>
              <th className="border border-gray-500 px-2 py-1">3er TRIM.</th>
              <th className="border border-gray-500 px-2 py-1">4to TRIM.</th>
              <th className="border border-gray-500 px-2 py-1">TOTAL</th>
              <th className="border border-gray-500 px-2 py-1">INICIO</th>
              <th className="border border-gray-500 px-2 py-1">CONCL.</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-[#f3f6fa]">
                <td className="border border-gray-500 px-2 py-1 text-center font-semibold">
                  {item.codigoEstrategico}.{item.codigoGestion}
                </td>
                <td className="border border-gray-500 px-2 py-1">{item.accionCortoPlazo}</td>
                <td className="border border-gray-500 px-2 py-1">{item.indicador}</td>
                <td className="border border-gray-500 px-2 py-1">{item.descripcion}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.unidadMedida}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.tipo}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.clase}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.trim1}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.trim2}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.trim3}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.trim4}</td>
                <td className="border border-gray-500 px-2 py-1 text-center font-bold">{item.total}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.fechaInicio}</td>
                <td className="border border-gray-500 px-2 py-1 text-center">{item.fechaConclusion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalleTablaRetro;
