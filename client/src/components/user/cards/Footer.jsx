import React from "react";
import "../css/footer.css";
import skillera from "../../../assets/killera (1).png"

const Footer = () => {
  return (
    <footer className="skillera-footer ">
      <div className="skillera-container">
        <div className="skillera-row">
          <div className="skillera-col-md-4">
            <a className="skillera-logo">
              <img src={skillera} alt="Skillera" />
            </a>
            <p className="skillera-footer-description">
              Empowering your learning journey with the best online courses.
            </p>
          </div>
          <div className="skillera-col-md-2">
            <h4 className="skillera-footer-heading">Product</h4>
            <ul className="skillera-footer-list">
              <li>
                <a className="skillera-footer-link">
                  Features
                </a>
              </li>
              <li>
                <a className="skillera-footer-link">
                  Pricing
                </a>
              </li>
              <li>
                <a className="skillera-footer-link">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div className="skillera-col-md-2">
            <h4 className="skillera-footer-heading">Company</h4>
            <ul className="skillera-footer-list">
              <li>
                <a className="skillera-footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a className="skillera-footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a className="skillera-footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="skillera-col-md-4">
            <h4 className="skillera-footer-heading">Follow Us</h4>
            <ul className="skillera-social-links">
              <li>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter skillera-social-icon"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f skillera-social-icon"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram skillera-social-icon"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github skillera-social-icon"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="skillera-copyright">
          <p>&copy; 2024 Skillera. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
