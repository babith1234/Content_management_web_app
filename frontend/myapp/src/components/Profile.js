import React, { useEffect, useState } from "react";
import axios from "axios";


import backgroundImg2 from "../images/background2.png";
import Cookies from "js-cookie";
const accessToken = Cookies.get("accessToken");

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(accessToken);
    axios
      .get("http://localhost:4000/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  return (
    <>
      
      <div
        className="bg-gradient-to-t from-gray-600 to-gray-200 h-screen pt-10 "
        style={{
          backgroundImage: `url(${backgroundImg2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50 p-6 h-100 rounded-md shadow-lg max-w-md mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 mt-20 ">
          {userData ? (
            <div className="flex flex-col items-start ">
              <img
                src={userData.profile_pic}
                alt="Profile"
                className="w-26 h-26 rounded-full mb-4"
              />

              <div className="text-left">
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {userData.name}
                </h2>
                <p className="text-gray-300 mb-2">Gender: {userData.gender}</p>
                <p className="text-gray-300 mb-2">Email: {userData.email_id}</p>
                <p className="text-gray-300 mb-4">Role: {userData.role}</p>
              </div>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
     
    </>
  );
};

export default Profile;
