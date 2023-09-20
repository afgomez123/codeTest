"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskController_1 = require("./controllers/taskController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Configurar body-parser para manejar solicitudes JSON
app.use(body_parser_1.default.json());
// Configurar rutas
app.use("/api/tasks", taskController_1.TaskController);
// Iniciar el servidor
const httpServer = app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
    console.log("HTTP REST API Server running at http://localhost:" +
        httpServer.address().port);
});
