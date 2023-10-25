import profile from "../images/profile.jpg";
// import testimonial from '../testi1.jpg';
import socialfeeds from "../images/socialfeeds.jpg";
import project1 from "../images/project1.jpg";
import project2 from "../images/project2.jpg";
import project3 from "../images/project3.jpg";
import project4 from "../images/project4.jpg";
import testi1 from "../images/testi1.jpg";
import testi2 from "../images/testi2.jpg";
import testi3 from "../images/testi3.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Home() {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      description: "Web-Designer",
      image: project1,
      creator: "User1",
    },
    {
      id: 2,
      name: "Project 2",
      description: "UI/UX Designer",
      image: project2,
      creator: "User2",
    },
    {
      id: 3,
      name: "Project 3",
      description: "Data Analyst",
      image: project3,
      creator: "User3",
    },
    {
      id: 4,
      name: "Project 4",
      description: "Website Tester",
      image: project4,
      creator: "User4",
    },
  ];

  const profileCard = {
    name: "Shetty Roshith Raghurama",
    role: "UI/UX designer",
    city: "Kundapura",
    state: "Karnataka",
    email: "roshithshetty7@gmail.com",
    contact: "+91 7718964636",
  };

  const testimonials = [
    {
      id: 1,
      name: "User1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      image: testi1,
      rating: "4.5/5",
    },
    {
      id: 2,
      name: "User2",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      image: testi2,
      rating: "4.2/5",
    },
    {
      id: 3,
      name: "User3",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. !",
      image: testi3,
      rating: "4.8/5",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen bg-gradient-to-r from-teal-400 to-yellow-200">
        <div className="flex flex-grow overflow-hidden">
          <div className="p-4 overflow-y-scroll w-1/3 mt-28">
            <h1 className="text-center text-3xl pb-4">USER PROFILE</h1>
            <div className="flex flex-col items-center p-4 bg-white bg-opacity-50 rounded shadow transform transition duration-500 ease-in-out hover:bg-gray-200">
              <img
                src={profile}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <h2 className="mt-4 text-xl font-semibold hover:text-gray-500">
                {profileCard.name}
              </h2>
              <p className="mt-4 hover:text-gray-500 font-serif ">
                {profileCard.role}
              </p>
              <p className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                {profileCard.city}, {profileCard.state}
              </p>
              <p className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                {profileCard.email}
              </p>
              <p className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                {profileCard.contact}
              </p>
            </div>
          </div>

          <div className="p-4 overflow-y-scroll w-full mt-28">
            <h1 className="text-3xl font-semibold text-orange-950 text-center">
              Projects
            </h1>
            <div className="grid grid-cols-3 gap-5 mt-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-70 rounded shadow transform transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-200"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="object-cover w-full h-32 rounded"
                  />
                  <h2 className="mt-2 text-xl font-semibold hover:text-gray-500">
                    {project.name}
                  </h2>
                  <p className="hover:text-gray-500 font-serif ">
                    {project.description}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 hover:text-gray-700">
                    Created by {project.creator}
                  </p>
                </div>
              ))}
            </div>
            <br></br>
            <h1 className="text-3xl font-semibold text-orange-950 text-center">
              Some Amazing words by our client ☺️ !
            </h1>
            <br></br>
            <Carousel showThumbs={false}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col items-start justify-center p-4 bg-white bg-opacity-20 rounded shadow transform transition duration-500 ease-in-out hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-48 h-48 rounded"
                    />
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold hover:text-gray-500">
                        {testimonial.name}
                      </h2>
                      <br></br>
                      <p className="hover:text-gray-500 font-serif">
                        {testimonial.text}
                      </p>
                      <br></br>
                      <p className="hover:text-gray-500 text-yellow-700 font-serif">
                        {testimonial.rating}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
