import { useState } from "react";
import api from "../api";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const getUserStatus = () => {
    return user && user.role === "admin";
  };

  const loginUser = async (credentials) => {
    try {
      const response = await api.authenticate(credentials);

      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Innlogging feilet:", error);
    }
  };

  return {
    user,
    getUserStatus,
    loginUser,
  };
};

export default useAuth;
