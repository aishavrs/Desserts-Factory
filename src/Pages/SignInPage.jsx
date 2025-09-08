import React, { useState, useContext } from 'react';
import image from '../assets/images/image-meringue-desktop.jpg';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { AuthContext } from '../Context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();

  // 1. Store form values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 2. Store errors
  const [error, setError] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} =  useContext(AuthContext)
  

  // 3. Handle input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError((prevError) => ({ ...prevError, [event.target.name]: "" }));
  };

  // 4. Validate form
  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 5. Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault(); // Stop the form from refreshing the page
  setLoading(true)
  if (!formData.email || !formData.password) {
    setSubmitError("Please enter both email and password");
    return;
  }

try {
  await login(formData.email, formData.password)
  navigate("/")
  toast.success("Log in successful!")
} catch (error) {
  setSubmitError(error.message || "Sign in failed!")
   toast.error("Sign in failed!")
}finally{
  setLoading(false)
}
};


  return (
    <div className="flex flex-col md:flex-row h-screen w-full px-4 py-5 md:px-0 md:py-0">
      <div className="flex flex-col justify-center gap-1 w-full md:w-1/2">
        <Link to="/" className="text-4xl md:ml-4 font-bold py-5 md:py-1 hover:text-red-900">
          Desserts
        </Link>
        <div className="flex flex-col gap-2 p-8">
          <h3 className="font-bold text-xl">Welcome Back</h3>
          <p className="text-xs text-gray-400 font-bold">Please enter your details</p>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-2 text-xs font-bold mb-1">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}

            <label htmlFor="password" className="mt-2 text-xs font-bold mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.password && <p className="text-red-500 text-xs">{error.password}</p>}

            <div className="flex justify-between items-center mt-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember for 30 days</label>
              </div>
              <a href="#" className="text-red-600 underline">
                Forgot Password?
              </a>
            </div>

            <button
  type="submit"
  disabled={loading} 
  className="bg-rose-300 text-white font-bold text-lg h-12 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Signing in..." : "Sign In"}
</button>

          </form>

          <button className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-4 mt-4 text-sm rounded-sm w-full hover:font-bold cursor-pointer ">
            <FcGoogle size={20} /> Sign in with Google
          </button>
        </div>

        <div className="flex justify-center items-center gap-3">
          <p className="font-bold">Don't have an account?</p>
          <Link
            to="/sign-up"
            className="text-rose-300 font-extrabold underline hover:text-rose-600 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="hidden md:block w-1/2 h-screen">
        <img src={image} alt="Dessert" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
