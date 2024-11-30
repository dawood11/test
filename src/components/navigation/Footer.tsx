import "../../styles/components/Navbar.css";
import { SiGithub } from '@icons-pack/react-simple-icons';
import { SiGooglechrome } from '@icons-pack/react-simple-icons';
import { SiLinkedin } from '@icons-pack/react-simple-icons';


export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
        <div className="footer-wrapper">
        <p>&copy; {new Date().getFullYear()} Javazone&trade;. All rights reserved.</p>
        <div className="contact-wrapper"><p className="contact-us"><a href="/contact">Contact Us!</a></p></div>
        <div className="footer-icon-wrapper">
        <a href="https://2024.javazone.no/" target="_blank" rel="noopener noreferrer">
        <SiGooglechrome title='Google chrome logo' color='white' size={24} />
        </a>
        <a href="https://github.com/oddzor/Arbeidskrav-2---Javascript-Rammeverk" target="_blank" rel="noopener noreferrer">
        <SiGithub title='GitHub logo' color='white' size={24} />
        </a>
        <a href="https://www.linkedin.com/school/gokstad-akademiet/" target="_blank" rel="noopener noreferrer">
    <SiLinkedin title="LinkedIn logo" color="white" size={24} />
  </a>
        </div>
        </div>
        </div>
      </div>
    </footer>
  );
};