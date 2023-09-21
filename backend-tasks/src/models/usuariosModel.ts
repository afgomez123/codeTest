import { RowDataPacket } from "mysql2/promise";
import { Database } from "../utils/database";

class UsuariosModel {
  static async getAllUsers() {
    try {
      await Database.connect();
      const rows = await Database.executeQuery("SELECT * FROM usuarios ORDER BY nombre ASC");
      return rows as RowDataPacket[];
    } finally {
      Database.disconnect();
    }
  }
}

export { UsuariosModel };
