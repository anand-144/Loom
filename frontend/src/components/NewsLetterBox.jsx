import React from 'react';

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className="text-center overflow-hidden">
            <p className='text-2xl font-medium text-gray-800'>
                Subscribe now & get 20% off
            </p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, numquam.  
            </p> 
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder='Enter Your Email' 
                    className='w-full sm:flex-1 outline-none' 
                    required 
                />
                <button type='submit' className='bg-black text-white text-sm px-10 py-4 hover:bg-slate-900'>
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
