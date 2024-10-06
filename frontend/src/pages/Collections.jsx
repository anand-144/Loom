import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowDown } from "react-icons/io";
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Toggle Category Filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Toggle Subcategory Filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // Apply Filters
  const applyFilter = () => {
    let productsCopy = products.slice();


    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }


    setFilterProducts(productsCopy.length ? productsCopy : products);
  };


  useEffect(() => {
    setFilterProducts(products);
  }, [products]);


  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <IoIosArrowDown className={`h-3 sm:hidden ${showFilter ? 'rotate-180' : ''}`} />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block rounded-md border-2 border-black`}>
          <p className="mb-3 text-sm font-bold">Category</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory}/> Women
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block rounded-md border-2 border-black`}>
          <p className="mb-3 text-sm font-bold">Type</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">

        {/* Header and Sorting Option */}
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} className='font-open' />
          <select className="border-2 border-gray-300 text-sm px-2 cursor-pointer">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collections;
