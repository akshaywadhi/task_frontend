import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const login = await axios.post('http://localhost:4000/signup', users);
      

        alert(login.data.message);
    
        navigate('/login');
   
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
     

      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Signup Here</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                name="email"
                value={users.email}
                onChange={handleInput}
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
                value={users.password}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

           

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
