// src/modules/pei/config/matrizPei.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { MatrizPei } from "../types/matrizPei.types";
import { PeiService } from "../services/pei.service";
import { ObjetivoEstrategicoService } from "../services/objetivoEstrategico.service";
import { ProductoInstitucionalService } from "../services/productoInstitucional.service";
import { AccionEstrategicaService } from "../services/accionEstrategica.service";
import { IndicadorPeiService } from "../services/indicadorPei.service";
import { UnidadEjecutoraService } from "@/modules/organization/services/unidadEjecutora.service";

export const matrizPeiColumns: ColumnConfig<MatrizPei>[] = [
  {
    key: "pei",
    header: "PEI",
    className: "text-center w-32",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">
          {item.pei?.anioIni} - {item.pei?.anioFin}
        </span>
        <span className="text-xs font-semibold text-blue-600">
          Año Base: {item.anioBase}
        </span>
      </div>
    ),
  },
  {
    key: "objetivoEstrategico",
    header: "Objetivo Estratégico",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">
          OE-{item.objetivoEstrategico?.idOe}
        </span>
        <div className="text-sm text-gray-700 line-clamp-2">
          {item.objetivoEstrategico?.description ?? "-"}
        </div>
        {item.objetivoEstrategico?.politicaDesarrollo?.areaEstrategica && (
          <span className="text-xs text-gray-500">
            Área:{" "}
            {
              item.objetivoEstrategico.politicaDesarrollo.areaEstrategica
                .description
            }
          </span>
        )}
      </div>
    ),
  },
  {
    key: "productoInstitucional",
    header: "Producto Institucional",
    className: "text-left w-44",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">
          PI-{item.productoInstitucional?.idPi}
        </span>
        <div className="text-sm text-gray-700">
          {item.productoInstitucional?.description ?? "-"}
        </div>
      </div>
    ),
  },
  {
    key: "accionEstrategica",
    header: "Acción Estratégica",
    className: "text-left w-40",
    render: (item) => (
      <div className="text-sm text-gray-700">
        {item.accionEstrategica?.description ?? "-"}
      </div>
    ),
  },
  {
    key: "indicadorPei",
    header: "Indicador PEI",
    className: "text-left w-44",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-900">
          {item.indicadorPei?.description ?? "-"}
        </div>
        {item.indicadorPei?.formula && (
          <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
            {item.indicadorPei.formula}
          </code>
        )}
        {item.indicadorPei?.unidadMedida && (
          <span className="text-xs text-gray-500">
            {item.indicadorPei.unidadMedida}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "metaMedianoPlazo",
    header: "Meta Mediano Plazo",
    className: "text-center w-32",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold text-blue-600">
          {item.metaMedianoPlazo}
        </span>
        {item.indicadorPei?.meta && (
          <span className="text-xs text-gray-500">
            Meta: {item.indicadorPei.meta}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "unidadEjecutora",
    header: "Unidad Ejecutora",
    className: "text-left w-40",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-900">
          {item.unidadEjecutora?.description ?? "-"}
        </span>
        {item.unidadEjecutora?.direccionAdministrativa?.entidad && (
          <span className="text-xs text-gray-500">
            {item.unidadEjecutora.direccionAdministrativa.entidad.sigla}
          </span>
        )}
        {item.unidadEjecutora?.techoPres && (
          <span className="text-xs text-green-600 font-semibold">
            {new Intl.NumberFormat("es-BO", {
              style: "currency",
              currency: "BOB",
            }).format(item.unidadEjecutora.techoPres)}
          </span>
        )}
      </div>
    ),
  },
];

export const matrizPeiFormFields: FieldConfig<any>[] = [
  {
    key: "anioBase",
    label: "Año Base",
    type: "number",
    required: true,
    min: 2000,
    max: 2100,
    placeholder: "Año base de la matriz",
  },
  {
    key: "metaMedianoPlazo",
    label: "Meta Mediano Plazo",
    type: "number",
    required: true,
    min: 0,
    placeholder: "Meta a mediano plazo",
  },
  {
    key: "peiId",
    label: "PEI",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar PEI...",

    searchFn: async ({ search, limit, offset }) => {
      return PeiService.listAll({ limit, offset });
    },

    mapToOption: (pei) => ({
      value: pei.id,
      label: `PEI ${pei.anioIni}-${pei.anioFin} (Meta: ${pei.metaTotal})`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `PEI #${id}`;
        }
        const pei = await PeiService.getById(numericId);
        return `PEI ${pei.anioIni}-${pei.anioFin}`;
      } catch (error) {
        return `PEI #${id}`;
      }
    },
  },
  {
    key: "objetivoEstrategicoId",
    label: "Objetivo Estratégico",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar objetivo...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ObjetivoEstrategicoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ObjetivoEstrategicoService.listAll(limit, offset);
    },

    mapToOption: (objetivo) => ({
      value: objetivo.id,
      label: `OE-${objetivo.idOe}: ${objetivo.description}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `Objetivo #${id}`;
        }
        const objetivo = await ObjetivoEstrategicoService.getById(numericId);
        return `OE-${objetivo.idOe}: ${objetivo.description}`;
      } catch (error) {
        return `Objetivo #${id}`;
      }
    },
  },
  {
    key: "productoInstitucionalId",
    label: "Producto Institucional",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar producto...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ProductoInstitucionalService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ProductoInstitucionalService.listAll(limit, offset);
    },

    mapToOption: (producto) => ({
      value: producto.id,
      label: `PI-${producto.idPi}: ${producto.description}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `Producto #${id}`;
        }
        const producto = await ProductoInstitucionalService.getById(numericId);
        return `PI-${producto.idPi}: ${producto.description}`;
      } catch (error) {
        return `Producto #${id}`;
      }
    },
  },
  {
    key: "accionEstrategicaId",
    label: "Acción Estratégica",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar acción...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return AccionEstrategicaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return AccionEstrategicaService.listAll(limit, offset);
    },

    mapToOption: (accion) => ({
      value: accion.id,
      label: accion.description,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `Acción #${id}`;
        }
        const accion = await AccionEstrategicaService.getById(numericId);
        return accion.description;
      } catch (error) {
        return `Acción #${id}`;
      }
    },
  },
  {
    key: "indicadorPeiId",
    label: "Indicador PEI",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar indicador...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return IndicadorPeiService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return IndicadorPeiService.listAll(limit, offset);
    },

    mapToOption: (indicador) => ({
      value: indicador.id,
      label: `${indicador.description} (${indicador.formula})`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `Indicador #${id}`;
        }
        const indicador = await IndicadorPeiService.getById(numericId);
        return `${indicador.description} (${indicador.formula})`;
      } catch (error) {
        return `Indicador #${id}`;
      }
    },
  },
  {
    key: "unidadEjecutoraId",
    label: "Unidad Ejecutora",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Seleccionar unidad ejecutora...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return UnidadEjecutoraService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return UnidadEjecutoraService.listAll(limit, offset);
    },

    mapToOption: (unidad) => ({
      value: unidad.id,
      label: unidad.description,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId) || numericId <= 0) {
          return `Unidad #${id}`;
        }
        const unidad = await UnidadEjecutoraService.getById(numericId);
        return unidad.description;
      } catch (error) {
        return `Unidad #${id}`;
      }
    },
  },
];
