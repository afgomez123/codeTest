import { Component, OnInit } from '@angular/core';

import { Observable, map, finalize } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ITareas } from 'src/app/data/interfaces/ITareas.models';
import { TareasService } from 'src/app/data/services/tareas.service';
import { ICategorias } from 'src/app/data/interfaces/ICategorias.models';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  tasks!: ITareas[];
  filteredTasks!: ITareas[];
  isDeleting?: boolean;
  isLoading?: boolean;
  categoryFilter$!: Observable<ICategorias[]>;

  constructor(
    private tareasService: TareasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFilters();
    this.getTasks();
  }

  getFilters(): void {
    this.categoryFilter$ = this.tareasService.getCategorias();
  }

  getTasks(): void {
    this.isLoading = true;

    this.tareasService.getTareas()
    .pipe(finalize(() => (this.isLoading = false)))
    .subscribe((res)=> {
      this.tasks = [...res].sort((a, b) =>  b.tarea_id! - a.tarea_id! );

      this.filteredTasks = [...this.tasks];
    })
  }

  filterTasksComplete({ checked }: { checked: boolean }) {
    const completada = checked ? 1 : 0;

    this.filteredTasks = this.tasks.filter((task) => task.completada === Number(completada))
  }

  filterByCategory({ value }: { value: number }): void {
    this.filteredTasks  = this.tasks.filter((task) => task.categoria_id === value);
  }

  resetFilter(): void {
    this.filteredTasks = this.tasks;
  }

  deleteTask(id?: number): void {
    this.isDeleting = true;

    if (!confirm(`Estas seguro de borrar la tarea?`)) {
      this.isDeleting = false;

      return;
    }

    this.tareasService
      .deleteTareas(id)
      .pipe(finalize(() => (this.isDeleting = false)))
      .subscribe((res) => {
        this.snackBar.open(`Tarea ${res.id}: ${res.message}`, 'Cerrar');

        this.getTasks();
      });
  }
}
