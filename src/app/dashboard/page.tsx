"use client"; // Specify that this is a client component

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the User interface to match the expected structure of the user data
interface User {
  _id: string;
  email: string;
  username: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]); // Use the User type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.slice(0, 30)); // Limit to 30 users
      } catch (error) {
        console.error('Error fetching users:', error);
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
      <h1 className="text-3xl font-semibold text-center text-white mb-6">User Dashboard</h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-gray-800">
        <table className="min-w-full table-auto text-white">
          <thead className="bg-black">
            <tr>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b hover:bg-gray-700 ${index < 3 ? 'bg-gray-900' : ''}`}
                >
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.username}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-3 px-6 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
