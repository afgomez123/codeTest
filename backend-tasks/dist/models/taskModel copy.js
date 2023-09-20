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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const Database_1 = require("../utils/Database");
class TaskModel {
    static getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Database_1.Database.connect();
                const rows = yield Database_1.Database.executeQuery("SELECT * FROM tareas");
                return rows;
            }
            finally {
                Database_1.Database.disconnect();
            }
        });
    }
    static createTask({ titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Database_1.Database.connect();
                const [result] = yield Database_1.Database.executeQuery("INSERT INTO tareas (titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)", [
                    titulo,
                    descripcion,
                    fecha_limite,
                    completada,
                    categoria_id,
                    usuario_id,
                ]);
                if (result && "insertId" in result) {
                    return result.insertId;
                }
                else {
                    throw new Error("No se pudo obtener el ID de inserción.");
                }
            }
            finally {
                Database_1.Database.disconnect();
            }
        });
    }
    static taskExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Database_1.Database.connect();
            const rows = yield Database_1.Database.executeQuery("SELECT * FROM tareas WHERE tarea_id = ?", [id]);
            return rows;
        });
    }
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Database_1.Database.connect();
                // Verificar si la tarea existe antes de intentar eliminarla
                const taskExists = yield this.taskExists(id);
                console.log("taskExists:", taskExists);
                if (taskExists.length >= 1) {
                    // La tarea existe, proceder con la eliminación
                    yield Database_1.Database.executeQuery("DELETE FROM tareas WHERE tarea_id = ?", [
                        id,
                    ]);
                    return true; // Indicar que la tarea se eliminó con éxito
                }
                else {
                    // La tarea no existe o ya ha sido eliminada
                    return false; // Indicar que la tarea no se eliminó
                }
            }
            finally {
                Database_1.Database.disconnect();
            }
        });
    }
}
exports.TaskModel = TaskModel;
