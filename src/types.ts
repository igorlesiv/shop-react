export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: string;
  stock: number;
  description: string;
};

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';

export type Filters = {
  search: string;
  category: string;
  sort: SortOption;
  page: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
