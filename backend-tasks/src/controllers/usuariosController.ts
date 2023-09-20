import express from "express";
import { UsuariosModel } from "../models/usuariosModel";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const tasks = await UsuariosModel.getAllUsers();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    res.status(500).json({ error: "Error al obtener las usuarios." });
  }
});

export { router as UsersController };
