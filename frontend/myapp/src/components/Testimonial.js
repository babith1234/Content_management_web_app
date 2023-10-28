import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import testi1 from '../images/testi1.jpg';
import testi2 from '../images/testi2.jpg';
import testi3 from '../images/testi3.jpg';

const Testimonial = () => {
  const testimonials = [
    { id: 1, name: 'Client 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: testi1 },
    { id: 2, name: 'Client 2', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', image: testi2 },
    { id: 3, name: 'Client 3', text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.', image: testi3 },
  ];

  return (
    <div>
      <br></br>
      <h2 className="text-2xl font-mono  italic mb-4 mt-10">Some Valuable Feedback's From Our Clients's  !</h2>
      <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true}>
  {testimonials.map((testimonial) => (
    <div key={testimonial.id} className="bg-gradient-to-r from-gray-100 via-gray-500 to-gray-100 hover:shadow-lg transition-transform transform hover:scale-105 rounded shadow duration-100 ease-in-out ease-out-in hover:bg-opacity-100">
      <div className="flex items-center">
        <div className="w-50 h-40 overflow-hidden rounded-full mr-4">
          <img src={testimonial.image} alt={testimonial.name} className="object-cover w-full h-full" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
          <p className="text-gray-900">{testimonial.text}</p>
        </div>
      </div>
    </div>
  ))}
</Carousel>
    </div>
  );
};

export default Testimonial;