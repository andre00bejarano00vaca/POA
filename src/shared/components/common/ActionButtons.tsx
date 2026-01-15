// src/components/common/ActionButtons.tsx
"use client";

import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ActionButtonsProps<T> {
  item: T;
  enableEdit?: boolean;
  enableDelete?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export default function ActionButtons<T>({ 
  item, 
  enableEdit = false, 
  enableDelete = false,
  onEdit,
  onDelete 
}: ActionButtonsProps<T>) {
  
  if (!enableEdit && !enableDelete) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2">
      {enableEdit && onEdit && (
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
          title="Editar"
          aria-label="Editar registro"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      )}
      
      {enableDelete && onDelete && (
        <button
          onClick={() => onDelete(item)}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
          title="Eliminar"
          aria-label="Eliminar registro"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}