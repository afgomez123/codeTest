// // src/models/taskModel.ts
// import mysql, { RowDataPacket } from 'mysql2/promise';

// class TaskModel {
//   private static async getDbConnection() {
//     return mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '',
//       database: 'tareas',
//     });
//   }

//   static async getAllTasks() {
//     const connection = await this.getDbConnection();
//     try {
//       const [rows] = await connection.execute('SELECT * FROM tareas');
//       return rows as RowDataPacket[]; // Hacer una comprobación de tipo
//     } finally {
//       connection.end(); // Cierra la conexión después de usarla
//     }
//   }

//   static async createTask({ description, completed }: { description: string; completed: boolean }) {
//     const connection = await this.getDbConnection();
//     try {
//       const [result] = await connection.execute('INSERT INTO tareas (titulo, descripcion, completada) VALUES (?, ?)', [description, completed]);
//       if (result && 'insertId' in result) {
//         return result.insertId as number;
//       } else {
//         throw new Error('No se pudo obtener el ID de inserción.');
//       }
//     } finally {
//       connection.end(); // Cierra la conexión después de usarla
//     }
//   }

//   static async deleteTask(id: string) {
//     const connection = await this.getDbConnection();
//     try {
//       await connection.execute('DELETE FROM tareas WHERE tarea_id = ?', [id]);
//     } finally {
//       connection.end(); // Cierra la conexión después de usarla
//     }
//   }
// }

// export { TaskModel };

// src/models/taskModel.ts
import { RowDataPacket } from "mysql2/promise";
import { Database } from "../utils/Database";

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
    description,
    completed,
  }: {
    description: string;
    completed: boolean;
  }) {
    try {
      await Database.connect();
      const [result] = await Database.executeQuery(
        "INSERT INTO tareas (titulo, descripcion, completada) VALUES (?, ?)",
        [description, completed]
      );
      if (result && "insertId" in result) {
        return result.insertId as number;
      } else {
        throw new Error("No se pudo obtener el ID de inserción.");
      }
    } finally {
      Database.disconnect();
    }
  }

  // static async deleteTask(id: string) {
  //   try {
  //     await Database.connect();
  //     await Database.executeQuery('DELETE FROM tareas WHERE tarea_id = ?', [id]);
  //   } finally {
  //     Database.disconnect();
  //   }
  // }

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
