//src\components\navigation\Navbar.tsx
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { useNavContext } from "../../../src/hooks/useNavContext";
import { NavLinkType } from "../../types/nav.types";
import "../../styles/components/Navbar.css";
import Login from "../login/Login";

export const Navbar = (): JSX.Element => {
  const { navLinks } = useNavContext();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  return (
    <header className="navbar">
      <div className="logo-h1-wrapper">
        <div>
      <a href="/" className="navbar-logo">
        <img
          className="jzIcon"
          src="src\assets\icons\edited-nav-logo.png"
          alt="logo icon"
        />
      </a>
      </div>
      <h1>Velkommen til Javazone</h1>
      </div>
      <nav>
        <div className="navbar-wrapper">
          {navLinks.map((link: NavLinkType, index: number) => (
            <a key={index} href={link.href}>
              {link.name}
            </a>
          ))}
          <div className="login-wrapper">
          <Login />
          </div>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
          </button>
        </div>
      </nav>
    </header>
  );
};
