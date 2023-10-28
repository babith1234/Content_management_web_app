import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Delete the accessToken cookie
    Cookies.remove("accessToken");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-opacity-90 backdrop-blur-lg text-white p-2 flex items-center w-screen h-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">Company Name</span>
        </div>
        <button
          className="sm:hidden text-white hover:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-opacity-90 text-white text-center pt-20">
          <button
            className="text-xl hover:text-gray-200 absolute top-4 left-4"
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            &#8599;
          </button>
          <ul className="space-y-4">
            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/home"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/projects"
                onClick={closeMenu}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/services"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/testimonials"
              >
                Testimonials
              </a>
            </li>

            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/feeds"
              >
                Feeds
              </a>
            </li>

            <li>
              <a
                className="text-4xl hover:text-gray-200 hover:underline font-serif"
                href="/contacts"
              >
                Contact
              </a>
            </li>

            {accessToken ? (
              <li>
                <button
                  className="text-4xl hover:text-gray-200 hover:underline font-serif"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <a
                    className="text-4xl hover:text-gray-200 hover:underline font-serif"
                    href="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    className="text-4xl hover:text-gray-200 hover:underline font-serif"
                    href="/register"
                    onClick={closeMenu}
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      <ul className={`hidden sm:flex space-x-4`}>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/projects"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/services"
          >
            Services
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/testimonials"
          >
            Testimonials
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/feeds"
          >
            Feeds
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/contacts"
          >
            Contact
          </a>
        </li>
        {accessToken ? (
          <li>
            <button
              className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <a
                className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl"
                href="/login"
              >
                Login
              </a>
            </li>
            <li>
              <a
                className="bg-blue-500 hover:bg-cyan-600  text-white font-bold py-2 px-4 rounded-full shadow-2xl"
                href="/register"
              >
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Navbar;
