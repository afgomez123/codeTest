// src/utils/Database.ts
import mysql, { RowDataPacket } from 'mysql2/promise';

class Database {
  private static connection: mysql.Connection | null = null;

  static async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tareas',
      });
    }
  }

  static async disconnect() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }

  static async executeQuery(query: string, params: any[] = []) {
    if (!this.connection) {
      throw new Error('No se ha establecido la conexión a la base de datos.');
    }

    try {
      const [rows] = await this.connection.execute(query, params);
      return rows as RowDataPacket[];
    } catch (error: any) {
      throw new Error(`Error al ejecutar la consulta: ${error.message}`);
    }
  }
}

export { Database };
