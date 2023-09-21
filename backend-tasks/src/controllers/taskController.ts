// src/controllers/taskController.ts
import express from "express";
import { TaskModel } from "../models/taskModel";
const router = express.Router();

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas", error);
    res.status(500).json({ error: "Error al obtener las tareas." });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const {
    titulo,
    descripcion,
    fecha_limite,
    completada,
    categoria_id,
    usuario_id,
  } = req.body;
  try {
    const taskId = await TaskModel.createTask({
      titulo,
      descripcion,
      fecha_limite,
      completada,
      categoria_id,
      usuario_id,
    });
    res.status(201).json({ message: "Tarea creada con éxito", id: taskId });
  } catch (error) {
    console.error("Error al crear la tarea", error);
    res.status(500).json({ error: "Error al crear la tarea." });
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const {
    titulo,
    descripcion,
    fecha_limite,
    completada,
    categoria_id,
    usuario_id,
  } = req.body;

  try {
    // Verificar si la tarea existe antes de intentar actualizarla
    const taskExists = await TaskModel.taskExists(taskId);

    if (taskExists.length >= 1) {
      // La tarea existe, proceder con la actualización
      await TaskModel.updateTask({
        taskId,
        titulo,
        descripcion,
        fecha_limite,
        completada,
        categoria_id,
        usuario_id,
      });

      res.json({ message: "Tarea actualizada con éxito", id: taskId });
    } else {
      // La tarea no existe
      res.status(404).json({ error: "La tarea no existe." });
    }
  } catch (error) {
    console.error("Error al actualizar la tarea", error);
    res.status(500).json({ error: "Error al actualizar la tarea." });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const deleted: any = await TaskModel.deleteTask(taskId);
    if (deleted) {
      res.json({ message: "Tarea eliminada con éxito", id: taskId });
    } else {
      res
        .status(404)
        .json({ error: "La tarea no existe o ya ha sido eliminada." });
    }
  } catch (error) {
    console.error("Error al eliminar la tarea", error);
    res.status(500).json({ error: "Error al eliminar la tarea." });
  }
});

export { router as TaskController };
