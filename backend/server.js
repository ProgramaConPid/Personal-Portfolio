import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './router.js';
import { pool } from './db.js'

dotenv.config();
const PORT = process.env.PORT || 3000

// Initilize express
const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use("/form", routes)

// Start the server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
})