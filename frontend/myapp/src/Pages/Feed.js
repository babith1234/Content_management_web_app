import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const FeedsPage = () => {
  const [feeds, setFeeds] = useState([]);
  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      const response = await Axios.get("http://localhost:4000/feeds", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const feedsData = response.data.data;
      setFeeds(feedsData);
    } catch (error) {
      console.error("Error fetching Feeds:", error);
    }
  };

  const handleDelete = async (feedId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/feeds?id=${feedId}`
      );
      const deletedFeed = response.data.deleted_feed;
      alert(" deleted successfully");
      setFeeds(feeds.filter((feed) => feed._id !== feedId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateClick = (feedId) => {
    const feedToUpdate = feeds.find((feed) => feed._id === feedId);

    navigate(`/feeds/${feedId}/update`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 bg-gradient-to-b from-blue-100 to-blue-500 p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">My feeds</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {feeds.map((feed) => (
            <div
              key={feed._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-b from-cyan-500 to-blue-100 transform hover:scale-105 transition-transform"
            >
              <img
                src={feed.image || "https://via.placeholder.com/300"}
                alt={feed.description}
                className="w-full h-60 object-cover"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base">{feed.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2"></div>
              <div className="px-6 pt-4 pb-2 flex justify-between">
                <button
                  onClick={() => handleUpdateClick(feed._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(feed._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <label htmlFor="project_image_input" className="cursor-pointer">
            <Link to="/feedform">
              <button className="bg-green-400 text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
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
      </div>
    </>
  );
};

export default FeedsPage;
