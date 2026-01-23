// import ProductoForm from "@/modules/poa/components/ProductoForm";
// import React from "react";

// const page = () => {
//   return <ProductoForm />;
// };

// export default page;

// src/app/dashboard/poa/producto/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useProducto } from "@/modules/poa";
import { productoColumns, productoFormFields } from "@/modules/poa";
import type { Producto } from "@/modules/poa";

export default function ProductoPage() {
  return (
    <GenericList<Producto>
      title="Productos POA"
      useData={useProducto}
      columns={productoColumns}
      formFields={productoFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay productos registrados."
      createButtonText="Añadir Producto"
      mapItemToForm={(item: Producto) => ({
        id: item.id,
        description: item.description,
        accionCortoPlazoId: item.accionCortoPlazo?.id,
      })}
    />
  );
}
