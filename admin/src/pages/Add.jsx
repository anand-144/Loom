import React from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

const Add = () => {

  

  return (
    <form className="p-4 space-y-6">
      {/* Upload Images Section */}
      <div>
        <p className="mb-4 text-lg font-semibold text-center sm:text-left">Upload Image</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <label
              key={num}
              htmlFor={`image${num}`}
              className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
            >
              <MdOutlineFileUpload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
              <span className="mt-2 text-sm text-gray-500">{`Image ${num}`}</span>
              <input type="file" id={`image${num}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Product Name</p>
        <input
          className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Product Description</p>
        <textarea
          className="w-full sm:w-3/4 lg:w-1/2 px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
          placeholder="Write Cloth Description"
          required
          rows="5"
        ></textarea>
      </div>

      {/* Product Category and Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Product Category */}
        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Category</p>
          <select
            className="w-max px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* Product Subcategory */}
        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Subcategory</p>
          <select
            className="w-max px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            required
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        {/* Product Price */}
        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">Product Price</p>
          <input
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>

        <div className='flex gap-3'>
          <div className='flex gap-3'>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>S</p>
          </div>

          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>M</p>
          </div>

          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>L</p>
          </div>

          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XL</p>
          </div>

          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XXL</p>
          </div>
        </div>

      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='text-lg w-28 py-3 mt-4 bg-white text-gray-700 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5] hover:bg-slate-400 hover:text-white'>Add</button>


    </form>
  );
};

export default Add;
