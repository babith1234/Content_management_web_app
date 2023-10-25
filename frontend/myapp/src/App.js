import "./dist/output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/Login";
import Registration from "./components/Register";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectForm from "./components/ProjectForm";
import TestimonialForm from "./components/TestimonialForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/contacts" element={<ContactForm />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/footer" element={<Footer />}></Route>
          <Route path="/projectform" element={<ProjectForm />}></Route>
          <Route path="/testimonialform" element={<TestimonialForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
