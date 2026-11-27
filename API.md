# Shop API

Base URL: the value of `VITE_API_URL` in `.env`. CORS is open, so you can call it
directly from the browser.

The API runs behind the same gateway as our shared dev environment.

## Data model

```ts
type Category = {
  id: string;          // e.g. "electronics"
  name: string;        // e.g. "Electronics"
};

type Product = {
  id: number;
  name: string;
  price: number;       // PLN, e.g. 79.99
  categoryId: string;  // Category.id
  stock: number;       // items available, 0 = sold out
  description: string;
};

type ProductPage = {
  items: Product[];    // products on the requested page
  total: number;       // number of ALL products matching the filters
  page: number;
  pageSize: number;
};

type ApiError = {
  error: string;       // machine-readable code, see below
  message?: string;    // human-readable description
};
```

## Endpoints

### `GET /categories`

Returns `Category[]`.

### `GET /products`

Returns a `ProductPage`. Filtering, sorting and pagination are done by the server.

| Query param | Values | Default |
|-------------|--------|---------|
| `search`    | text contained in the product name, case-insensitive | none |
| `category`  | a `Category.id` | all categories |
| `sort`      | `name_asc`, `name_desc`, `price_asc`, `price_desc` | `name_asc` |
| `page`      | positive integer, starts at `1` | `1` |
| `pageSize`  | `10`, `20` or `50` | `10` |

Empty parameters (e.g. `search=`) are treated as not provided.

Example:

```
GET /products?search=code&category=books&sort=price_asc&page=1&pageSize=10
```

```json
{
  "items": [
    { "id": 2, "name": "Clean Code", "price": 89.99, "categoryId": "books", "stock": 1, "description": "A handbook of agile software craftsmanship." },
    { "id": 37, "name": "Working Effectively with Legacy Code", "price": 129, "categoryId": "books", "stock": 0, "description": "Techniques for safely changing code without tests." },
    { "id": 67, "name": "Code Complete", "price": 149, "categoryId": "books", "stock": 20, "description": "A practical handbook of software construction." }
  ],
  "total": 3,
  "page": 1,
  "pageSize": 10
}
```

A page beyond the last one is not an error: it returns `items: []` together with
the real `total`.

Errors:

- `400 INVALID_PARAMS`: unknown `category` or `sort`, `page` that is not a positive
  integer, or `pageSize` outside the allowed values.

### `GET /products/:id`

Returns a single `Product`.

Errors:

- `404 NOT_FOUND`: the product does not exist.

## Simulating a server error

Add `fail=1` to any request to get `500 INTERNAL_ERROR`, e.g.
`GET /products?fail=1`.
