// // src/modules/poa/types/programacionTrimestralMeta.types.ts

// import type { IndicadorPoa } from "./indicadorPoa.types";

// export interface ProgramacionTrimestralMeta {
//   id: number;
//   trimestre: number;
//   programado: number;
//   ejecutado: number;
//   indicadorPoa: IndicadorPoa | null;
// }

// export interface CreateProgramacionTrimestralMetaInput {
//   trimestre: number;
//   programado: number;
//   ejecutado: number;
//   indicadorPoaId: number;
// }

// export interface UpdateProgramacionTrimestralMetaInput {
//   trimestre?: number;
//   programado?: number;
//   ejecutado?: number;
//   indicadorPoaId?: number;
// }

// src/modules/poa/types/programacionTrimestral.types.ts

import type { IndicadorPoa } from "./indicadorPoa.types";

export interface ProgramacionTrimestral {
  id: number;
  trimestre: number;
  programado: number;
  indicadorPoaId: number;
  // Relaciones
  indicadorPoa?: IndicadorPoa;
}

export interface CreateProgramacionTrimestralInput {
  trimestre: number;
  programado: number;
  indicadorPoaId: number;
}

export interface UpdateProgramacionTrimestralInput {
  trimestre?: number;
  programado?: number;
  indicadorPoaId?: number;
}
