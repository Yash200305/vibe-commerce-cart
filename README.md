Vibe Commerce – Mock E‑Com Cart
A full‑stack shopping cart app demonstrating products, cart management, and a mock checkout flow. Built with React (Vite), Node/Express, and MongoDB.​

Features
Products grid with add‑to‑cart, details, and responsive layout.​

Cart view with quantity update, remove, and live totals.​

Checkout form with name/email validation and receipt modal.​

MongoDB persistence for active cart and orders.​

Error handling with toast notifications and API feedback.​

Tech Stack
Frontend: React 18, Vite, React Router, Axios, React‑Toastify.​

Backend: Node.js, Express.js, Mongoose, CORS, dotenv.​

Database: MongoDB (local Community Server or Atlas).​

Monorepo Structure

vibe-commerce-cart/
├─ backend/           # Express API + MongoDB
│  ├─ models/         # Product, Cart, Order
│  ├─ routes/         # products, cart, checkout
│  └─ server.js
├─ frontend/          # Vite + React app
│  ├─ src/
│  │  ├─ context/     # CartContext.jsx
│  │  ├─ pages/       # ProductsPage.jsx, CartPage.jsx
│  │  └─ components/  # ProductCard, CartItem, CheckoutForm, CheckoutModal
│  └─ index.html
└─ README.md

Getting Started
Prerequisites
Node.js 18+ and npm installed.​

MongoDB running locally or an Atlas connection string.​

Optional: Thunder Client in VS Code for quick API testing.

1) Backend Setup

cd backend
npm install
# backend/.env
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/ecommerce-cart
# NODE_ENV=development
# FRONTEND_URL=http://localhost:5173
npm start
API runs at http://localhost:5000

2) Frontend Setup

cd ../frontend
npm install
# frontend/.env
# VITE_API_URL=http://localhost:5000
npm run dev
App runs at http://localhost:5173.​

API Endpoints
Base URL: http://localhost:5000

Products

GET /api/products → Returns 5–10 mock products; seeds on first request.​

GET /api/products/:id → Returns a single product.​

Cart

GET /api/cart → Returns active cart with items, subtotal, total.​

POST /api/cart → Add item: { "productId": "<id>", "qty": 1 }.​

DELETE /api/cart/:id → Remove cart item by its _id.​

Checkout

POST /api/checkout → { "name": "John", "email": "john@example.com", "cartItems": [...] } → receipt.​

curl Samples

# Products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST -H "Content-Type: application/json" \
  --data "{\"productId\":\"<id>\",\"qty\":1}" \
  http://localhost:5000/api/cart

# Remove from cart
curl -X DELETE http://localhost:5000/api/cart/<cartItemId>

# Checkout
curl -X POST -H "Content-Type: application/json" \
  --data "{\"name\":\"John\",\"email\":\"john@example.com\",\"cartItems\":[{\"productId\":\"<id>\",\"name\":\"Sample\",\"price\":99.99,\"quantity\":1}]}" \
  http://localhost:5000/api/checkout

Environment Variables
backend/.env

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce-cart
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

frontend/.env

VITE_API_URL=http://localhost:5000

Vite exposes only variables prefixed with VITE_. Restart dev server after editing .env.​

Frontend Notes
CartContext centralizes API calls for cart and checkout.​

ProductsPage fetches /api/products and calls addToCart from context.​

CartPage renders items with update/remove wired to context.​

CheckoutForm validates inputs, posts to /api/checkout, and triggers a receipt modal.​

Add a single ToastContainer in App.jsx and import its CSS.​

Backend Notes
Express routers mounted at /api/products, /api/cart, /api/checkout.​

Global error handler added after routes; CORS enabled for dev origin.​

Mongoose models: Product, Cart (embedded items), Order.​

Screenshots
![Products](./screenshots/products.png)
![Cart](./screenshots/Cart.png)
![Checkout](./screenshots/Checkout.png)

Demo Video
Link (unlisted): https://youtu.be/ABTLWo6XXgY
Show: products → add to cart → update/remove → checkout → receipt.​

Scripts
backend/package.json
{
  "scripts": {
    "start": "node server.js"
  }
}
frontend/package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
Deployment
Backend

Deploy to a node host (Render/Heroku). Set MONGO_URI, NODE_ENV=production, FRONTEND_URL to your frontend origin.​

Frontend

Deploy with Vercel/Netlify. Set VITE_API_URL to your backend URL. Build produces /dist.​

.gitignore
At repo root:
node_modules/
dist/
dist-ssr/
build/
.env
.env.*
!.env.example
npm-debug.log*
yarn-*.log*
pnpm-debug.log*
.DS_Store
.vscode/*
!.vscode/extensions.json
.idea/

Roadmap
Auth (sign‑in, persistent user carts).​

Search, filters, categories.​

Order history and admin dashboard.​

Stripe/PayPal integration.​

Contributing
Issues and PRs are welcome. Please include a short test plan and use conventional commits.​

License
MIT.​

Acknowledgments
React, Vite, Express, MongoDB docs and communities.​

Thunder Client for API testing in VS Code.