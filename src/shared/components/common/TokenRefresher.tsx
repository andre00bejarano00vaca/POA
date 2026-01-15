"use client";

import { useEffect } from "react";
import { refreshTokenIfNeeded } from "@/shared/lib/auth.service";

/**
 * Componente que refresca el token automáticamente cada 5 minutos
 */
export function TokenRefresher() {
  useEffect(() => {
    // Verificar inmediatamente
    refreshTokenIfNeeded();

    // Configurar intervalo para verificar cada 5 minutos
    const interval = setInterval(() => {
      refreshTokenIfNeeded();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  return null; // Este componente no renderiza nada
}
