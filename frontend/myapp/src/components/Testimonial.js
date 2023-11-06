import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from "axios";
import Cookies from "js-cookie";
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    // Fetch testimonial data from your API endpoint
    Axios.get("https://web-app-s92f.onrender.com/testimonial", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setTestimonials(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  return (
    <div>
      <br></br>
      <h2 className="text-3xl font-bold text-center font-tech mb-4 mt-10 text-crimson">
        SOME VALUABLE FEEDBACK FROM MY CLIENTS
      </h2>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white hover:shadow-lg transition-transform transform hover:scale-105 rounded shadow duration-100 ease-in-out ease-out-in hover-bg-opacity-100 h-60 shadow-lg border border-crimson "
          >
            <div className="flex items-center">
              <div className="w-50 h-48 overflow-hidden rounded-full mr-4 mt-5 ml-5">
                <img
                  src={testimonial.client_image}
                  alt={testimonial.client_company}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg text-crimson font-semibold mb-2">
                  {testimonial.client_company}
                </h3>
                <p className="text-crimson">{testimonial.client_description}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;
