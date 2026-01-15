export interface PEI {
  id: number;
  anioIni: string;
  anioFin: string;
  observacion?: string;
  metaTotal: number;
  ejecucion: number;
}

export interface CreatePEIInput {
  anioIni: string;
  anioFin: string;
  metaTotal: number;
  ejecucion: number;
  observacion?: string;
}

export interface UpdatePEIInput {
  anioIni?: string;
  anioFin?: string;
  metaTotal?: number;
  ejecucion?: number;
  observacion?: string;
}
