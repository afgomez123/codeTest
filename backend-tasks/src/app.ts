// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { TaskController } from "./controllers/taskController";

const app = express();
const port = process.env.PORT || 3000;

// Configurar body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Configurar rutas
app.use("/api/tasks", TaskController);

// Iniciar el servidor
const httpServer: any = app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
  console.log(
    "HTTP REST API Server running at http://localhost:" +
      httpServer.address().port
  );
});
