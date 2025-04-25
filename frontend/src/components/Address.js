import React from "react";
import "./Address.css";

function Address() {
  return (
    <section className="address">
      <div className="address-container">
        <h2>Our Location</h2>
        <p>Visit our store or contact us for more details.</p>
        
        <div className="map-container">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.246031992828!2d73.88888587486044!3d18.562715282527303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebeaf0b6d7c5%3A0x24849a36c9e9bcb6!2sKondhwa%2C%20Pune%2C%20Maharashtra%20411048!5e0!3m2!1sen!2sin!4v1708975406789!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="store-info">
          <p>📍 Address: Kondhwa, Pune, Maharashtra 411048, India</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📧 Email: support@pricelessjewelry.com</p>
        </div>
      </div>
    </section>
  );
}

export default Address;
