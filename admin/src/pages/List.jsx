import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [modalImages, setModalImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list/`);
      if (response.data.success) {
        setList(response.data.products);
        console.log(response.data);
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

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Subcategory</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Table Data */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              className="grid md:grid-cols-[1fr_3fr_1fr_2fr_1fr_1fr] grid-cols-1 gap-2 py-1 px-2 border text-sm rounded-lg"
              key={item._id || index}
            >
              {/* Image */}
              <img
                className="w-12 h-12 object-cover rounded-md cursor-pointer"
                src={item.image?.[0] || '/placeholder.png'}
                alt={item.name || 'Product'}
                onClick={() => handleImageClick(item.image)}
              />

              {/* Name */}
              <p className="truncate">{item.name || 'No Name'}</p>

              {/* Category */}
              <p>{item.category || 'No Category'}</p>

              {/* Subcategory */}
              <p
                className="md:block hidden"
                title={item.subCategory || 'N/A'}
              >
                {item.subCategory || 'N/A'}
              </p>

              {/* Mobile Tooltip */}
              <p className="md:hidden truncate" title={item.subCategory || 'N/A'}>
                {item.subCategory || 'N/A'}
              </p>

              {/* Price */}
              <p>
                {currency} {item.price?.toFixed(2) || '0.00'}
              </p>

              {/* Action */}
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-600 flex justify-center items-center cursor-pointer text-xl"
                aria-label="Cancel"
                title="Cancel"
              >
                <MdCancel />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>

      {/* Modal for Images */}
      {showModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
       <div className="bg-white rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
         <button
           className="ml-auto mb-2 text-gray-500 hover:text-gray-800"
           onClick={closeModal}
         >
           <MdCancel className="text-2xl" />
         </button>
         <div className="flex flex-wrap gap-2 overflow-auto">
           {modalImages.map((img, index) => (
             <img
               key={index}
               className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-md"
               src={img}
               alt={`Product ${index + 1}`}
             />
           ))}
         </div>
       </div>
     </div>
     
      )}
    </>
  );
};

export default List;
