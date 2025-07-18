import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')  // update if your backend URL is different
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter(product => product._id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart (Admin)</h1>
        <Link
          to="/cart/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add New Item
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No items found.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price ($)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, description, price }) => (
              <tr key={_id} className="border-b hover:bg-gray-50">
                <td className="p-3">{name}</td>
                <td className="p-3">{description}</td>
                <td className="p-3">{price.toFixed(2)}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={() => navigate(`/cart/edit/${_id}`)}
                    className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CartPage;
