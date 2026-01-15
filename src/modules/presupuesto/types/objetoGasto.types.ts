// src/modules/presupuesto/types/objetoGasto.types.ts

import type { EntidadTransferencia } from "./entidadTransferencia.types";
import type { Organismo } from "./organismo.types";

export interface ObjetoGasto {
  id: number;
  description: string;
  importeDouble: number;
  entidadTransferenciaIdEt: EntidadTransferencia | null;
  organismoIdOrg: Organismo | null;
}

export interface CreateObjetoGastoInput {
  description: string;
  importeDouble: number;
  entidadTransferenciaIdEtId: number;
  organismoIdOrgId: number;
}

export interface UpdateObjetoGastoInput {
  description?: string;
  importeDouble?: number;
  entidadTransferenciaIdEtId?: number;
  organismoIdOrgId?: number;
}
