import React, { useState } from 'react'
import image from '../assets/images/image-meringue-desktop.jpg';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError((prevError) => ({ ...prevError, [event.target.name]: "" }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Please re-enter password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("signup successful! sign in")
        navigate("/sign-in");
      } else {
        setSubmitError(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full px-4 py-2 md:px-0 md:py-0">
      <div className="flex flex-col justify-center gap-1 w-full md:w-1/2">
        <Link to="/" className="text-4xl md:ml-4 font-bold py-2 md:py-1 hover:text-red-900">
          Desserts
        </Link>
        <div className="flex flex-col gap-1 px-8">
          <h3 className="font-bold text-2xl mb-2">Sign Up</h3>
          <p className="text-xs text-black font-bold">
            Create an account or{" "}
            <Link to="/sign-in" className="underline font-extrabold hover:text-rose-500 hover:text-sm">
              Sign in
            </Link>
          </p>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="name" className="mt-2 text-xs font-bold mb-1">Full Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={formData.name}
              type="text"
              id="name"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.name && <p className="text-red-500 text-xs">{error.name}</p>}

            <label htmlFor="email" className="mt-2 text-xs font-bold mb-1">Email address</label>
            <input
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              id="email"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}

            <label htmlFor="password" className="mt-2 text-xs font-bold mb-1">Password</label>
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              id="password"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.password && <p className="text-red-500 text-xs">{error.password}</p>}

            <label htmlFor="confirmPassword" className="mt-2 text-xs font-bold mb-1">Confirm Password</label>
            <input
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              type="password"
              id="confirmPassword"
              className="border border-gray-300 rounded-sm px-2 py-1"
            />
            {error.confirmPassword && <p className="text-red-500 text-xs">{error.confirmPassword}</p>}

            {/* Display submit error */}
            {submitError && <p className="text-red-600 text-sm mt-2">{submitError}</p>}

            <div className="flex flex-col gap-2 items-start md:flex md:flex-row md:justify-between md:items-center mt-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember for 30 days</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-rose-300 text-white font-bold text-lg h-12 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <button className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-4 mt-4 text-sm rounded-sm w-full hover:font-bold cursor-pointer ">
            <FcGoogle size={20} /> Sign up with Google
          </button>
        </div>
      </div>

      <div className="hidden md:block w-1/2 h-screen">
        <img src={image} alt="Dessert" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
