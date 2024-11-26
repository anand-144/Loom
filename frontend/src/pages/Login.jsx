import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [currentState, setCurrentState] = useState("SignUp");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(""); // For email/contact
  const [contact, setContact] = useState(""); // Contact field for SignUp
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Updated onSubmitHandler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Basic validation for contact number (e.g., ensuring it's a 10-digit number)
    if (currentState !== "Login" && !/^\d{10}$/.test(contact)) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }

    const body = JSON.stringify(
      currentState === "Login"
        ? { identifier, password } // Login uses identifier (email or contact)
        : { name, email: identifier, contact, password } // SignUp uses separate fields
    );

    const endpoint =
      currentState === "Login" ? "/api/user/login" : "/api/user/register";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Operation successful", data.user);
    } else {
      console.error(data.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler} // Attach the onSubmitHandler to the form
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

      {/* Email/Contact for Login or Email for SignUp */}
      <input
        type={currentState === "Login" ? "text" : "email"}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder={currentState === "Login" ? "Email or Contact" : "Email"}
        required
      />

   {/* Contact for SignUp Only */}
{currentState !== "Login" && (
  <input
    type="number"
    value={contact}
    onChange={(e) => setContact(e.target.value)}
    className="w-full px-3 py-2 border border-gray-800 custom-number-input"
    placeholder="Contact Number"
    pattern="\d*" // Ensures only digits are accepted
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

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p className="cursor-pointer font-medium">Forgot Your Password?</p>
        )}
        <p
          onClick={() =>
            setCurrentState((prev) =>
              prev === "Login" ? "SignUp" : "Login"
            )
          }
          className="cursor-pointer font-medium"
        >
          {currentState === "Login" ? "Create Account" : "Login Here"}
        </p>
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
