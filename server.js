const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Path to users.json
const usersFilePath = path.join(__dirname, "users.json");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Register route
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Read the existing users from the file
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading user data", err });
    }

    const users = JSON.parse(data);

    // Check if the username or email already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Add the new user to the array
    users.push({ username, email, password });

    // Write the updated users array back to the file
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving user data", err });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Read the existing users from the file
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading user data", err });
    }

    const users = JSON.parse(data);

    // Check if the email and password match
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
