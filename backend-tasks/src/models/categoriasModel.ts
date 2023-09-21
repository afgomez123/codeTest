import { RowDataPacket } from "mysql2/promise";
import { Database } from "../utils/database";

class CategoriasModel {
  static async getAllCategorias() {
    try {
      await Database.connect();
      const rows = await Database.executeQuery("SELECT * FROM categorias ORDER BY nombre ASC");
      return rows as RowDataPacket[];
    } finally {
      Database.disconnect();
    }
  }
}

export { CategoriasModel };
