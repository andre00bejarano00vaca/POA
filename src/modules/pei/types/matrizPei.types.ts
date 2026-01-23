// src/modules/pei/types/matrizPei.types.ts

import type { PEI } from "./pei.types";
import type { ObjetivoEstrategico } from "./objetivoEstrategico.types";
import type { ProductoInstitucional } from "./productoInstitucional.types";
import type { AccionEstrategica } from "./accionEstrategica.types";
import type { IndicadorPei } from "./indicadorPei.types";
import type { UnidadEjecutora } from "@/modules/organization/types/unidadEjecutora.types";

export interface MatrizPei {
  id: number;
  anioBase: number;
  metaMedianoPlazo: number;
  pei: PEI | null;
  objetivoEstrategico: ObjetivoEstrategico | null;
  productoInstitucional: ProductoInstitucional | null;
  accionEstrategica: AccionEstrategica | null;
  indicadorPei: IndicadorPei | null;
  unidadEjecutora: UnidadEjecutora | null;
}

export interface CreateMatrizPeiInput {
  anioBase: number;
  metaMedianoPlazo: number;
  peiId: number;
  objetivoEstrategicoId: number;
  productoInstitucionalId: number;
  accionEstrategicaId: number;
  indicadorPeiId: number;
  unidadEjecutoraId: number;
}

export interface UpdateMatrizPeiInput {
  anioBase?: number;
  metaMedianoPlazo?: number;
  peiId?: number;
  objetivoEstrategicoId?: number;
  productoInstitucionalId?: number;
  accionEstrategicaId?: number;
  indicadorPeiId?: number;
  unidadEjecutoraId?: number;
}
