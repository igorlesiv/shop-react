import { memo } from 'react';
import type { CartItem } from '../types';

type Props = {
  items: CartItem[];
  total: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
};

type RowProps = {
  item: CartItem;
  index: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
};

const CartRow = memo(function CartRow({ item, index, onQuantityChange, onRemove }: RowProps) {
  return (
    <li className="cart-item">
      <span className="cart-item-name">{item.product.name}</span>
      <input
        type="number"
        defaultValue={item.quantity}
        onChange={(event) => onQuantityChange(index, parseInt(event.target.value))}
      />
      <span className="cart-item-price">{item.product.price * item.quantity} zł</span>
      <button className="remove-button" onClick={() => onRemove(index)}>
        Remove
      </button>
    </li>
  );
});

export function Cart({ items, total, onQuantityChange, onRemove }: Props) {
  return (
    <div className="cart">
      <h2>Cart</h2>

      <ul className="cart-items">
        {items.map((item, index) => (
          <CartRow
            key={index}
            item={item}
            index={index}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </ul>

      <div className="cart-total">Total: {total.toFixed(2)} PLN</div>
    </div>
  );
}
