import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Admin Dashboard</h1>
      <Link
        to="/cart"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Shopping Cart
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/new" element={<AddItemPage />} />
        <Route path="/cart/edit/:id" element={<EditItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
