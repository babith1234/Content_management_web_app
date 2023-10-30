import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// import { useAuth } from "../components/Auth/auth";

const LoginForm = () => {
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  const checkRole = async() => {
    const accessToken = Cookies.get("accessToken");
    console.log(accessToken);
    try {
    const response = await axios
      .get("http://localhost:4000/user", {
        // You may need to include headers for authentication
        headers: {
          Authorization: `Bearer ${accessToken}`, // Your authentication token
        },
      })
      console.log(response.data);
      console.log(response.data.data.role);
      const role = response.data.data.role;
      console.log(role);
      setUserRole(role);
      console.log(userRole);

      if (userRole === "superAdmin") {
        // navigate("/superAdmin");
      } else {
        // navigate("/");
      }
    }
    catch(error) {
      console.error("Error fetching user role:", error);

    }
  };

 
  // const { login, userID } = useAuth();

  const handleSubmit = async (e) => {
    const newUser = {
      email_id: email_id,
      password: password,
    };

    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", newUser);

      const accessToken = response.data.authToken;
      console.log(accessToken);

      // Store the accessToken in a cookie
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=Lax`;

      checkRole();
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Login failed:", error.response);
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if(userRole && userRole !== undefined) {
      userRole === "superAdmin" ? navigate("/superAdmin") : navigate("/")
    }

  },[userRole])

  // console.log('userRole', userRole)

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axios from "axios";
// import Cookies from "js-cookie";

// const LoginForm = () => {
//   const [email_id, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userRole, setUserRole] = useState("user");
//   const navigate = useNavigate();

//   const checkRole = () => {
//     const accessToken = Cookies.get("accessToken");
//     console.log(accessToken);
//     axios
//       .get("http://localhost:4000/user", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         const role = response.data.data.role;
//         console.log(role);
//         setUserRole(role);
//       })
//       .catch((error) => {
//         console.error("Error fetching user role:", error);
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newUser = {
//       email_id: email_id,
//       password: password,
//     };

//     try {
//       const response = await axios.post("http://localhost:4000/login", newUser);
//       const accessToken = response.data.authToken;
//       console.log(accessToken);

//       // Store the accessToken in a cookie
//       document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=Lax`;

//       // Now, after setting the token, you can call checkRole
//       checkRole();

//       console.log("User logged in successfully");
//     } catch (error) {
//       console.error("Login failed:", error.response);
//     }

//     setEmail("");
//     setPassword("");
//   };

//   useEffect(() => {
//     if (userRole === "superAdmin") {
//       navigate("/superAdmin");
//     } else {
//       navigate("/");
//     }
//   }, [userRole, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-96 bg-crimson p-6 rounded-xl shadow-black shadow-lg
        "
        >
          <div className="mb-3 ">
            <label className="font-medium mb-2 flex text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md bg-white border-gray-400 p-3"
              name="email_id"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="font-medium mb-2 flex text-white">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md bg-white border-gray-400 p-3"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-6">
            <label className=" text-white">
              <input type="checkbox" className="mr-2"/>
              Remember me
            </label >
            <span className=" text-white">Forgot password?</span>
          </div>
          <button
            className="block bg-white text-crimson  hover:bg-blue-500 w-full py-2 px rounded"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="mt-4 text-center">
            Don't have an account yet?
            <span className="text-white cursor-pointer">Login</span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
