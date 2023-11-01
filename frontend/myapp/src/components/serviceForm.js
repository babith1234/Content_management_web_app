import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const accessToken = Cookies.get("accessToken");

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    service_image: null,
    service_name: "",
    service_description: "",
  });
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/services?serviceId=${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingServiceData = response1.data.data;

      console.log(existingServiceData);
      setFormData(existingServiceData);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchData();
    }
  }, [serviceId]);

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
      formDataForSubmit.append("service_image", formData.service_image);
      formDataForSubmit.append("service_name", formData.service_name);
      formDataForSubmit.append(
        "service_description",
        formData.service_description
      );

      if (serviceId) {
        const response = await axios.put(
          `http://localhost:4000/services?id=${serviceId}`,
          formDataForSubmit
        );

        const updatedService = response.data.data;
        alert("Updated successfully");
        navigate("/services");
      } else {
        await axios.post("http://localhost:4000/services", formDataForSubmit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Service submitted successfully");
        alert("Service submitted successfully");
        navigate("/services");
      }
    } catch (error) {
      console.error("Error submitting service:", error);
    } finally {
      // Set isLoading back to false, whether the operation succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-red-100 to-red-400 h-screen flex flex-col justify-center items-center">
        {/* Circular component for company logo */}
        <div className="bg-white rounded-full h-20 w-80 flex items-center justify-center mb-8">
          <img
            src={logo}
            alt="Company Image"
            className="w-40 h-40 rounded-lg mb-4"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-crimson mb-8">
          Enter Service Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="service_image"
              className="block text-sm font-medium text-white"
            >
              Service Image
            </label>
            <input
              type="file"
              id="service_image"
              name="service_image"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service_name"
              className="block text-sm font-medium text-white"
            >
              Service Name
            </label>
            <input
              type="text"
              id="service_name"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service_description"
              className="block text-sm font-medium text-white"
            >
              Service Description
            </label>
            <textarea
              id="service_description"
              name="service_description"
              value={formData.service_description}
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
                className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                onClick={handleSubmit}
              >
                {serviceId ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceForm;

// import React, { useState } from "react";
// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../images/logo.png";

// import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";
// const accessToken = Cookies.get("accessToken");

// const ServiceForm = () => {
//   const [formData, setFormData] = useState({
//     service_image: null,
//     service_name: "",
//     service_description: "",
//   });
//   const { serviceId } = useParams();
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const fetchData = async () => {
//     try {
//       const response1 = await axios.get(
//         `http://localhost:4000/services?serviceId=${serviceId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const existingServiceData = response1.data.data;

//       console.log(existingServiceData);
//       setFormData(existingServiceData);
//     } catch (error) {
//       console.error("Error fetching service data:", error);
//     }
//   };

//   useEffect(() => {
//     if (serviceId) {
//       fetchData();
//     }
//   }, [serviceId]);

//   const handleChange = (e) => {
//     const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Set isLoading to true to show the loader
//     setIsLoading(true);

//     try {
//       const formDataForSubmit = new FormData();
//       formDataForSubmit.append("service_image", formData.service_image);
//       formDataForSubmit.append("service_name", formData.service_name);
//       formDataForSubmit.append(
//         "service_description",
//         formData.service_description
//       );

//       if (serviceId) {
//         const response = await axios.put(
//           `http://localhost:4000/services?id=${serviceId}`,
//           formDataForSubmit
//         );

//         const updatedService = response.data.data;
//         alert("Updated successfully");
//         navigate("/services");
//       } else {
//         await axios.post("http://localhost:4000/services", formDataForSubmit, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         console.log("Service submitted successfully");
//         alert("Service submitted successfully");
//         navigate("/services");
//       }
//     } catch (error) {
//       console.error("Error submitting service:", error);
//     } finally {
//       // Set isLoading back to false, whether the operation succeeds or fails
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow bg-gradient-to-r from-red-100 to-red-400 h-full flex flex-col justify-center items-center">
//         {/* Circular component for company logo */}
//         <div className="bg-white rounded-full h-20 w-80 flex items-center justify-center mb-8">
//           <img
//             src={logo}
//             alt="Company Image"
//             className="w-40 h-40 rounded-lg mb-4"
//           />
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-crimson mb-8">
//           Enter Service Details
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="service_image"
//               className="block text-sm font-medium text-white"
//             >
//               Service Image
//             </label>
//             <input
//               type="file"
//               id="service_image"
//               name="service_image"
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="service_name"
//               className="block text-sm font-medium text-white"
//             >
//               Service Name
//             </label>
//             <input
//               type="text"
//               id="service_name"
//               name="service_name"
//               value={formData.service_name}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="service_description"
//               className="block text-sm font-medium text-white"
//             >
//               Service Description
//             </label>
//             <textarea
//               id="service_description"
//               name="service_description"
//               value={formData.service_description}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             {isLoading ? (
//               <div className="text-center mt-4">
//                 <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <span className="sr-only">Loading...</span>
//               </div>
//             ) : (
//               <button
//                 className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 onClick={handleSubmit}
//               >
//                 {serviceId ? "Update" : "Submit"}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ServiceForm;

