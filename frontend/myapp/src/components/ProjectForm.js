import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    project_image: null,
    project_name: "",
    project_description: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("project_image", formData.project_image);
      formDataForSubmit.append("project_name", formData.project_name);
      formDataForSubmit.append(
        "project_description",
        formData.project_description
      );

      await axios.post("/projects", formDataForSubmit);

      console.log("Project submitted successfully");
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex flex-col justify-center items-center">
      {/* Circular component for company logo */}
      <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mb-8">
        <span role="img" aria-label="Company Logo" className="text-4xl">
          🌐
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-8">
        Enter Project Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-blue-100 to-purple-400 p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
      >
        <div className="mb-4">
          <label
            htmlFor="project_image"
            className="block text-sm font-medium text-gray-600"
          >
            Project Image
          </label>
          <input
            type="file"
            id="project_image"
            name="project_image"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="project_name"
            className="block text-sm font-medium text-gray-600"
          >
            Project Name
          </label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="project_description"
            className="block text-sm font-medium text-gray-600"
          >
            Project Description
          </label>
          <textarea
            id="project_description"
            name="project_description"
            value={formData.project_description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
