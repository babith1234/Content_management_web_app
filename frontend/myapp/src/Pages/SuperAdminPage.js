import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const SuperAdminPage = () => {
  const [users, setUsers] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from your API
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        // Update the 'users' state with the fetched data
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handlePromote = (userId) => {
    // Make an API request to update the user's role to "admin"
    axios
      .put(`http://localhost:4000/users?id=${userId}`, { role: "admin" })
      .then((response) => {
        // Update the user's role in the local state
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error promoting user:", error);
      });
  };

  const handleDemote = (userId) => {
    // Make an API request to update the user's role to "user"
    axios
      .put(`http://localhost:4000/users?id=${userId}`, { role: "user" })
      .then((response) => {
        // Update the user's role in the local state
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: "user" } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error demoting user:", error);
      });
  };

  const handleLogout = () => {
    // Delete the accessToken cookie
    Cookies.remove("accessToken");

    // Navigate to the login page
    navigate("/login");
  };
  //   return (
  //     <>
  //       <div className="bg-crimson">
  //         <div className="container mx-auto p-4">
  //           <div className="md:flex items-center justify-between py-4">
  //             <h1 className="text-2xl text-white md:text-5xl flex-1 text-center md:text-left">
  //               SUPER ADMIN PANEL
  //             </h1>
  //             <img
  //             src={logo}
  //             alt="Company Image"
  //             className="w-40 h-40 rounded-lg mb-4"
  //           />
  //             <button
  //               className="bg-white text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
  //               onClick={handleLogout}
  //             >
  //               Logout
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="min-h-screen bg-crimson">
  //         <div className="container mx-auto p-4">
  //           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-10 mb-10">
  //             {users.map((user) => (
  //               <div
  //                 key={user._id}
  //                 className="relative flex flex-col items-center justify-center p-4 bg-white rounded shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover-bg-gray-100"
  //               >
  //                 <img
  //                   src={user.profile_pic}
  //                   alt={user.name}
  //                   className="object-cover w-full h-48 rounded mb-4"
  //                 />
  //                 <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
  //                 <p className="text-gray-700">{user.role}</p>
  //                 <div className="mt-4">
  //                   <button
  //                     className="mr-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
  //                     onClick={() => handlePromote(user._id)}
  //                   >
  //                     Promote
  //                   </button>
  //                   <button
  //                     className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
  //                     onClick={() => handleDemote(user._id)}
  //                   >
  //                     Demote
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="bg-gradient-to-r from-red-200 to-red-600">
        <div className="container mx-auto p-2">
          <div className="md:flex items-center justify-between ">
            <h1 className="text-2xl text-white md:text-5xl flex-1 text-center md:text-left">
              SUPER ADMIN PANEL
            </h1>
            <div className="flex items-center">
              <img
                src={logo}
                alt="Company Image"
                className="w-40 h-40 rounded-lg md:mr-96 mr-60"
              />
              <button
                className="bg-white text-crimson font-bold py-2 px-4 rounded-full shadow-2xl ml-4"
                onClick={handleLogout}
              >
                Logout1
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-red-200 to-red-600">
        <div className="container mx-auto p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-1 mb-10">
            {users.map((user) => (
              <div
                key={user._id}
                className="relative flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-black shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover-bg-gray-100"
              >
                <img
                  src={user.profile_pic}
                  alt={user.name}
                  className="object-cover w-full h-48 rounded mb-4"
                />
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
      </div>
    </>
  );
};

export default SuperAdminPage;
