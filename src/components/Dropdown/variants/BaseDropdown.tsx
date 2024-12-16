import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import type { DropdownProps, DropdownOption } from '../types';

interface BaseDropdownProps extends DropdownProps {
  variant: 'basic' | 'searchable' | 'multi' | 'grouped';
  searchProps?: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
  };
  selectedValues?: DropdownOption[];
  groupedOptions?: Record<string, DropdownOption[]>;
}

export const BaseDropdown: React.FC<BaseDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  variant,
  searchProps,
  selectedValues,
  groupedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const renderOptions = () => {
    if (variant === 'grouped' && groupedOptions) {
      return Object.entries(groupedOptions).map(([group, groupOptions]) => (
        <div key={group}>
          <div className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-50">
            {group}
          </div>
          {groupOptions.map(renderOption)}
        </div>
      ));
    }

    return options.map(renderOption);
  };

  const renderOption = (option: DropdownOption) => {
    const isSelected = variant === 'multi'
      ? selectedValues?.some(item => item.id === option.id)
      : value?.id === option.id;

    return (
      <li
        key={option.id}
        className={`
          px-4 py-2 cursor-pointer flex items-center justify-between
          ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
          hover:bg-blue-50 hover:text-blue-700
          transition-colors duration-150 ease-in-out
        `}
        onClick={() => {
          onChange(option);
          if (variant !== 'multi') setIsOpen(false);
        }}
      >
        <span>{option.label}</span>
        {isSelected && variant === 'multi' && (
          <Check className="w-4 h-4" />
        )}
      </li>
    );
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className={`
          w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm
          flex items-center justify-between
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-500 cursor-pointer'}
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
          transition-all duration-200 ease-in-out
        `}
        disabled={disabled}
      >
        <span className={`block truncate ${!value ? 'text-gray-500' : 'text-gray-900'}`}>
          {variant === 'multi'
            ? selectedValues?.length
              ? `${selectedValues.length} selected`
              : placeholder
            : value?.label || placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {variant === 'searchable' && searchProps && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {searchProps.icon}
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchProps.value}
                  onChange={searchProps.onChange}
                  placeholder={searchProps.placeholder}
                />
              </div>
            </div>
          )}
          <ul className="py-1 max-h-60 overflow-auto">
            {renderOptions()}
          </ul>
        </div>
      )}
    </div>
  );
};