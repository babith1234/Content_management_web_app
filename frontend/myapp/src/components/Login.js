import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });
 
  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("email_id", formData.email_id);
    formDataToSend.append("password", formData.password);
    console.log(formDataToSend)
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formDataToSend
      );
      // Handle the response as needed (e.g., show success message or redirect)
      const accessToken = response.data.authToken;
      const refreshToken = response.data.refreshToken;
      console.log(accessToken)
      console.log(refreshToken)
      console.log("Login successful:", response.data);
      alert("User logged in successfully");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-96 bg-gradient-to-l from-cyan-100 to-blue-100 p-6 rounded shadow-outline shadow-2xl
        "
          onSubmit={handleSubmit}
        >
          <div className="mb-3 ">
            <label className="font-medium mb-2 flex">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md bg-transparent border-gray-400 p-3"
              name="email_id"
              value={formData.email_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="font-medium mb-2 flex">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md bg-transparent border-gray-400 p-3"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between mb-6">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <span>Forgot password?</span>
          </div>
          <button className="block bg-blue-700 hover:bg-blue-800 text-white w-full py-2 px rounded ">
            Login
          </button>
          <div className="mt-4 text-center">
            Don't have an account yet?
            <span className="text-blue-700 cursor-pointer">Login</span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
