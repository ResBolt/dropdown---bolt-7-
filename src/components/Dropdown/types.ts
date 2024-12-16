export interface DropdownOption {
  id: string | number;
  label: string;
  value: string | number;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: DropdownOption | null;
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}