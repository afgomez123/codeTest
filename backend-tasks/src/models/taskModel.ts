import { RowDataPacket } from "mysql2/promise";
import { Database } from "../utils/database";

class TaskModel {
  static async getAllTasks() {
    try {
      await Database.connect();
      const rows = await Database.executeQuery("SELECT * FROM tareas");
      return rows as RowDataPacket[];
    } finally {
      Database.disconnect();
    }
  }

  static async createTask({
    titulo,
    descripcion,
    fecha_limite,
    completada,
    categoria_id,
    usuario_id,
  }: {
    titulo: string;
    descripcion: string;
    fecha_limite: string;
    completada: boolean;
    categoria_id: number;
    usuario_id: number;
  }) {
    try {
      await Database.connect();

      const result: any = await Database.executeQuery(
        "INSERT INTO tareas (titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          titulo,
          descripcion,
          fecha_limite,
          completada,
          categoria_id,
          usuario_id,
        ]
      );

      // Check if the result object contains an insertId property
      if (result && result.insertId) {
        return result.insertId;
        // You can use insertId for further processing if needed.
      } else {
        throw new Error("No se pudo obtener el ID de inserción.");
      }
    } finally {
      Database.disconnect();
    }
  }

  // Actualizar una tarea en el modelo
  static async updateTask({
    taskId,
    titulo,
    descripcion,
    fecha_limite,
    completada,
    categoria_id,
    usuario_id,
  }: {
    taskId: string;
    titulo: string;
    descripcion: string;
    fecha_limite: string;
    completada: boolean;
    categoria_id: number;
    usuario_id: number;
  }) {
    try {
      await Database.connect();
      await Database.executeQuery(
        "UPDATE tareas SET titulo = ?, descripcion = ?, fecha_limite = ?, completada = ?, categoria_id = ?, usuario_id = ? WHERE tarea_id = ?",
        [
          titulo,
          descripcion,
          fecha_limite,
          completada,
          categoria_id,
          usuario_id,
          taskId,
        ]
      );
    } finally {
      Database.disconnect();
    }
  }

  static async getTaskById(id: string) {
    try {
      await Database.connect();
      const rows = await Database.executeQuery(
        "SELECT * FROM tareas WHERE tarea_id = ?",
        [id]
      );
      return rows as RowDataPacket[];
    } finally {
      Database.disconnect();
    }
  }

  static async taskExists(id: string) {
    await Database.connect();
    const rows = await Database.executeQuery(
      "SELECT * FROM tareas WHERE tarea_id = ?",
      [id]
    );
    return rows as RowDataPacket[];
  }

  static async deleteTask(id: string) {
    try {
      await Database.connect();

      // Verificar si la tarea existe antes de intentar eliminarla
      const taskExists = await this.taskExists(id);
      console.log("taskExists:", taskExists);

      if (taskExists.length >= 1) {
        // La tarea existe, proceder con la eliminación
        await Database.executeQuery("DELETE FROM tareas WHERE tarea_id = ?", [
          id,
        ]);
        return true; // Indicar que la tarea se eliminó con éxito
      } else {
        // La tarea no existe o ya ha sido eliminada
        return false; // Indicar que la tarea no se eliminó
      }
    } finally {
      Database.disconnect();
    }
  }
}

export { TaskModel };
