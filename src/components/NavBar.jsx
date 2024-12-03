import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/components/NavBar.css";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Javazone 2024</div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Hjem
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Rom
        </NavLink>
        <NavLink
          to="/speakers"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Foredragsholdere
        </NavLink>
        <NavLink
          to="/talks"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Foredrag
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}>
              Admin
            </NavLink>
            <button className="logout-button" onClick={handleLogout}>
              Logg ut
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}>
            Logg inn
          </NavLink>
        )}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default NavBar;
