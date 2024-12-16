import React, { useState } from 'react';
import {
  BasicDropdown,
  SearchableDropdown,
  MultiSelectDropdown,
  GroupedDropdown,
  DropdownOption
} from './components/Dropdown';

const countries: DropdownOption[] = [
  { id: 1, label: 'United States', value: 'us' },
  { id: 2, label: 'United Kingdom', value: 'uk' },
  { id: 3, label: 'Canada', value: 'ca' },
  { id: 4, label: 'Australia', value: 'au' },
  { id: 5, label: 'Germany', value: 'de' },
  { id: 6, label: 'France', value: 'fr' },
  { id: 7, label: 'Japan', value: 'jp' },
  { id: 8, label: 'Brazil', value: 'br' },
];

const groupedCountries = [
  { id: 1, label: 'United States', value: 'us', group: 'North America' },
  { id: 2, label: 'Canada', value: 'ca', group: 'North America' },
  { id: 3, label: 'Mexico', value: 'mx', group: 'North America' },
  { id: 4, label: 'Brazil', value: 'br', group: 'South America' },
  { id: 5, label: 'Argentina', value: 'ar', group: 'South America' },
  { id: 6, label: 'United Kingdom', value: 'uk', group: 'Europe' },
  { id: 7, label: 'Germany', value: 'de', group: 'Europe' },
  { id: 8, label: 'France', value: 'fr', group: 'Europe' },
];

function App() {
  const [basicValue, setBasicValue] = useState<DropdownOption | null>(null);
  const [searchableValue, setSearchableValue] = useState<DropdownOption | null>(null);
  const [multiValue, setMultiValue] = useState<DropdownOption[]>([]);
  const [groupedValue, setGroupedValue] = useState<DropdownOption | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dropdown Components</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Basic Dropdown</h2>
              <BasicDropdown
                options={countries}
                value={basicValue}
                onChange={setBasicValue}
                placeholder="Select a country"
                className="max-w-md"
              />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Searchable Dropdown</h2>
              <SearchableDropdown
                options={countries}
                value={searchableValue}
                onChange={setSearchableValue}
                placeholder="Select a country"
                searchPlaceholder="Search countries..."
                className="max-w-md"
              />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Multi-Select Dropdown</h2>
              <MultiSelectDropdown
                options={countries}
                selectedValues={multiValue}
                onChange={setMultiValue}
                placeholder="Select countries"
                className="max-w-md"
              />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Grouped Dropdown</h2>
              <GroupedDropdown
                options={groupedCountries}
                value={groupedValue}
                onChange={setGroupedValue}
                placeholder="Select a country"
                className="max-w-md"
              />
            </section>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Features by Variant</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Basic Dropdown</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Simple selection</li>
                <li>Click outside to close</li>
                <li>Keyboard navigation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Searchable Dropdown</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Real-time filtering</li>
                <li>Search input with icon</li>
                <li>Case-insensitive search</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Multi-Select Dropdown</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Multiple selections</li>
                <li>Selection tags</li>
                <li>Individual item removal</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Grouped Dropdown</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Categorized options</li>
                <li>Group headers</li>
                <li>Visual separation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;