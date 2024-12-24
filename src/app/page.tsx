"use client"; // Specify that this is a client component

import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-20">
        <h1 className="text-5xl font-semibold mb-4">
          Welcome to <span className="text-gray-400">MyApp</span>
        </h1>
        <p className="text-lg mb-6 max-w-lg mx-auto">
          The best platform to manage your tasks, track your progress, and stay on top of your goals.
        </p>
        <Link href="/signup">
          <button className="px-8 py-3 text-lg font-semibold bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <h2 className="text-4xl font-semibold text-center text-white mb-12">
          Key Features
        </h2>
        <div className="flex justify-around items-center space-x-12">
          <div className="text-center w-1/3">
            <div className="mb-6">
              <i className="fas fa-tasks text-6xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Task Management</h3>
            <p>Organize your tasks and manage your day effectively with our simple interface.</p>
          </div>

          <div className="text-center w-1/3">
            <div className="mb-6">
              <i className="fas fa-chart-line text-6xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Progress Tracking</h3>
            <p>Track your progress over time and see your improvements with our real-time analytics.</p>
          </div>

          <div className="text-center w-1/3">
            <div className="mb-6">
              <i className="fas fa-users text-6xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Team Collaboration</h3>
            <p>Work together with your team, share tasks, and track group performance.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-center py-6 mt-12">
        <p className="text-sm">&copy; 2024 MyApp. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/privacy" className="text-gray-400 hover:underline mr-4">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-400 hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
