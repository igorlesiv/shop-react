import type { Category, Filters, ProductPage } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

export const PAGE_SIZE = 10;

async function get<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '') url.searchParams.set(key, String(value));
  });

  const response = await fetch(url);
  return response.json();
}

export const getCategories = () => get<Category[]>('/categories');

export const getProducts = (filters: Filters) =>
  get<ProductPage>('/products', { ...filters, pageSize: PAGE_SIZE });
