import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactForm = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-10 p-6  bg-gradient-to-l from-cyan-100 to-blue-100 p-6 rounded shadow-outline shadow-2xl mt-32 mb-10">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default ContactForm;