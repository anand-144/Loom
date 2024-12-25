import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

      try {

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('subCategory', subCategory)
        formData.append('bestseller', bestseller)
        formData.append('sizes', JSON.stringify(sizes))

        image1 && formData.append("image1", image1) 
        image2 && formData.append("image2", image2) 
        image3 && formData.append("image3", image3) 
        image4 && formData.append("image4", image4)
        
        const response = await axios.post(backendUrl + '/api/product/add/' ,formData,{headers:{token}});

        if (response.data.success) {
          toast.success('🎉 Product Added Successfully!')
          setName('')
          setDescription('')
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
          setPrice('')
        }else{
          toast.error('😣' + response.data.message)
        }

        console.log(response.data);
        
      } catch (error) {
        console.log(error.message);
      }

  }


  return (
    <form onSubmit={onSubmitHandler} className="p-4 space-y-6">
      {/* Upload Images Section */}
      <div>
        <p className="mb-4 text-lg font-semibold sm:text-left">Upload Images</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Image 1 */}
          <label
            htmlFor="image1"
            className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
          >
            {image1 ? (
              <img
                src={URL.createObjectURL(image1)}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <MdOutlineFileUpload className="w-10 h-10 text-gray-500" />
            )}
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          {/* Image 2 */}
          <label
            htmlFor="image2"
            className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
          >
            {image2 ? (
              <img
                src={URL.createObjectURL(image2)}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <MdOutlineFileUpload className="w-10 h-10 text-gray-500" />
            )}
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          {/* Image 3 */}
          <label
            htmlFor="image3"
            className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
          >
            {image3 ? (
              <img
                src={URL.createObjectURL(image3)}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <MdOutlineFileUpload className="w-10 h-10 text-gray-500" />
            )}
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          {/* Image 4 */}
          <label
            htmlFor="image4"
            className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
          >
            {image4 ? (
              <img
                src={URL.createObjectURL(image4)}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <MdOutlineFileUpload className="w-10 h-10 text-gray-500" />
            )}
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
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
          onChange={(e) => setName(e.target.value)}
          value={name}
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
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setSubCategory(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>

        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>

      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' onChange={() => setBestseller(prev => !prev)} checked={bestseller}/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='text-lg w-28 py-3 mt-4 bg-white text-gray-700 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c586a5] hover:bg-slate-400 hover:text-white'>Add</button>


    </form>
  );
};

export default Add;
