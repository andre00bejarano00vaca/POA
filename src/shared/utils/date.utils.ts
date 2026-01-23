// src/shared/utils/date.utils.ts

/**
 * Convierte una fecha a formato YYYY-MM-DD
 * ✔ Compatible con GraphQL Date
 * ✔ Compatible con <input type="date">
 * ✔ Sin timezone, sin Z, sin cambio de día
 */
export const toGraphQLDate = (date: string | Date): string => {
  if (typeof date === "string") {
    // "2021-11-11" o "2021-11-11T00:00:00.000Z" → "2021-11-11"
    return date.split("T")[0];
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Convierte una fecha (ISO o YYYY-MM-DD) a formato YYYY-MM-DD
 * para inputs HTML type="date"
 */
export const toInputDate = (date: string): string => {
  return date.split("T")[0];
};

/**
 * Formatea una fecha para mostrar en la UI (ej: 15/01/2024)
 */
export const formatDateShort = (date: string | Date): string => {
  return new Intl.DateTimeFormat("es-ES").format(new Date(date));
};

/**
 * Formatea una fecha larga (ej: 15 de enero de 2024)
 */
export const formatDateLong = (date: string | Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

/**
 * Verifica si una fecha es válida
 */
export const isValidDate = (date: string | Date): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};
