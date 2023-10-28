import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";
const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    gender: "",
    email_id: "",
    password: "",
    profile_pic: null,
  });

  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input for profile picture
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_pic: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("email_id", formData.email_id);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profile_pic", formData.profile_pic);
   

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formDataToSend
      );
      // Handle the response as needed (e.g., show success message or redirect)
      console.log("Registration successful:", response.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-cyan-100 to-blue-500 min-h-screen flex items-center justify-center mt-10 ">
        <div className="bg-gradient-to-l from-cyan-100 to-blue-100 p-10 rounded shadow-outline shadow-2xl md:w-96 lg:w-1/3 w-full mb-6 mt-20 ">
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                className="mt-1 p-2 w-full  mb-2 md:mr-2 border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your email address"
              name="email_id"
              value={formData.email_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your secure password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              name="profile_pic"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Log In
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Registration;
