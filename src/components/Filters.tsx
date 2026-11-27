import type { Category, Filters as FiltersState, SortOption } from '../types';

type Props = {
  filters: FiltersState;
  categories: Category[];
  onChange: (changes: Partial<FiltersState>) => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'price_asc', label: 'Price (low to high)' },
  { value: 'price_desc', label: 'Price (high to low)' },
];

export function Filters({ filters, categories, onChange }: Props) {
  return (
    <div className="filters">
      <input
        className="search"
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
      />

      <select value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(event) => onChange({ sort: event.target.value as SortOption })}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
