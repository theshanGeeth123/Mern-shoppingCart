import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products') // Change URL if needed
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Shopping Cart <span className="text-green-600">(Admin)</span>
        </h1>
        <Link
          to="/cart/new"
          className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add New Item
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-12">No items found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(({ _id, name, description, price, url }) => (
            <div
              key={_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {url ? (
                  <img
                    src={url}
                    alt={name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 italic">No Image</span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{name}</h2>
                <p className="text-gray-700 text-sm flex-grow">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">${price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/cart/edit/${_id}`)}
                      className="px-3 py-1 bg-yellow-400 text-black rounded-md shadow hover:bg-yellow-500 transition"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
