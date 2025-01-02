import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subDescription, setSubDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [care, setCare] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error('Please select at least one size.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('subDescription', subDescription);
      formData.append('material', material);
      formData.append('care', care);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add/', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success('🎉 Product Added Successfully!');
        setName('');
        setDescription('');
        setSubDescription('');
        setMaterial('');
        setCare('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
         toast.error('😣' + response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-4 space-y-6">
      <div>
        <p className="mb-4 text-lg font-semibold sm:text-left">Upload Images</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[image1, image2, image3, image4].map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className="flex flex-col items-center justify-center w-full h-60 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <MdOutlineFileUpload className="w-10 h-10 text-gray-500" />
              )}
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const setImage = [setImage1, setImage2, setImage3, setImage4][index];
                  setImage(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Product Name</p>
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
  {/* Product Description */}
  <div className="w-full lg:w-1/2">
    <p className="mb-2 text-lg font-medium text-gray-700">Product Description</p>
    <textarea
      className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
      placeholder="Write Cloth Description"
      required
      rows="5"
      onChange={(e) => setDescription(e.target.value)}
      value={description}
    ></textarea>
  </div>

  {/* Product Details */}
  <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
    <p className="mb-2 text-lg font-medium text-gray-700">Product Details</p>
    <input
   className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
   type="text"
   placeholder="Type here"
   required
   onChange={(e) => setSubDescription(e.target.value)}
   value={subDescription}
    ></input>

<p className="mt-4 mb-2 text-lg font-medium text-gray-700">Product material</p>
    <input
      className="w-full lg:w-auto max-w-md px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
      type="text"
      placeholder="Type here"
      required
      onChange={(e) => setMaterial(e.target.value)}
      value={material}
    />
  </div>

  {/* Product Care */}
  <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
    <p className="mb-2 text-lg font-medium text-gray-700">
      Product Care { "(Washing Type)" }
    </p>
    <input
      className="w-full lg:w-auto max-w-md px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
      type="text"
      placeholder="Type here"
      required
      onChange={(e) => setCare(e.target.value)}
      value={care}
    />
  </div>
</div>


     
     

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Category</p>
          <select
            className="w-max px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Subcategory</p>
          <select
            className="w-max px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            required
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Price</p>
          <input
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            type="number"
            placeholder="25"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="text-lg w-28 py-3 mt-4 bg-white text-gray-700 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5] hover:bg-slate-400 hover:text-white"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
