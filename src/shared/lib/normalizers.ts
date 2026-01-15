// src/shared/lib/normalizers.ts

/**
 * Normaliza un campo de relación asegurando que siempre sea del tipo correcto
 * Si el campo es null/undefined, retorna null
 * Si el campo existe, lo retorna tal cual
 */
export function normalizeRelation<T>(relation: T | null | undefined): T | null {
  return relation ?? null;
}

/**
 * Normaliza un array de relaciones asegurando que siempre sea un array
 * Si el campo es null/undefined o no es un array, retorna array vacío
 * Si el campo existe y es un array, lo retorna tal cual
 */
export function normalizeRelationArray<T>(
  relation: T[] | null | undefined
): T[] {
  return Array.isArray(relation) ? relation : [];
}

/**
 * Normaliza una entidad completa aplicando normalización a todas sus relaciones
 *
 * @example
 * ```typescript
 * const normalized = normalizeEntity(rawData, {
 *   id: (v) => v,
 *   description: (v) => v,
 *   pei: normalizeRelation,
 *   areas: normalizeRelationArray,
 * });
 * ```
 */
export function normalizeEntity<TRaw, TResult>(
  raw: TRaw,
  schema: {
    [K in keyof TResult]: (value: any) => TResult[K];
  }
): TResult {
  const result = {} as TResult;

  for (const key in schema) {
    result[key] = schema[key]((raw as any)[key]);
  }

  return result;
}

/**
 * Helper simple para campos que se pasan directamente sin transformación
 */
export const passthrough = <T>(value: T): T => value;
