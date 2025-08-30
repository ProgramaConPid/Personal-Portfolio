import express from "express";
import { pool } from "./db.js";

const router = express.Router();

// POST Route
router.post("/post", async (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO users (name, email, message) VALUES (?, ?, ?)";

  try {
    const [result] = await pool.query(sql, [name, email, message]);

    res.json({
      message: "User saved successfully",
      insertedId: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting:", err);
    res.status(500).json({ error: "Error saving user" });
  }
});

export default router;
