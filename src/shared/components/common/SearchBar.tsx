// src/components/common/SearchBar.tsx
"use client";

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar...",
  className = ""
}: SearchBarProps) {
  return (
    <div className={`flex gap-4 mb-8 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 flex-1 shadow-sm transition duration-150"
      />
    </div>
  );
}