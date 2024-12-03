import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RoomsPage from "./pages/RoomsPage";
import SpeakersPage from "./pages/SpeakersPage";
import TalksPage from "./pages/TalksPage";
import AdminPage from "./pages/AdminPage";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("isLoggedIn");
    console.log("LocalStorage value:", userData); 
    if (userData === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); 
  };

  return (
    <Router>
      <div>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/talks" element={<TalksPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={handleLogin} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
