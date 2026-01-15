// src/modules/presupuesto/index.ts

// HOOKS
export { useFuente } from "./hooks/useFuente";
export { useObjetoGasto } from "./hooks/useObjetoGasto";
export { useOrganismo } from "./hooks/useOrganismo";
export { useRecaudacion } from "./hooks/useRecaudacion";
export { useRubro } from "./hooks/useRubro";
export { useEntidadTransferencia } from "./hooks/useEntidadTransferencia";

// TYPES
export type * from "./types/fuente.types";
export type * from "./types/recaudacion.types";
export type * from "./types/rubro.types";
export type * from "./types/entidadTransferencia.types";

// CONFIG (Columnas y Formularios)
export { fuenteColumns, fuenteFormFields } from "./config/fuente.config";
export {
  objetoGastoColumns,
  objetoGastoFormFields,
} from "./config/objetoGasto.config";
export {
  organismoColumns,
  organismoFormFields,
} from "./config/organismo.config";
export {
  recaudacionColumns,
  recaudacionFormFields,
} from "./config/recaudacion.config";
export { rubroColumns, rubroFormFields } from "./config/rubro.config";
export {
  entidadTransferenciaColumns,
  entidadTransferenciaFormFields,
} from "./config/entidadTransferencia.config";

// SERVICES
export { FuenteService } from "./services/fuente.service";
export { ObjetoGastoService } from "./services/objetoGasto.service";
export { OrganismoService } from "./services/organismo.service";
export { RecaudacionService } from "./services/recaudacion.service";
export { RubroService } from "./services/rubro.service";
export { EntidadTransferenciaService } from "./services/entidadTransferencia.service";
