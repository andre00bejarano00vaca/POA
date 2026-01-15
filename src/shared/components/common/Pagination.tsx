// src/components/common/Pagination.tsx
"use client";

import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
      {/* Información de registros */}
      <div className="text-sm text-gray-700">
        Mostrando <span className="font-semibold">{startItem}</span> a{' '}
        <span className="font-semibold">{endItem}</span> de{' '}
        <span className="font-semibold">{totalItems}</span> registros
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-4">
        {/* Selector de registros por página */}
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
            Mostrar:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 transition-colors"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg border transition-colors ${
              canGoPrevious
                ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Página anterior"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-700 min-w-[100px] text-center">
            Página <span className="font-semibold">{currentPage}</span> de{' '}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className={`p-2 rounded-lg border transition-colors ${
              canGoNext
                ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Página siguiente"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}