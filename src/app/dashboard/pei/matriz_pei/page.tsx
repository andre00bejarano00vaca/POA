// import FormMatrizPEI from "@/modules/pei/components/FormMatrizPEI";
// import PEIList from "@/modules/pei/components/PEIList";
// import React from "react";

// const page = () => {
//   return (
//     <>
//       {/* <FormMatrizPEI/> */}
//       <PEIList />
//     </>
//   );
// };

// export default page;

// import Matriz from "@/shared/components/common/MatrizPei";

// export default function Page() {
//   return <Matriz />;
// }

// src/app/dashboard/pei/matriz_pei/page.tsx
// "use client";

// import GenericList from "@/shared/components/common/GenericList";
// import { useMatrizPei } from "@/modules/pei";
// import { matrizPeiColumns, matrizPeiFormFields } from "@/modules/pei";
// import type { MatrizPei } from "@/modules/pei";

// export default function MatrizPeiPage() {
//   return (
//     <GenericList<MatrizPei>
//       title="Matriz PEI - Plan Estratégico Institucional"
//       useData={useMatrizPei}
//       columns={matrizPeiColumns}
//       formFields={matrizPeiFormFields}
//       searchKeys={["anioBase", "metaMedianoPlazo"]}
//       searchPlaceholder="Buscar por año base o meta..."
//       enableCreate
//       enableEdit
//       enableDelete
//       emptyMessage="No hay registros en la matriz PEI."
//       createButtonText="Añadir Registro a Matriz"
//       mapItemToForm={(item: MatrizPei) => ({
//         id: item.id,
//         anioBase: item.anioBase,
//         metaMedianoPlazo: item.metaMedianoPlazo,
//         peiId: item.pei?.id,
//         objetivoEstrategicoId: item.objetivoEstrategico?.id,
//         productoInstitucionalId: item.productoInstitucional?.id,
//         accionEstrategicaId: item.accionEstrategica?.id,
//         indicadorPeiId: item.indicadorPei?.id,
//         unidadEjecutoraId: item.unidadEjecutora?.id,
//       })}
//     />
//   );
// }

// import Matriz from "@/shared/components/common/MatrizPei";
// export default function Page() {
//   return <Matriz />;
// }
