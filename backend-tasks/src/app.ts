// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { TaskController } from "./controllers/taskController";
import { UsersController } from "./controllers/usuariosController";
import { CategoriasController } from "./controllers/categoriasController";

const app = express();
const port = process.env.PORT || 3000;

class Server {

  constructor() {
    this.config();
    this.routes();
  }

  config(): void {
    app.use(express.json());
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
      console.log(`Servidor en ejecución en el puerto ${port}`);
      console.log(
        "HTTP REST API Server running at http://localhost:" +
          httpServer.address().port
      );
    });
  }
}
// Iniciar el servidor
const server = new Server();
server.start();
console.log("Inicio del servidor");
