import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    url: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormData({
            name: data.data.name,
            description: data.data.description,
            price: data.data.price.toString(),
            url: data.data.url || '',
          });
        } else {
          alert('Failed to load product details');
          navigate('/adminCart');
        }
      })
      .catch(() => {
        alert('Error fetching product details');
        navigate('/adminCart');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, url } = formData;

    if (!name || !description || !price) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          url,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Product updated successfully');
        navigate('/adminCart'); // ✅ corrected from '/cart'
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            rows="3"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Price ($)</span>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Image URL</span>
          <input
            type="url"
            name="url"
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.url}
            onChange={handleChange}
          />
        </label>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/adminCart')}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditItemPage;
