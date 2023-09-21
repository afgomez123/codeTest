import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ICategorias } from '../interfaces/ICategorias.models';
import { IUsuarios } from '../interfaces/IUsuarios.models';
import { ITareas } from '../interfaces/ITareas.models';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private usuarios?: IUsuarios[];
  private categorias?: ICategorias[];

  constructor(private http: HttpClient) {}

  public getTareas(): Observable<ITareas[]> {
    return this.http.get<ITareas[]>('http://localhost:3000/api/tasks');
  }

  public getTareasById(id: string): Observable<ITareas> {
    return this.http.get<ITareas>(`http://localhost:3000/api/tasks/${id}`);
  }

  public deleteTareas(
    id?: number
  ): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(
      `http://localhost:3000/api/tasks/${id}`
    );
  }

  public getUsuarios(): Observable<IUsuarios[]> {
    // Cache de usuarios para no llamar la api muchas veces
    if (this.usuarios && this.usuarios.length) {
      return of(this.usuarios);
    }

    return this.http
      .get<IUsuarios[]>('http://localhost:3000/api/users')
      .pipe(tap((data) => (this.usuarios = [...data])));
  }

  public getCategorias(): Observable<ICategorias[]> {
    // Cache de categorias para no llamar la api muchas veces
    if (this.categorias && this.categorias.length) {
      return of(this.categorias);
    }

    return this.http
      .get<ICategorias[]>('http://localhost:3000/api/categories')
      .pipe(tap((data) => (this.categorias = [...data])));
  }

  public setTareas(data: ITareas): Observable<{ message: string; id: string }> {
    return this.http.post<{ message: string; id: string }>(
      'http://localhost:3000/api/tasks',
      data
    );
  }

  public setUpdateTareas(
    id: string,
    data: ITareas
  ): Observable<{ message: string; id: string }> {
    return this.http.put<{ message: string; id: string }>(
      `http://localhost:3000/api/tasks/${id}`,
      data
    );
  }
}
