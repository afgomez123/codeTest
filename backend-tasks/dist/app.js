"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskController_1 = require("./controllers/taskController");
const usuariosController_1 = require("./controllers/usuariosController");
const categoriasController_1 = require("./controllers/categoriasController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
class Server {
    constructor() {
        this.config();
        this.routes();
    }
    config() {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        // Configurar body-parser para manejar solicitudes JSON
        app.use(body_parser_1.default.json());
    }
    routes() {
        app.use("/api/tasks", taskController_1.TaskController);
        app.use("/api/users", usuariosController_1.UsersController);
        app.use("/api/categories", categoriasController_1.CategoriasController);
    }
    start() {
        const httpServer = app.listen(port, () => {
            console.log(`Servidor en ejecución en el puerto ${port}`);
            console.log("HTTP REST API Server running at http://localhost:" +
                httpServer.address().port);
        });
    }
}
// Iniciar el servidor
const server = new Server();
server.start();
console.log("Inicio del servidor");
