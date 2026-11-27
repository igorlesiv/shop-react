import type { Product } from '../types';

type Props = {
  product: Product;
  categoryName: string;
  onAdd: (product: Product) => void;
};

const priceFormatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });

export function ProductCard({ product, categoryName, onAdd }: Props) {
  return (
    <article className="product-card">
      <span className="product-category">{categoryName}</span>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>

      <div className="product-meta">
        <span className="product-price">{priceFormatter.format(product.price)}</span>
        <span className="product-stock">{product.stock} in stock</span>
      </div>

      <button className="add-button" onClick={() => onAdd(product)}>
        Add to cart
      </button>
    </article>
  );
}
