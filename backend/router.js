import express from 'express';
import { connection } from './db.js';

const router = express.Router();

// POST Route
router.post("/post", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO users (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error al insertar:", err);
      return res.status(500).json({ error: "Error saving user" });
    }

    res.json({
      message: "User saved successfully",
    });
  });
});

export default router;