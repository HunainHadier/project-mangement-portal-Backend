import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "78.138.98.18",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "hakam_remote",
  password: process.env.DB_PASS || "hakam_project",
  database: process.env.DB_NAME || "hakam_project",
  connectionLimit: 10,
  connectTimeout: 10000,
});