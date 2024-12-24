"use client"; // Specify that this is a client component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Use useRouter from next/navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', {
        action: 'login',
        email,
        password,
      });

      toast.success(response.data.message); // Show success toast

      // Store the token in local storage or context
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (error: unknown) {  // Catch block uses 'unknown' type
      if (axios.isAxiosError(error)) {  // Type assertion to check for AxiosError
        toast.error(error.response?.data?.message || "An error occurred"); // Show error toast
      } else {
        toast.error("An unknown error occurred"); // Fallback for other types of errors
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-teal-600 hover:underline">Signup</a>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
