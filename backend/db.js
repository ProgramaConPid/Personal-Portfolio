import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create the connection for the database
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true
});

// Verify the state of the connection
connection.connect((err) => {
  if (err) throw err;
  console.log("Connection to the database succesful.");
});