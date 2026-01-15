import GenericList from "../GenericList";
import PEIForm from "@/modules/pei/components/PeiForm";
export default function PEIList() {
  const datos = [
    {
      id: 1,
      anio_ini: "2025-01-01",
      anio_fin: "2025-12-31",
      observaciones: "Lorem ipsum",
    },
    {
      id: 2,
      anio_ini: "2026-01-01",
      anio_fin: "2030-12-31",
      observaciones: "Ejemplo",
    },
  ];

  const columnas = [
    { key: "id", header: "ID" },
    { key: "anio_ini", header: "Año inicio" },
    { key: "anio_fin", header: "Año fin" },
    { key: "observaciones", header: "Observaciones" },
  ];

  return (
    <GenericList
      title="PEIs"
      columns={columnas}
      data={datos}
      FormComponent={PEIForm}
    />
  );
}
