import { useState } from 'react';
import { PAGE_SIZE } from './api';
import { Cart } from './components/Cart';
import { CartDrawer } from './components/CartDrawer';
import { Filters } from './components/Filters';
import { Pagination } from './components/Pagination';
import { ProductList } from './components/ProductList';
import { useCart } from './hooks/useCart';
import { useFilters } from './hooks/useFilters';
import { useCategories, useProducts } from './hooks/useProducts';
import './App.css';

function App() {
  const { filters, updateFilters } = useFilters();
  const { data, loading } = useProducts(filters);
  const categories = useCategories();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>Shop</h1>
        <button className="cart-link" onClick={() => setCartOpen(true)}>
          Cart ({cart.count})
        </button>
      </header>

      <main className="catalog">
        <Filters filters={filters} categories={categories} onChange={updateFilters} />
        <ProductList data={data} loading={loading} categories={categories} onAdd={cart.addItem} />
        {data && (
          <Pagination
            page={filters.page}
            total={data.total}
            pageSize={PAGE_SIZE}
            onChange={(page) => updateFilters({ page })}
          />
        )}
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          items={cart.items}
          total={cart.total}
          onQuantityChange={cart.updateQuantity}
          onRemove={cart.removeItem}
        />
      </CartDrawer>
    </div>
  );
}

export default App;
