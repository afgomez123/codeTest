// tareas-service.interface.ts
// Dependency inversion
import { Observable } from 'rxjs';
import { IUsuarios } from '../interfaces/IUsuarios.models';
import { ICategorias } from '../interfaces/ICategorias.models';
import { ITareas } from '../interfaces/ITareas.models';

export interface ITareasService {
  getTareas(): Observable<ITareas[]>;
  getTareasById(id: string): Observable<ITareas>;
  deleteTareas(id?: number): Observable<{ message: string; id: string }>;
  getUsuarios(): Observable<IUsuarios[]>;
  getCategorias(): Observable<ICategorias[]>;
  setTareas(data: ITareas): Observable<{ message: string; id: string }>;
  setUpdateTareas(
    id: string,
    data: ITareas
  ): Observable<{ message: string; id: string }>;
}
