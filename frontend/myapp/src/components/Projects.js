import React, { useState } from 'react';
import project1 from '../images/project1.jpg';
import project2 from '../images/project2.jpg';
import project3 from '../images/project3.jpg';
import project4 from '../images/project4.jpg';
// import Profile from '../Pages/Profile';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, name: 'Project 1', description: 'Web Designer', image: project1, creator: 'User1' },
    { id: 2, name: 'Project 2', description: 'Frontend Developer', image: project2, creator: 'User2' },
    { id: 3, name: 'Project 3', description: 'UI/UX Designer', image: project3, creator: 'User3' },
    { id: 4, name: 'Project 4', description: 'Full Stack Developer', image: project4, creator: 'User4' },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="md:mt-0">
     

      <h2 className="text-3xl font-mono italic font-bold mb-6 mt-10 text-center">Our Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className=" bg-white bg-opacity-70 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 hover:border-gray-900 border-2 border-transparent cursor-pointer"
            onClick={() => openModal(project)}
          >
            <img src={project.image} alt={project.name} className="object-cover w-full h-40 rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-white-600 mb-4">{project.description}</p>
            <p className="text-sm text-gray-700">Created by {project.creator}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-8 rounded-md max-w-md">
            <button className="absolute top-4 right-4 text-gray-600" onClick={closeModal}>
              X
            </button>
            <img src={selectedProject.image} alt={selectedProject.name} className="object-cover w-full h-64 rounded-md mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{selectedProject.name}</h2>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            <p className="text-sm text-gray-700">Created by {selectedProject.creator}</p>
            
            {/* Cancel Button */}
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md mt-4" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;