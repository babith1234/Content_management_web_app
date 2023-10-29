import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import { useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

const ServicePage = () => {
  const [services, setservices] = useState([]);
  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");
  let userRole = "user";

  // Decode the access token to get user information
  try {
    const decodedToken = jwtDecode(accessToken);
    userRole = decodedToken.role || userRole;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      // Handle the case where the token is invalid
      console.error("Invalid access token:", error);
      // You can add further error handling logic here if needed.
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await Axios.get("http://localhost:4000/services", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const ServiceData = response.data.data;
      setservices(ServiceData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/services?id=${serviceId}`
      );
      const deletedservice = response.data.deleted_service;
      alert(`${deletedservice.service_name} deleted successfully`);
      setservices(services.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateClick = (serviceId) => {
    const serviceToUpdate = services.find(
      (service) => service._id === serviceId
    );

    navigate(`/services/${serviceId}/update`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto  bg-white p-10 h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center text-crimson">SERVICES</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {services.map((service) => (
            <div
              key={service._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-crimson transform hover:scale-105 transition-transform"
            >
              <img
                src={service.service_image || "https://via.placeholder.com/300"}
                alt={service.service_name}
                className="w-full h-60 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">
                  {service.service_name}
                </div>
                <p className="text-gray-700 text-base text-white">
                  {service.service_description}
                </p>
              </div>

              <div className="px-6 pt-4 pb-2"></div>
              <div className="px-6 pt-4 pb-2 flex justify-between">
              {userRole === "admin" && ( // Check userRole to conditionally render buttons
                  <>
                    <button
                      onClick={() => handleUpdateClick(service._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {userRole === "admin" && ( // Check userRole to conditionally render the "Upload" button
          <div className="flex justify-end mt-8">
            <label htmlFor="service_image_input" className="cursor-pointer">
              <Link to="/serviceform">
                <button className="bg-crimson text-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
                  <svg
                    fill="#FFF"
                    height="18"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                  </svg>
                  <span className="ml-2">Upload</span>
                </button>
              </Link>
            </label>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default ServicePage