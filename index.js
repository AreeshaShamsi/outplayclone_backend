import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arisha01",   // 👈 apna MySQL password
  database: "signup"      // 👈 aapne jo DB banaya hai
});

// Check connection at start
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

// Health check route
app.get("/check-db", (req, res) => {
  db.ping((err) => {
    if (err) {
      return res.status(500).json({ status: "Database not connected", error: err.message });
    }
    res.json({ status: "Database connected" });
  });
});

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, phone], (err, result) => {
      if (err) {
        console.error("❌ Signup error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "✅ User registered successfully!" });
    });
  } catch (error) {
    console.error("❌ Password hashing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    // compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "✅ Login successful", user: { id: user.id, name: user.name, email: user.email } });
  });
});


// Show all users (for testing)
app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, phone, created_at FROM users", (err, result) => {
    if (err) {
      console.error("❌ Fetch users error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
