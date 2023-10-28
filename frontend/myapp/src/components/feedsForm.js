import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const accessToken = Cookies.get("accessToken");

const FeedForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    description: "",
  });
  const { feedId } = useParams();
  console.log(feedId);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/feeds?feedId=${feedId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingfeedData = response1.data.data;
      console.log(existingfeedData);
      setFormData(...existingfeedData);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  console.log(formData);

  useEffect(() => {
    if (feedId) {
      fetchData();
    }
  }, [feedId]);

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("image", formData.image);
      formDataForSubmit.append("description", formData.description);

      if (feedId) {
        const response = await axios.put(
          `http://localhost:4000/feeds?id=${feedId}`,
          formDataForSubmit
        );

        const updatedFeed = response.data.data;
        alert("Updated successfully");
        navigate("/feeds");
      } else {
        await axios.post("http://localhost:4000/feeds", formDataForSubmit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Feeds submitted successfully");
        alert("Feeds submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting Feeds:", error);
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
          Create a new Feed
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-blue-100 to-purple-400 p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              placeholder="yuygyug"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
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
              {feedId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedForm;
