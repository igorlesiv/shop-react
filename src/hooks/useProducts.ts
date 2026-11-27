import { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../api';
import type { Category, Filters, ProductPage } from '../types';

export function useProducts(filters: Filters) {
  const [data, setData] = useState<ProductPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(filters).then((page) => {
      setData(page);
      setLoading(false);
    });
  }, [filters]);

  return { data, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return categories;
}
