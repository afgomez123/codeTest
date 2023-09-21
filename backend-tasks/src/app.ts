// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { TaskController } from "./controllers/taskController";
import { UsersController } from "./controllers/usuariosController";
import { CategoriasController } from "./controllers/categoriasController";
import cors from 'cors'; // Importa el paquete cors

const app = express();

const port = process.env.PORT || 3000;

class Server {

  constructor() {
    this.config();
    this.routes();
  }

  config(): void {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    // Configurar body-parser para manejar solicitudes JSON
    app.use(bodyParser.json());
  }

  routes(): void {
    app.use("/api/tasks", TaskController);
    app.use("/api/users", UsersController);
    app.use("/api/categories", CategoriasController);
  }

  start() {
    const httpServer: any = app.listen(port, () => {
      console.log(
        "Servidor corriendo en http://localhost:" +
          httpServer.address().port
      );
    });
  }
}
// Iniciar el servidor
const server = new Server();
server.start();
