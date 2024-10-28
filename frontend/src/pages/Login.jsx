import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== 'Login' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="First Name"
          required
        />
      )}

      {currentState !== 'Login' && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Last Name"
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {showPassword ? <IoMdEyeOff/> : <IoMdEye/>}
        </button>
      </div>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' && (
          <p className="cursor-pointer font-medium">Forgot Your Password?</p>
        )}

        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer font-medium">
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer font-medium">
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
