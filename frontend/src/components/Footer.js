import React from "react";
import "./Footer.css";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="social-icons">
          <a href="/facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="/Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="/Twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="/github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="/linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>

        <p className="copyright">© 2025 Ring Shopping App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
