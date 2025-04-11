import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">ShopNow</h3>
          <p className="footer-description">
            We provide high-quality products at affordable prices.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/cart" className="footer-link">Cart</Link></li>
            
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Electronics</a></li>
            <li><a href="#" className="footer-link">Jewelry</a></li>
            <li><a href="#" className="footer-link">Men's Clothing</a></li>
            <li><a href="#" className="footer-link">Women's Clothing</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
            <li className="footer-contact-item">Email: smondal@gmail.com</li>
            <li className="footer-contact-item">Phone: +91 999999999</li>
            <li className="footer-contact-item">Address: Kolkata, West Bengal</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} ShopNow.
        </p>
      </div>
    </footer>
  );
};

export default Footer;