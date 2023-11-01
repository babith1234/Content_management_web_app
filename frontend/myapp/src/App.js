import "./dist/output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Login";
import Registration from "./Pages/Register";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectForm from "./components/ProjectForm";
import TestimonialForm from "./components/TestimonialForm";
import Projects from "./Pages/Projects";
import ServiceForm from "./components/serviceForm";
import ServicePage from "./Pages/Service";
import TestimonialPage from "./Pages/Testimonial";
import FeedsPage from "./Pages/Feed";
import FeedForm from "./components/feedsForm";
import SuperAdminPage from "./Pages/SuperAdminPage";
import ContactList from "./Pages/contacts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/contacts" element={<ContactForm />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/footer" element={<Footer />}></Route>
          <Route path="/projectform" element={<ProjectForm />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/projects/:projectId/update" element={<ProjectForm />} />

          <Route path="/serviceform" element={<ServiceForm />}></Route>
          <Route path="/services" element={<ServicePage />}></Route>
          <Route path="/services/:serviceId/update" element={<ServiceForm />} />

          <Route path="/testimonialform" element={<TestimonialForm />}></Route>
          <Route path="/testimonials" element={<TestimonialPage />}></Route>
          <Route
            path="/testimonials/:testimonialId/update"
            element={<TestimonialForm />}
          />

          <Route path="/feeds" element={<FeedsPage />}></Route>
          <Route path="/feedform" element={<FeedForm />}></Route>
          <Route path="/feeds/:feedId/update" element={<FeedForm />} />

          <Route path="/superAdmin" element={<SuperAdminPage />}></Route>

          <Route path="/contactspage" element={<ContactList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
