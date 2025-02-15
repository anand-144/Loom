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

  const { setToken, navigate, backendUrl } = useContext(ShopContext);
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

    const endpoint =
      currentState === "Login" ? "/api/user/login" : "/api/user/register";

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
            const encryptedPassword = CryptoJS.AES.encrypt(
              password,
              "secret-key"
            ).toString();
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
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.removeItem("welcomeShown");
        } else {
          toast.success("SignUp successful!");
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
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
        const {
          identifier: savedIdentifier,
          password: encryptedPassword,
          rememberMe: savedRememberMe,
        } = JSON.parse(savedCredentials);
        setIdentifier(savedIdentifier || "");
        setPassword(
          encryptedPassword
            ? CryptoJS.AES.decrypt(encryptedPassword, "secret-key").toString(
                CryptoJS.enc.Utf8
              )
            : ""
        );
        setRememberMe(savedRememberMe || false);
      }
    } else {
      setIdentifier("");
      setPassword("");
      setRememberMe(false);
    }
  }, [currentState]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{currentState}</h1>
          <div className="flex justify-center">
            <div className="h-1 w-12 bg-black hover:bg-slate-900 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6 ">
          {currentState !== "Login" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition-all "
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              {currentState === "Login" ? "Email or Contact" : "Email"}
            </label>
            <input
              type={currentState === "Login" ? "text" : "email"}
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition-all "
              placeholder={
                currentState === "Login"
                  ? "Enter email or contact"
                  : "Enter email"
              }
              required
            />
          </div>

          {currentState === "SignUp" && (
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm  transition-all"
                placeholder="Enter 10-digit number"
                pattern="\d{10}"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition-all"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <IoMdEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </button>
            </div>
          </div>

          {currentState === "Login" && (
            <>
              {/* For larger screens (sm and up): Checkbox and forgot password in one row */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-gray-700 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium hover:text-gray-700">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* For mobile devices: Only show checkbox here */}
              <div className="sm:hidden">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-gray-700 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:text-gray-200 
              ${
                loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-700"
              } 
              focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : currentState === "Login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>

          {/* For mobile devices, display the forgot password link below the sign in button */}
          {currentState === "Login" && (
            <div className="sm:hidden text-center mt-4">
              <a href="#" className="text-sm font-medium hover:text-gray-700">
                Forgot password?
              </a>
            </div>
          )}
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "SignUp" : "Login")
            }
            className="text-sm font-medium hover:text-gray-700 transition-colors"
          >
            {currentState === "Login"
              ? "Create new account"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
