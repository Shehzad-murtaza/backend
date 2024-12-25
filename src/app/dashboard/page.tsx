"use client"; // Specify that this is a client component

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the User interface to match the expected structure of the user data
interface User {
  _id: string;
  email: string;
  fullName: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]); // Use the User type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.slice(0, 40)); // Limit to 40 users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-gray-800">
        <div className="text-white font-medium text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-black to-gray-800 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">
        User Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-900 rounded-lg shadow-md p-4 hover:bg-gray-800 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-teal-400">
              {user.fullName}
            </h2>
            <p className="text-gray-300">{user.email}</p>
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No users found</p>
      )}
    </div>
  );
};

export default Dashboard;
