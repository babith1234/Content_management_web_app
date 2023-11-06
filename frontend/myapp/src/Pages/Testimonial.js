// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// import { useEffect } from "react";
// import Axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode, InvalidTokenError } from "jwt-decode";

// const TestimonialPage = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const navigate = useNavigate();

//   const accessToken = Cookies.get("accessToken");
//   let userRole = "user";

//     // Decode the access token to get user information
//     try {
//       const decodedToken = jwtDecode(accessToken);
//       userRole = decodedToken.role || userRole;
//     } catch (error) {
//       if (error instanceof InvalidTokenError) {
//         // Handle the case where the token is invalid
//         console.error("Invalid access token:", error);
//         // You can add further error handling logic here if needed.
//       }
//     }

//   useEffect(() => {
//     getTestimonials();
//   }, []);


//   const getTestimonials = async () => {
//     try {
//       const response = await Axios.get("http://localhost:4000/testimonial", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const testimonialsData = response.data.data;
//       setTestimonials(testimonialsData);
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//     }
//   };

//   const handleDelete = async (testimonialId) => {
//     try {
//       const response = await Axios.delete(
//         `http://localhost:4000/testimonial?id=${testimonialId}`
//       );
//       const deletedTestimonial = response.data.deleted_testimonial;
//       alert(`${deletedTestimonial.client_name} deleted successfully`);
//       setTestimonials(
//         testimonials.filter((testimonial) => testimonial._id !== testimonialId)
//       );
//     } catch (error) {
//       console.error("Error deleting testimonial:", error);
//     }
//   };

//   const handleUpdateClick = (testimonialId) => {
//     const projectToUpdate = testimonials.find(
//       (testimonial) => testimonial._id === testimonialId
//     );

//     navigate(`/testimonials/${testimonialId}/update`);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto bg-white bg-gradient-to-r from-red-100 to-red-400 p-10 h-screen">
//         <h1 className="text-3xl font-bold mb-4 text-center font-minimal text-white">TESTIMONIALS</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial._id}
//               className="max-w-sm rounded-xl overflow-hidden  shadow-black shadow-lg bg-crimson transform hover:scale-105 transition-transform"
//             >
//               <img
//                 src={
//                   testimonial.client_image || "https://via.placeholder.com/300"
//                 }
//                 alt={testimonial.client_name}
//                 className="w-full h-60 object-cover text-white"
//               />

              

//                 <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2 text-white">
//                   {testimonial.client_name}
//                 </div>
                

//                 <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2 text-white">
//                   {testimonial.client_company}
//                 </div>



//                 <p className="text-gray-700 text-base text-white">
//                   {testimonial.client_description}
//                 </p>
//               </div>
//               </div>

//               <div className="px-6 pt-4 pb-2"></div>
//               <div className="px-6 pt-4 pb-2 flex justify-between">

//                  {userRole === "admin" && ( // Check userRole to conditionally render buttons
//                   <>
//                     <button
//                       onClick={() => handleUpdateClick(testimonial._id)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(testimonial._id)}
//                       className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         {userRole === "admin" && ( // Check userRole to conditionally render the "Upload" button
//           <div className="flex justify-end mt-8">
//             <label htmlFor="clientt_image_input" className="cursor-pointer">
//               <Link to="/testimonialform">
//                 <button className="bg-crimson text-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
//                   <svg
//                     fill="#FFF"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     width="24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
//                   </svg>
//                   <span className="ml-2">Upload</span>
//                 </button>
//               </Link>
//             </label>
//           </div>
//         )}
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default TestimonialPage;


import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");
  let userRole = "user";

  // Decode the access token to get user information
  try {
    const decodedToken = jwtDecode(accessToken);
    userRole = decodedToken.role || userRole;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      // Handle the case where the token is invalid
      console.error("Invalid access token:", error);
      // You can add further error handling logic here if needed.
    }
  }

  useEffect(() => {
    getTestimonials();
  }, []);

  const getTestimonials = async () => {
    try {
      const response = await Axios.get("https://web-app-s92f.onrender.com/testimonial", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const testimonialsData = response.data.data;
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleDelete = async (testimonialId) => {
    try {
      const response = await Axios.delete(
        `https://web-app-s92f.onrender.com/testimonial?id=${testimonialId}`
      );
      const deletedTestimonial = response.data.deleted_testimonial;
      alert(`${deletedTestimonial.client_name} deleted successfully`);
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== testimonialId)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleUpdateClick = (testimonialId) => {
    const projectToUpdate = testimonials.find(
      (testimonial) => testimonial._id === testimonialId
    );

    navigate(`/testimonials/${testimonialId}/update`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div className="container mx-auto bg-white bg-gradient-to-r from-red-100 to-red-400 p-10 flex-grow">
        <h1 className="text-3xl font-bold mb-4 text-center font-minimal text-white">TESTIMONIALS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="max-w-sm rounded-xl overflow-hidden shadow-black shadow-lg bg-crimson transform hover:scale-105 transition-transform"
            >
              <img
                src={
                  testimonial.client_image || "https://via.placeholder.com/300"
                }
                alt={testimonial.client_name}
                className="w-full h-60 object-cover text-white"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">
                  {testimonial.client_name}
                </div>
                <div className="font-bold text-xl mb-2 text-white">
                  {testimonial.client_company}
                </div>
                <p className="text-gray-700 text-base text-white">
                  {testimonial.client_description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between">
                {userRole === "admin" && (
                  <>
                    <button
                      onClick={() => handleUpdateClick(testimonial._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {userRole === "admin" && (
          <div className="flex justify-end mt-8">
            <label htmlFor="clientt_image_input" className="cursor-pointer">
              <Link to="/testimonialform">
                <button className="bg-crimson text-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialPage;
