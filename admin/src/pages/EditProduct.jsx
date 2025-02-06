import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';

const EditProduct = ({ product, onClose, onUpdate, token }) => {
    const [formData, setFormData] = useState({
        name: '',
        subDescription: '',
        description: '',
        material: '',
        care: '',
        price: '',
        category: '',
        subCategory: '',
        bestseller: false,
        sizes: []
    });

    // Example arrays for dropdown options
    const categories = ['Men', 'Women', 'Bestseller'];
    const subCategories = ['Shirt', 'T-Shirt', 'Polos', 'Sweatshirts', 'Jacket', '', 'Jeans', 'Trousers', 'Cargo', 'Joggers', 'TrackPant', 'Shorts'];

    // Define available sizes for topwear and bottomwear
    const topSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const bottomSizes = [28, 30, 32, 34, 36, 38, 40, 42, 44];

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                subDescription: product.subDescription || '',
                description: product.description || '',
                material: product.material || '',
                care: product.care || '',
                price: product.price || '',
                category: product.category || '',
                subCategory: product.subCategory || '',
                bestseller: product.bestseller || false,
                sizes: product.sizes || []
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // This function handles the checkbox changes for both top and bottom sizes.
    const handleSizeChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prev) => ({
            ...prev,
            sizes: isChecked
                ? [...prev.sizes, value]
                : prev.sizes.filter((size) => size !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${backendUrl}/api/product/update`,
                {
                    id: product,
                    ...formData,
                    price: Number(formData.price)
                },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Product updated successfully!');
                onUpdate();
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <MdClose className="text-2xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                {/* Category as a select dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subcategory as a select dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subcategory
                                    </label>
                                    <select
                                        name="subCategory"
                                        value={formData.subCategory}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select Subcategory</option>
                                        {subCategories.map((sub) => (
                                            <option key={sub} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Short Description
                                    </label>
                                    <textarea
                                        name="subDescription"
                                        value={formData.subDescription}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Care Instructions
                                    </label>
                                    <textarea
                                        name="care"
                                        value={formData.care}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sizes and Bestseller */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Topwear Sizes
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {topSizes.map((size) => (
                                        <label key={size} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={size}
                                                checked={formData.sizes.includes(size)}
                                                onChange={handleSizeChange}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Bottomwear Sizes
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {bottomSizes.map((size) => (
                                        <label key={size} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={size}
                                                checked={formData.sizes.includes(String(size)) || formData.sizes.includes(size)} 
                                                onChange={handleSizeChange}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="bestseller"
                                    checked={formData.bestseller}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Mark as Bestseller
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
