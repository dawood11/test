import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import "./Footer.css";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Links</h3>
          <Link to="/speakers" onClick={handleClick}>Speakers</Link>
          <Link to="/talks" onClick={handleClick}>Talks</Link>
          <Link to="/rooms" onClick={handleClick}>Rooms</Link>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-section">
          <h3>Join us</h3>
          <div className="social-links">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
