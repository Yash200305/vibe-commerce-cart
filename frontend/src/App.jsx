import { Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <footer>© 2025 Vibe Commerce</footer>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
