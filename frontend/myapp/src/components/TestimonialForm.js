import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const accessToken = Cookies.get("accessToken");

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    client_image: null,
    client_name: "",
    client_company: "",
    client_description: "",
  });
  const { testimonialId } = useParams();
  console.log(testimonialId);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/testimonial?testimonialId=${testimonialId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingTestimonialData = response1.data.data;
      console.log(existingTestimonialData)

      setFormData(...existingTestimonialData);
    } catch (error) {
      console.error("Error fetching testimonial data:", error);
    }
  };

  useEffect(() => {
    if (testimonialId) {
      fetchData();
    }
  }, [testimonialId]);

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("client_image", formData.client_image);
      formDataForSubmit.append("client_name", formData.client_name);
      formDataForSubmit.append("client_company", formData.client_company);
      formDataForSubmit.append("client_description", formData.client_description);

      if (testimonialId) {
        const response = await axios.put(
          `http://localhost:4000/testimonial?id=${testimonialId}`,
          formDataForSubmit
        );

        const updatedTestimonial = response.data.data;
        alert("Updated successfully");
        navigate("/testimonials");
      } else {
        await axios.post("http://localhost:4000/testimonial", formDataForSubmit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Testimonial submitted successfully");
        alert("Testimonial submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting Testimonial:", error);
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
          Enter Testimonial Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-blue-100 to-purple-400 p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="client_image"
              className="block text-sm font-medium text-gray-600"
            >
              Client Image
            </label>
            <input
              type="file"
              id="client_image"
              name="client_image"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="client_name"
              className="block text-sm font-medium text-gray-600"
            >
              Client Name
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="client_company"
              className="block text-sm font-medium text-gray-600"
            >
              Client company
            </label>
            <input
              type="text"
              id="client_company"
              name="client_company"
              value={formData.client_company}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>


          <div className="mb-4">
            <label
              htmlFor="client_description"
              className="block text-sm font-medium text-gray-600"
            >
              Client description
            </label>
            <textarea
              id="client_description"
              name="client_description"
              value={formData.client_description}
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
              {testimonialId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TestimonialForm;
