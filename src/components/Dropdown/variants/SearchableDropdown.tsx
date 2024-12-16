import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { BaseDropdown } from './BaseDropdown';
import type { DropdownProps } from '../types';

interface SearchableDropdownProps extends DropdownProps {
  searchPlaceholder?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  searchPlaceholder = 'Search...',
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <BaseDropdown
      {...props}
      options={filteredOptions}
      variant="searchable"
      searchProps={{
        value: searchTerm,
        onChange: handleSearch,
        placeholder: searchPlaceholder,
        icon: <Search className="w-4 h-4 text-gray-400" />,
      }}
    />
  );
};