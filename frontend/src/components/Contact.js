import "./Contact.css";
import React, { useState} from 'react';
import axios from 'axios';
import Footer from "../components/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMsg] = useState('');

   // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const res = await axios.post('http://localhost:5000/api/auth/contact', formData);
        if (res.data.success) {
          toast.success("Message sent successfully!", { position: "top-center" });
          setFormData({ name: '', email: '', message: '' }); // Clear fields
        } else {
          toast.error("Failed to send message. Try again!");
        }
      } catch (error) {
        console.error('Contact Form Error:', error);
        toast.error("Server error. Please try again later.");
      }
  };


  return (
    <div>
    <section className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>

        {responseMsg && <p className="response-message">{responseMsg}</p>}
        <p>Have any questions? We'd love to hear from you!</p>
        
       <form className="contact-form" onSubmit={handleSubmit}> 
          <input type="text" 
                 name="name"
                 placeholder="Your Name" 
                 value={formData.name} 
                 onChange={handleChange}
                 required />

          <input type="email" 
                  name="email"
                 placeholder="Your Email"
                 value={formData.email} 
                 onChange={handleChange}
                 required />

          <textarea name="message"
                    placeholder="Your Message" rows="4" 
                    value={formData.message} 
                    onChange={handleChange}
                    required></textarea>

          <button type="submit">Send Message</button> 
          </form>
        
        <div className="contact-info">
          <p>Email: support@pricelessjewelry.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
      <ToastContainer />
    </section>
    <Footer />
    </div>
  );
}

export default Contact;
