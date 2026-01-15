// src/hooks/presupuesto/useOrganismo.tsx
"use client";

import { useCrud } from "../../../shared/hooks/useCrud";
import { OrganismoService } from "@/modules/presupuesto/services/organismo.service";
import type {
  Organismo,
  CreateOrganismoInput,
  UpdateOrganismoInput,
} from "@/modules/presupuesto/types/organismo.types";

export const useOrganismo = () => {
  return useCrud<Organismo, CreateOrganismoInput, UpdateOrganismoInput>({
    listAll: OrganismoService.listAll,
    getById: OrganismoService.getById,
    create: OrganismoService.create,
    update: OrganismoService.update,
    delete: OrganismoService.delete,
  });
};
