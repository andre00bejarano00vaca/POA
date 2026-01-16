// src/types/matrizPresupuesto.types.ts

export interface MatrizPresupuestoRecord {
  id?: number;
  codigo: string;
  codPpto: string;
  entidad: string;
  da: string;
  ue: string;
  prog: string;
  nroAct: string;
  descripcionActividad: string;

  // IDs para relacionar con services
  objetoGastoId: number;

  // Campos auto-llenados desde ObjetoGasto
  partida?: string; // description del ObjetoGasto
  descripcionGasto?: string; // description del ObjetoGasto
  fuente?: string; // código fuente del Organismo
  org?: string; // código del Organismo
  entidadTransf?: string; // código de Entidad Transferencia

  importe: number;
}

export interface CreateMatrizPresupuestoInput {
  codigo: string;
  codPpto: string;
  entidad: string;
  da: string;
  ue: string;
  prog: string;
  nroAct: string;
  descripcionActividad: string;
  objetoGastoId: number;
  importe: number;
}
