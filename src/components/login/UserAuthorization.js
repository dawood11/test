process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const SECRET = process.env.JWT_SECRET_TOKEN;
const PORT = process.env.PORT;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

let users = [];

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username, isAdmin: true }, SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
    return res.status(200).send("Admin logged in successfully");
  }
  res.status(401).send("Invalid admin credentials");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin") {
    return res.status(400).send("Username not allowed.");
  }
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CRUDCRUD_ENDPOINT}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return res.status(500).send("Failed to check existing users.");
    }

    const existingUsers = await response.json();

    const userExists = existingUsers.some((u) => u.username === username);
    if (userExists) {
      return res.status(400).send("User is already registered, please log in.");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    const storeResponse = await fetch(
      `${process.env.REACT_APP_CRUDCRUD_ENDPOINT}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );
    if (storeResponse.ok) {
      res.status(201).send("User registered successfully.");
    } else {
      res.status(500).send("Failed to store user data.");
    }
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CRUDCRUD_ENDPOINT}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return res.status(500).send("Failed to retrieve user data");
    }
    const users = await response.json();
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_TOKEN
    );
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
    res.status(200).send("Logged in successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).send("Access denied");
  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

app.get("/verify-token", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ username: req.user.username, isAdmin: req.user.isAdmin });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'Lax' });
  res.status(200).send("Logged out successfully");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
