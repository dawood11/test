import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BiUser, BiLock } from "react-icons/bi";
import "../styles/components/LoginForm.css";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(
      "Prøver å logge på med brukernavn:",
      username,
      "passord:",
      password
    );

    if (username === "admin" && password === "admin") {
      const user = { username: "admin", role: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      setError("");
      navigate("/admin");
    } else {
      setError("Feil brukernavn eller passord");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Pålogging</h1>
        <p>Vennligst skriv inn brukernavn og passord for å logge inn.</p>
        <div className="input-box">
          <BiUser className="icon" />
          <input
            type="text"
            placeholder="Brukernavn"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <BiLock className="icon" />
          <input
            type="password"
            placeholder="Passord"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Logg inn</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
