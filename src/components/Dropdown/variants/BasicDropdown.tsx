import React from 'react';
import { BaseDropdown } from './BaseDropdown';
import type { DropdownProps } from '../types';

export const BasicDropdown: React.FC<DropdownProps> = (props) => {
  return <BaseDropdown {...props} variant="basic" />;
};