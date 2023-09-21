export interface ITareas {
  tarea_id?: number,
  titulo?: string,
  descripcion?: string,
  fecha_limite?: string | Date,
  completada?: number,
  categoria_id?:number,
  usuario_id?: number
}
