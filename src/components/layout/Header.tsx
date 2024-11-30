//Navigasjon og autentiseringsstatus visning

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/JavaZoneLogo.png';
import { useState } from 'react';
import './Header.css';

// Type-definisjon for NavLink-komponentens props
type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

// Gjenbrukbar NavLink-komponent for konsistent navigasjonsstyling
const NavLink = ({ to, children, onClick, className }: NavLinkProps) => (
  <Link to={to} onClick={onClick} className={className}>
      {children}
  </Link>
);

// Type-definisjon for menyens tilstand
type MenuState = {
    isOpen: boolean;
}

// Hoved-Header-komponent for nettstedets navigasjon
export const Header = () => {
    // Tilstandshåndtering for hamburger-menyen
    const [menuState, setMenuState] = useState<MenuState>({ isOpen: false });
    // Hent autentiseringsstatus og utloggingsfunksjon fra auth context
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Håndter utlogging og omdiriger til innloggingssiden
    const handleLogout = () => {
        logout();
        setMenuState({ isOpen: false });
        navigate('/login');
    };

    // Veksle menyens åpen/lukket tilstand
    const toggleMenu = () => {
        setMenuState(prev => ({ isOpen: !prev.isOpen }));
    };

    // Lukk menyen når en navigasjonslenke klikkes
    const handleNavClick = () => {
        setMenuState({ isOpen: false });
    };

    // Lukk menyen når cursor går utenfor menyen
const handleMouseLeave = () => {
  setMenuState({ isOpen: false });
};


    return (
      <header className="header">
          <div className="logo-container">
              <Link to="/">
                  <img src={logo} alt="JavaZone logo" />
              </Link>
          </div>
          
          <div className="menu-container" onMouseLeave={handleMouseLeave}>
              <button className="hamburger" onClick={toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
              </button>
  
              <nav className={menuState.isOpen ? 'nav-open' : ''}>
                  <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
                  <NavLink to="/speakers" onClick={handleNavClick}>Speakers</NavLink>
                  <NavLink to="/talks" onClick={handleNavClick}>Talks</NavLink>
                  <NavLink to="/rooms" onClick={handleNavClick}>Rooms</NavLink>
              </nav>
  
              {isAuthenticated ? (
                  <button className="auth-button" onClick={handleLogout}>Logout</button>
              ) : (
                  <NavLink to="/login" onClick={handleNavClick} className="auth-button">Login</NavLink>
              )}
          </div>
      </header>
  );
  
};
