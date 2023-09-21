import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategorias } from '../interfaces/ICategorias.models';
import { IUsuarios } from '../interfaces/IUsuarios.models';
import { ITareas } from '../interfaces/ITareas.models';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(private http: HttpClient) {}

  public getTareas(): Observable<ITareas[]> {
    return this.http.get<ITareas[]>('http://localhost:3000/api/tasks');
  }

  public getTareasById(id: string): Observable<ITareas[]> {
    return this.http.get<ITareas[]>(`http://localhost:3000/api/tasks/${id}`);
  }

  public deleteTareas(id?:number): Observable<{message: string, id:string}> {
    return this.http.delete<{message: string, id:string}>(`http://localhost:3000/api/tasks/${id}`);
  }

  public getUsuarios(): Observable<IUsuarios[]> {
    return this.http.get<IUsuarios[]>('http://localhost:3000/api/users');
  }

  public getCategorias(): Observable<ICategorias[]> {
    return this.http.get<ICategorias[]>('http://localhost:3000/api/categories');
  }

  public setTareas(data: ITareas): Observable<{message: string, id:string}> {
    return this.http.post<{message: string, id:string}>('http://localhost:3000/api/tasks', data);
  }

  public setUpdateTareas(data: ITareas): Observable<ITareas> {
    return this.http.put('http://localhost:3000/api/tasks', data);
  }
}
