import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const accessToken = Cookies.get("accessToken");

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    service_image: null,
    service_name: "",
    service_description: "",
  });
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/services?serviceId=${serviceId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingServiceData = response1.data.data;

      console.log(existingServiceData)
      setFormData(existingServiceData);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchData();
    }
  }, [serviceId]);

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("service_image", formData.service_image);
      formDataForSubmit.append("service_name", formData.service_name);
      formDataForSubmit.append(
        "service_description",
        formData.service_description
      );

      if (serviceId) {
        const response = await axios.put(
          `http://localhost:4000/services?id=${serviceId}`,
          formDataForSubmit
        );

        const updatedService = response.data.data;
        alert("Updated successfully");
        navigate("/services");
      } else {
        await axios.post("http://localhost:4000/services", formDataForSubmit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Service submitted successfully");
        alert("Service submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex flex-col justify-center items-center">
        {/* Circular component for company logo */}
        <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mb-8">
          <span role="img" aria-label="Company Logo" className="text-4xl">
            🌐
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-8">
          Enter Service Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-blue-100 to-purple-400 p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="service_image"
              className="block text-sm font-medium text-gray-600"
            >
              Service Image
            </label>
            <input
              type="file"
              id="service_image"
              name="service_image"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service_name"
              className="block text-sm font-medium text-gray-600"
            >
              Service Name
            </label>
            <input
              type="text"
              id="service_name"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service_description"
              className="block text-sm font-medium text-gray-600"
            >
              Service Description
            </label>
            <textarea
              id="service_description"
              name="service_description"
              value={formData.service_description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl"
              onClick={handleSubmit}
            >
              {serviceId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceForm;
