// src/modules/pei/index.ts

export { usePei } from "./hooks/usePei";
export { useArea } from "./hooks/useArea";
export { usePoliticaDesarrollo } from "./hooks/usePoliticaDesarrollo";
export { useObjetivoEstrategico } from "./hooks/useObjetivoEstrategico";
export { useAccionEstrategica } from "./hooks/useAccionEstrategica";

export type * from "./types/pei.types";
export type * from "./types/area.types";
export type * from "./types/politicaDesarrollo.types";
export type * from "./types/objetivoEstrategico.types";
export type * from "./types/accionEstrategica.types";

export { peiColumns, peiFormFields } from "./config/pei.config";
export { areaColumns, areaFormFields } from "./config/area.config";
export {
  politicaDesarrolloColumns,
  politicaDesarrolloFormFields,
} from "./config/politicaDesarrollo.config";
export {
  objetivoEstrategicoColumns,
  objetivoEstrategicoFormFields,
} from "./config/objetivoEstrategico.config";
export {
  accionEstrategicaColumns,
  accionEstrategicaFormFields,
} from "./config/accionEstrategica.config";

export { PeiService } from "./services/pei.service";
export { AreaService } from "./services/areaEstrategica.service";
export { PoliticaDesarrolloService } from "./services/politicaDesarrollo.service";
export { ObjetivoEstrategicoService } from "./services/objetivoEstrategico.service";
export { AccionEstrategicaService } from "./services/accionEstrategica.service";

export { useProductoInstitucional } from "./hooks/useProductoInstitucional";
export type * from "./types/productoInstitucional.types";
export {
  productoInstitucionalColumns,
  productoInstitucionalFormFields,
} from "./config/productoInstitucional.config";
export { ProductoInstitucionalService } from "./services/productoInstitucional.service";

export { useIndicadorPei } from "./hooks/useIndicadorPei";
export type * from "./types/indicadorPei.types";
export {
  indicadorPeiColumns,
  indicadorPeiFormFields,
} from "./config/indicadorPei.config";
export { IndicadorPeiService } from "./services/indicadorPei.service";
