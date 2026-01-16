// import ProductoInstitucionalForm from "@/modules/pei/components/ProductoInstitucionalForm";
// import React from "react";

// const page = () => {
//   return <ProductoInstitucionalForm />;
// };

// export default page;
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useProductoInstitucional } from "@/modules/pei/hooks/useProductoInstitucional";
import {
  productoInstitucionalColumns,
  productoInstitucionalFormFields,
} from "@/modules/pei/config/productoInstitucional.config";
import type { ProductoInstitucional } from "@/modules/pei/types/productoInstitucional.types";

export default function ProductoInstitucionalPage() {
  return (
    <GenericList<ProductoInstitucional>
      title="Productos Institucionales"
      useData={useProductoInstitucional}
      columns={productoInstitucionalColumns}
      formFields={productoInstitucionalFormFields}
      searchKeys={["idPi", "description"]}
      searchPlaceholder="Buscar por ID PI o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay productos institucionales registrados."
      createButtonText="Añadir Producto"
      mapItemToForm={(item: ProductoInstitucional) => ({
        id: item.id,
        idPi: item.idPi,
        description: item.description,
        accionEstrategicaId: item.accionEstrategica?.id,
      })}
    />
  );
}
