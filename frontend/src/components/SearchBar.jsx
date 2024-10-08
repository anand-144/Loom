import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    // Pass ShopContext into useContext to access the values from context
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible,setVisible] =useState(false)
    const location = useLocation();

    useEffect(()=>{
       if (location.pathname.includes('collection')){
            setVisible(true);
       }
       else{
        setVisible(false)
       }
    },[location])

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder='Search' 
                    className='flex-1 outline-none bg-inherit text-sm'
                />
                <FiSearch className="w-5 h-5 cursor-pointer" />
            </div>
            <AiOutlineClose className='inline w-5 h-5 cursor-pointer' onClick={() => setShowSearch(false)} />
        </div>
    ) : null;
}

export default SearchBar;
