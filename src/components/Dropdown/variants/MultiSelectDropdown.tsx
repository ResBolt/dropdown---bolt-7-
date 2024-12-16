import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BaseDropdown } from './BaseDropdown';
import type { DropdownOption } from '../types';

interface MultiSelectDropdownProps {
  options: DropdownOption[];
  selectedValues: DropdownOption[];
  onChange: (options: DropdownOption[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedValues,
  onChange,
  ...props
}) => {
  const handleSelect = (option: DropdownOption) => {
    const isSelected = selectedValues.some((item) => item.id === option.id);
    const newSelection = isSelected
      ? selectedValues.filter((item) => item.id !== option.id)
      : [...selectedValues, option];
    onChange(newSelection);
  };

  const removeOption = (optionId: string | number) => {
    onChange(selectedValues.filter((item) => item.id !== optionId));
  };

  return (
    <div className="space-y-2">
      <BaseDropdown
        {...props}
        variant="multi"
        value={null}
        onChange={(option) => handleSelect(option)}
        selectedValues={selectedValues}
      />
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((option) => (
            <span
              key={option.id}
              className="inline-flex items-center px-2.5 py-1.5 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {option.label}
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="ml-1.5 hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};