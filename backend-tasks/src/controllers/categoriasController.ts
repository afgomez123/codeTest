import express from "express";
import { CategoriasModel } from "../models/categoriasModel";

const router = express.Router();

// Obtener todas las categorias
router.get("/", async (req, res) => {
  try {
    const tasks = await CategoriasModel.getAllCategorias();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener categorias", error);
    res.status(500).json({ error: "Error al obtener las categorias." });
  }
});

export { router as CategoriasController };
