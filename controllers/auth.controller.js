// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../src/db.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../src/config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Buscar si el email ya existe
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return res.status(400).json(["The mail is already in use"]);
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );

    // Obtener el id insertado
    const userId = result.insertId;

    // Crear token
    const token = await createAccessToken({ id: userId });

    res.cookie("token", token);
    res.json({
      id: userId,
      username,
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// controllers/auth.controller.js
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Crear token con el ID del usuario
    const token = await createAccessToken({ id: user.id });

    // Enviar cookie y respuesta
    res.cookie("token", token);
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), // Vence inmediatamente
  });
  return res.sendStatus(200);
};


export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    try {
      const [rows] = await pool.query("SELECT id, username, email FROM users WHERE id = ?", [decoded.id]);

      if (rows.length === 0) return res.status(401).json({ message: "User not found" });

      const user = rows[0];

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });
};