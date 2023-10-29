import React, { useEffect, useState } from "react";
import axios from "axios";


import backgroundImg2 from "../images/backgroundImg2.jpeg";
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
        className="bg-white h-screen pt-10 "
        style={{
          backgroundImage: `url(${backgroundImg2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          marginTop:"0.1vh"
        }}
      >
        <div className="bg-white p-6 h-100 rounded-md shadow-lg max-w-md mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 mt-20 ml-20 ">
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
                <p className="text-gray-300 mb-2 text-crimson">Gender: {userData.gender}</p>
                <p className="text-gray-300 mb-2 text-crimson">Email: {userData.email_id}</p>
                <p className="text-gray-300 mb-4 text-crimson">Role: {userData.role}</p>
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
