import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post('http://localhost:4000/login', user, {
        withCredentials : true
      });
      alert(login.data.message);
      localStorage.setItem('isLogged', 'true')
        navigate('/dashboard');
      
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
  

      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login Here
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>

            <h3 className="font-bold text-blue-600 text-center cursor-pointer" onClick={() => navigate('/')}>Signup Page</h3>
          </form>
        </div>
      </div>
    </>
  );
}
