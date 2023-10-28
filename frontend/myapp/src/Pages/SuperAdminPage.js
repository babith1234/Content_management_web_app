import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your API
    axios.get('http://localhost:4000/users')
      .then((response) => {
        // Update the 'users' state with the fetched data
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handlePromote = (userId) => {
    // Make an API request to update the user's role to "admin"
    axios
      .put(`http://localhost:4000/users?id=${userId}`, { role: 'admin' })
      .then((response) => {
        // Update the user's role in the local state
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: 'admin' } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error promoting user:', error);
      });
  };

  const handleDemote = (userId) => {
    // Make an API request to update the user's role to "user"
    axios
      .put(`http://localhost:4000/users?id=${userId}`, { role: 'user' })
      .then((response) => {
        // Update the user's role in the local state
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: 'user' } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error demoting user:', error);
      });
  };
  

  return (
    <>
    <h1 className="text-center text-5xl">SUPER ADMIN PANEL</h1>
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center">
       
      <div className="grid grid-cols-5 gap-20 mt-10 mb-10">
        {users.map((user) => (
        
          <div key={user._id} className="relative flex flex-col items-center justify-center p-4 bg-white bg-opacity-80 rounded shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover-bg-gray-100">
            <img src={user.profile_pic} alt={user.name} className="object-cover w-full h-48 rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-700">{user.role}</p>
            <div className="mt-4">
              <button
                className="mr-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => handlePromote(user._id)}
              >
                Promote
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDemote(user._id)}
              >
                Demote
              </button>
            </div>
          </div>
        ))}
          
      </div>
    </div>
    </>
  );
};

export default SuperAdminPage;
