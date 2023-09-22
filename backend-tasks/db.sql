-- Crea la base de datos "tareas"
CREATE DATABASE tareas;

-- Usa la base de datos "tareas"
USE tareas;

-- Crea la tabla "categorias"
CREATE TABLE categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crea la tabla "usuarios"
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Crea la tabla "tareas"
CREATE TABLE tareas (
    tarea_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_limite DATE,
    completada INT,
    categoria_id INT,
    usuario_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

Crear categorias 
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(1, 'Diseno');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(2, 'Analisis');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(3, 'Desarrollo');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(4, 'Pruebas');

Crear usuarios
INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(1, 'Andres', 'afgomez@hotmail.com');
INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(2, 'Carlos ', 'carlo@gmail.com');
INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(3, 'Yennifer', 'yen@hotmail.com');

Crear tareas
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(1, 'Probar Task APP', 'Probar toda la app', '2023-09-25', 0, 1, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(2, 'Diseñar nuevos modulos', 'Diseñar nuevos modulos para la aplicacion de task APP', '2023-09-30', 0, 2, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(3, 'Desarrollar TaskView', 'Desarrollar modulo para visualizar tareas sin necesidad de edicion', '2023-10-01', 0, 3, 3);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(4, 'Desarrollar autenticacion', 'Agregar modulo de autenticacion, no requerida, solo cuando se quiera guardar la informacion para usuarios.', '2023-10-10', 0, 4, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(5, 'Diseñar login', 'Diseñar pantalla de login', '2023-10-15', 1, 1, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(6, 'Crear nuevos usuarios', 'Crear nuevos usuarios en la base de datos', '2023-10-12', 0, 2, 3);