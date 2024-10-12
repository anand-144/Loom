import React, { useState } from 'react';

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Simulating a subscription action
        if (email) {
            setSuccess(true);
            setMessage('Thank you for subscribing!');
            setEmail(''); // Clear the email input
        } else {
            setSuccess(false);
            setMessage('Please enter a valid email address.');
        }
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
                    className='w-full sm:flex-1 outline-none p-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <button 
                    type='submit' 
                    className='bg-black text-white text-sm px-10 py-4 hover:bg-slate-900 transition'
                >
                    SUBSCRIBE
                </button>
            </form>
            {message && (
                <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default NewsLetterBox;
