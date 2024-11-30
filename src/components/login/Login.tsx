import React, { useState } from "react";
import {
  isAdmin,
  login as loginUser,
  logout as logoutUser,
} from "../../services/auth/auth";
import { useUser } from "../../hooks/useUser";
import { FaUserCircle } from "react-icons/fa";
import styles from "../../styles/components/Login.module.css";

const Login: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, username, login, logout } = useUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = async () => {
    const success = await loginUser(usernameInput, password);
    if (success) {
      try {
        const isAdminStatus = await isAdmin();
        login(usernameInput, isAdminStatus);
        alert(`Welcome, ${usernameInput}`);
        setIsDropdownOpen(true);
        setTimeout(() => {
          setIsDropdownOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to determine admin status:", error);
        alert("Failed to determine admin status");
      }
    } else {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput, password }),
      });
  
      if (response.status === 400) {
        const errorMessage = await response.text();
        alert(errorMessage);
      } else if (response.ok) {
        alert("User registered successfully. Please log in.");
        setIsRegistering(false); 
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      logout();
      alert("Logged out successfully");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div className={styles.accountIconContainer}>
      <FaUserCircle className={styles.accountIcon} onClick={toggleDropdown} />
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {isLoggedIn && username ? (
            <div>
              <h2>Welcome, {username}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <h2>{isRegistering ? "Register" : "Please Log In"}</h2>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {isRegistering ? (
                <button onClick={handleRegister}>Register</button>
              ) : (
                <button onClick={handleLogin}>Login</button>
              )}
              <div className={styles.toggleText}>
                {isRegistering ? (
                  <span>
                    Already have an account?{" "}
                    <span
                      className={styles.textSpan}
                      onClick={() => setIsRegistering(false)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setIsRegistering(false);
                      }}
                    >
                      Log In
                    </span>
                  </span>
                ) : (
                  <span>
                    Need an account?{" "}
                    <span
                      className={styles.textSpan}
                      onClick={() => setIsRegistering(true)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setIsRegistering(true);
                      }}
                    >
                      Register
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
