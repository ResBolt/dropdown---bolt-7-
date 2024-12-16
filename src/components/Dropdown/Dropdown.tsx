import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from './icons';
import type { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
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

  const handleSelect = (option: typeof options[0]) => {
    onChange(option);
    setIsOpen(false);
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
          {value ? value.label : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.id}
                className={`
                  px-4 py-2 cursor-pointer
                  ${value?.id === option.id ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  hover:bg-blue-50 hover:text-blue-700
                  transition-colors duration-150 ease-in-out
                `}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};