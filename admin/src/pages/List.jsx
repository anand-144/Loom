import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { MdCancel, MdEdit } from 'react-icons/md';
import EditProduct from './EditProduct';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [modalImages, setModalImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortOption, setSortOption] = useState('newest'); // New sort option state

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list/`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
      toast.error('Something went wrong');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove/',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      toast.error('Something went wrong');
    }
  };

  const handleImageClick = (images) => {
    setModalImages(images);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImages([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Compute a sorted version of the list based on the selected sort option
  const sortedList = [...list].sort((a, b) => {
    switch (sortOption) {
      case 'priceLowHigh':
        return a.price - b.price;
      case 'priceHighLow':
        return b.price - a.price;
      case 'newest':
        return b.date - a.date; // assuming date is a numeric timestamp
      case 'oldest':
        return a.date - b.date;
      case 'nameAZ':
        return a.name.localeCompare(b.name);
      case 'nameZA':
        return b.name.localeCompare(a.name);
      case 'stockLowHigh':
        return a.stock - b.stock;
      case 'stockHighLow':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">All Products List</h2>

      {/* Sort Option Dropdown */}
      <div className="mb-4 flex justify-end">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
          <option value="stockLowHigh">Stock: Low to High</option>
          <option value="stockHighLow">Stock: High to Low</option>
        </select>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr_1fr_auto] gap-4 items-center p-3 bg-gray-100 rounded-lg mb-4">
        <span className="text-sm font-semibold text-gray-500">Image</span>
        <span className="text-sm font-semibold text-gray-500">Name</span>
        <span className="text-sm font-semibold text-gray-500">Category</span>
        <span className="text-sm font-semibold text-gray-500">Stock</span>
        <span className="text-sm font-semibold text-gray-500">Subcategory</span>
        <span className="text-sm font-semibold text-gray-500">Price</span>
        <span className="text-sm font-semibold text-gray-500 text-center w-24">Actions</span>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {sortedList.length > 0 ? (
          sortedList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4"
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                    src={item.image?.[0] || '/placeholder.png'}
                    alt={item.name}
                    onClick={() => handleImageClick(item.image)}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                    <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                    <p className="text-sm text-gray-600">{item.subCategory}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {currency} {item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-green-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove"
                  >
                    <MdCancel className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr_1fr_auto] gap-4 items-center">
                <img
                  className="w-12 h-12 object-cover rounded-lg cursor-pointer"
                  src={item.image?.[0] || '/placeholder.png'}
                  alt={item.name}
                  onClick={() => handleImageClick(item.image)}
                />
                <span className="text-sm text-gray-900">{item.name}</span>
                <span className="text-sm text-gray-500">{item.category}</span>
                <span className="text-sm text-gray-500">Stock: {item.stock}</span>
                <span className="text-sm text-gray-500">{item.subCategory}</span>
                <span className="text-sm font-medium text-gray-900">
                  {currency} {item.price?.toFixed(2)}
                </span>
                <div className="flex items-center gap-2 w-24 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove"
                  >
                    <MdCancel className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600">No products available.</div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 w-full max-w-4xl">
            <div className="flex justify-end mb-4">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-700"
              >
                <MdCancel className="text-2xl" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-2">
              {modalImages.map((img, index) => (
                <img
                  key={index}
                  className="w-full aspect-square object-cover rounded-lg"
                  src={img}
                  alt={`Product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={handleCloseEdit}
          onUpdate={fetchList}
          token={token}
        />
      )}
    </div>
  );
};

export default List;
