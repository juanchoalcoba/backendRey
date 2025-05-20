import { Router } from "express";
import {
  login,
  register,
  logout,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

// Ruta para registrar usuario
router.post("/register", validateSchema(registerSchema), register);

// Ruta para hacer login
router.post("/login", validateSchema(loginSchema), login);

// Ruta para logout, limpia la cookie del token
router.post("/logout", logout);

// Ruta para verificar el token y obtener datos del usuario
router.get("/verify", verifyToken);

export default router;
