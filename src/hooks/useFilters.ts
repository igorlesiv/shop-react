import { useEffect, useState } from 'react';
import type { Filters, SortOption } from '../types';

const DEFAULT_FILTERS: Filters = {
  search: '',
  category: '',
  sort: 'name_asc',
  page: 1,
};

function readFilters(): Filters {
  const params = new URLSearchParams(window.location.search);

  return {
    search: params.get('search') ?? DEFAULT_FILTERS.search,
    category: params.get('category') ?? DEFAULT_FILTERS.category,
    sort: (params.get('sort') as SortOption) ?? DEFAULT_FILTERS.sort,
    page: Number(params.get('page') ?? DEFAULT_FILTERS.page),
  };
}

function writeFilters(filters: Filters) {
  const query = (Object.keys(filters) as (keyof Filters)[])
    .filter((key) => filters[key] !== DEFAULT_FILTERS[key])
    .map((key) => `${key}=${filters[key]}`)
    .join('&');

  window.history.pushState(null, '', query ? `?${query}` : window.location.pathname);
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(readFilters);

  useEffect(() => {
    writeFilters(filters);
  }, [filters]);

  const updateFilters = (changes: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...changes }));
  };

  return { filters, updateFilters };
}
