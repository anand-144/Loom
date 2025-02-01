import React, { useContext, useState, useEffect } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    if (currentState === "SignUp" && !/^\d{10}$/.test(contact)) {
      toast.error("Please enter a valid 10-digit contact number.");
      setLoading(false);
      return;
    }

    const payload = {
      ...(currentState === "SignUp" && { name, email: identifier, contact }),
      identifier,
      password,
    };

    const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        if (currentState === "Login") {
          if (rememberMe) {
            const encryptedPassword = CryptoJS.AES.encrypt(password, "secret-key").toString();
            localStorage.setItem(
              "loginCredentials",
              JSON.stringify({
                identifier,
                password: encryptedPassword,
                rememberMe: true,
              })
            );
          } else {
            localStorage.removeItem("loginCredentials");
          }
          
          // Show welcome message with user's name
          toast.success(`Welcome back, ${data.user.name}! 👋`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("SignUp successful !");
        }

        if (data.token) setToken(data.token);
        navigate("/");
      } else {
        toast.error(data.message || "An error occurred!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("An error occurred:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentState === "Login") {
      const savedCredentials = localStorage.getItem("loginCredentials");
      if (savedCredentials) {
        const { identifier: savedIdentifier, password: encryptedPassword, rememberMe: savedRememberMe } = JSON.parse(savedCredentials);
        setIdentifier(savedIdentifier || "");
        setPassword(encryptedPassword ? CryptoJS.AES.decrypt(encryptedPassword, "secret-key").toString(CryptoJS.enc.Utf8) : "");
        setRememberMe(savedRememberMe || false);
      }
    } else {
      setIdentifier("");
      setPassword("");
      setRememberMe(false);
    }
  }, [currentState]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <h1 className="text-3xl mb-2 mt-10">{currentState}</h1>
      <hr className="border-none h-[1.5px] w-8 bg-gray-800 mb-4" />

      {currentState !== "Login" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type={currentState === "Login" ? "text" : "email"}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder={currentState === "Login" ? "Email or Contact" : "Email"}
        required
      />

      {currentState === "SignUp" && (
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Contact Number"
          pattern="\d{10}"
          required
        />
      )}

      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        >
          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
        </button>
      </div>

      {currentState === "Login" && (
        <div className="flex items-center w-full mt-[-8px] text-sm">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="cursor-pointer font-medium">
            Remember Me
          </label>
        </div>
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p className="cursor-pointer font-medium">Forgot Your Password?</p>
        )}
        <p
          onClick={() => setCurrentState((prev) => (prev === "Login" ? "SignUp" : "Login"))}
          className="cursor-pointer font-medium"
        >
          {currentState === "Login" ? "Create Account" : "Login Here"}
        </p>
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4" disabled={loading}>
        {loading ? "Processing..." : currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;