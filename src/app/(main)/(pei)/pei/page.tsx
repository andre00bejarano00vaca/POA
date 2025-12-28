// app/pei/page.tsx
"use client";
import { useEffect, useState } from "react";
import { PeiService } from "@/service/pei.service";
import PEIList from "@/components/pei/GenericList";
import { ColumnConfig } from "@/components/pei/DynamicTable";

export default function PeiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos el método listAll que definimos antes
    PeiService.listAll().then((res) => {
      if (res?.allPei) setData(res.allPei);
      setLoading(false);
    });
  }, []);

  // Definimos qué columnas queremos ver para el PEI
  const columns: ColumnConfig<any>[] = [
    { key: "id", header: "ID" },
    { key: "anioIni", header: "Año Inicial" },
    { key: "anioFin", header: "Año Final" },
    { 
      key: "metaTotal", 
      header: "Meta Total",
      render: (item) => `Bs. ${item.metaTotal.toLocaleString()}` 
    },
    { key: "observacion", header: "Observaciones" },
  ];

  if (loading) return <p>Cargando...</p>;

  return (
    <PEIList 
      title="Planes Estratégicos (PEI)"
      data={data}
      columns={columns}
      searchFields={["observacion", "id"]}
      searchPlaceholder="Buscar por observación o ID..."
    />
  );
}