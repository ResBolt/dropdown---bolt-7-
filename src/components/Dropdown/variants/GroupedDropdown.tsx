import React from 'react';
import { BaseDropdown } from './BaseDropdown';
import type { DropdownOption } from '../types';

interface GroupedOption extends DropdownOption {
  group: string;
}

interface GroupedDropdownProps {
  options: GroupedOption[];
  value?: GroupedOption | null;
  onChange: (option: GroupedOption) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const GroupedDropdown: React.FC<GroupedDropdownProps> = (props) => {
  const groupedOptions = props.options.reduce((acc, option) => {
    const group = option.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, GroupedOption[]>);

  return (
    <BaseDropdown
      {...props}
      variant="grouped"
      groupedOptions={groupedOptions}
    />
  );
};