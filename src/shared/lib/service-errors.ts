// src/shared/lib/service-errors.ts

/**
 * Helper genérico para manejar errores en services
 * Centraliza el logging y lanzamiento de errores
 *
 * @param serviceName - Nombre del servicio (ej: "PeiService", "FuenteService")
 * @param operation - Nombre de la operación (ej: "listAll", "create")
 * @param error - El error capturado
 * @throws Error con el mensaje apropiado
 *
 * @example
 * try {
 *   const response = await fetchGraphQL(...);
 *   return response.data;
 * } catch (error) {
 *   return handleServiceError("FuenteService", "listAll", error);
 * }
 */
export const handleServiceError = (
  serviceName: string,
  operation: string,
  error: unknown
): never => {
  const message = error instanceof Error ? error.message : "Error desconocido";
  console.error(`Error en ${serviceName}.${operation}:`, message);
  throw new Error(message);
};

/**
 * Helper para crear un manejador de errores específico de un service
 * Evita repetir el nombre del service en cada llamada
 *
 * @param serviceName - Nombre del servicio
 * @returns Función manejadora de errores para ese service
 *
 * @example
 * const handleError = createServiceErrorHandler("FuenteService");
 *
 * try {
 *   // ...
 * } catch (error) {
 *   return handleError("listAll", error);
 * }
 */
export const createServiceErrorHandler = (serviceName: string) => {
  return (operation: string, error: unknown): never => {
    return handleServiceError(serviceName, operation, error);
  };
};
