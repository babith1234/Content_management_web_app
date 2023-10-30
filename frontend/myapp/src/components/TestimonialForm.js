import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import logo from "../images/logo.png"


const accessToken = Cookies.get("accessToken");

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    client_image: null,
    client_name: "",
    client_company: "",
    client_description: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { testimonialId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/testimonial?testimonialId=${testimonialId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingTestimonialData = response1.data.data;
      setFormData(existingTestimonialData);
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

    // Set isLoading to true to show the loader
    setIsLoading(true);

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
        navigate("/testimonials")
      }
    } catch (error) {
      console.error("Error submitting Testimonial:", error);
    } finally {
      // Set isLoading back to false, whether the operation succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen flex flex-col justify-center items-center">
        <div className="bg-white rounded-full h-20 w-80 flex items-center justify-center mb-8">
        <img
            src={logo}
            alt="Company Image"
            className="w-40 h-40 rounded-lg mb-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-8">
          Enter Testimonial Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="client_image"
              className="block text-sm font-medium text-white"
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
              className="block text-sm font-medium text-white"
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
              className="block text-sm font-medium text-white"
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
              className="block text-sm font-medium text-white"
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
            {isLoading ? (
              <div className="text-center mt-4">
                 <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                onClick={handleSubmit}
              >
                {testimonialId ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default TestimonialForm;
