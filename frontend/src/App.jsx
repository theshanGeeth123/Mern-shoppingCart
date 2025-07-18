import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import Nav from './pages/Nav';
import Home from './pages/Home';


function App() {
  return (
    
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminCart" element={<CartPage />} />
        <Route path="/cart/new" element={<AddItemPage />} />
        <Route path="/cart/edit/:id" element={<EditItemPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
