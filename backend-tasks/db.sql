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


INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(1, 'Backlog');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(2, 'Todo');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(3, 'Done');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(4, 'In progress');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(5, 'Blocked');
INSERT INTO tareas.categorias (categoria_id, nombre) VALUES(6, 'Other');


INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(1, 'Andres', 'afgomez@hotmail.com');
INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(2, 'Carlos ', 'carlo@gmail.com');
INSERT INTO tareas.usuarios (usuario_id, nombre, email) VALUES(3, 'Yennifer', 'yen@hotmail.com');


INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(1, 'Bugg banner', 'Please fix the bugg in the banner , the images do not moves in 2 second', '2023-09-19', 0, 1, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(2, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 2, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(3, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 3, 3);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(4, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 4, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(5, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 5, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(6, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 6, 3);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(7, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 1, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(8, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 2, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(9, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 3, 3);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(10, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 4, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(11, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 5, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(13, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 1, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(14, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 2, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(15, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-28', 0, 1, 3);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(16, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 1, 1);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(17, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-24', 0, 2, 2);
INSERT INTO tareas.tareas (tarea_id, titulo, descripcion, fecha_limite, completada, categoria_id, usuario_id) VALUES(18, 'Bugg banner2', 'Please fix the bugg in the banner , test 2', '2023-09-30', 0, 1, 3);