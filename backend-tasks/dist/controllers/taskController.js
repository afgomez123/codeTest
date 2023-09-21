"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
// src/controllers/taskController.ts
const express_1 = __importDefault(require("express"));
const taskModel_1 = require("../models/taskModel");
const router = express_1.default.Router();
exports.TaskController = router;
// Obtener todas las tareas
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.TaskModel.getAllTasks();
        res.json(tasks);
    }
    catch (error) {
        console.error("Error al obtener tareas", error);
        res.status(500).json({ error: "Error al obtener las tareas." });
    }
}));
// Obtener todas las tareas
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const tasks = yield taskModel_1.TaskModel.getTaskById(taskId);
        res.json(tasks);
    }
    catch (error) {
        console.error("Error al obtener tareas", error);
        res.status(500).json({ error: "Error al obtener las tareas." });
    }
}));
// Crear una nueva tarea
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id, } = req.body;
    try {
        const taskId = yield taskModel_1.TaskModel.createTask({
            titulo,
            descripcion,
            fecha_limite,
            completada,
            categoria_id,
            usuario_id,
        });
        res.status(201).json({ message: "Tarea creada con éxito", id: taskId });
    }
    catch (error) {
        console.error("Error al crear la tarea", error);
        res.status(500).json({ error: "Error al crear la tarea." });
    }
}));
// Actualizar una tarea
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id, } = req.body;
    try {
        // Verificar si la tarea existe antes de intentar actualizarla
        const taskExists = yield taskModel_1.TaskModel.taskExists(taskId);
        if (taskExists.length) {
            // La tarea existe, proceder con la actualización
            yield taskModel_1.TaskModel.updateTask({
                taskId,
                titulo,
                descripcion,
                fecha_limite,
                completada,
                categoria_id,
                usuario_id,
            });
            res.json({ message: "Tarea actualizada con éxito", id: taskId });
        }
        else {
            // La tarea no existe
            res.status(404).json({ error: "La tarea no existe." });
        }
    }
    catch (error) {
        console.error("Error al actualizar la tarea", error);
        res.status(500).json({ error: "Error al actualizar la tarea." });
    }
}));
// Eliminar una tarea
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const deleted = yield taskModel_1.TaskModel.deleteTask(taskId);
        if (deleted) {
            res.json({ message: "Tarea eliminada con éxito", id: taskId });
        }
        else {
            res
                .status(404)
                .json({ error: "La tarea no existe o ya ha sido eliminada." });
        }
    }
    catch (error) {
        console.error("Error al eliminar la tarea", error);
        res.status(500).json({ error: "Error al eliminar la tarea." });
    }
}));
