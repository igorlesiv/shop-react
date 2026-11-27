import type { Category, Product, ProductPage } from '../types';
import { ProductCard } from './ProductCard';

type Props = {
  data: ProductPage | null;
  loading: boolean;
  categories: Category[];
  onAdd: (product: Product) => void;
};

export function ProductList({ data, loading, categories, onAdd }: Props) {
  if (loading) return <p className="status">Loading...</p>;
  if (!data) return null;
  if (data.items.length === 0) return <p className="status">No products found.</p>;

  const categoryName = (id: string) => categories.find((category) => category.id === id)?.name ?? id;

  return (
    <div className="product-grid">
      {data.items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryName={categoryName(product.categoryId)}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
