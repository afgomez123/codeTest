import { Component, OnInit } from '@angular/core';

import { Observable, finalize } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ICategorias } from 'src/app/core/interfaces/ICategorias.models';
import { ITareas } from 'src/app/core/interfaces/ITareas.models';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  public categoryFilter$!: Observable<ICategorias[]>;
  public filteredTasks!: ITareas[];
  public isDeleting?: boolean;
  public isError = false;
  public isLoading?: boolean;
  public tasks!: ITareas[];

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

    this.tareasService
      .getTareas()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.tasks = [...res].sort((a, b) => b.tarea_id! - a.tarea_id!);

          this.filteredTasks = [...this.tasks];
        },
        error: () => {
          this.isError = true;
        },
      });
  }

  filterTasksComplete({ checked }: { checked: boolean }) {
    this.isLoading = true;

    const completada = checked ? 1 : 0;

    this.filteredTasks = this.tasks.filter(
      (task) => task.completada === Number(completada)
    );

    this.isLoading = false;
  }

  filterByCategory({ value }: { value: number }): void {
    this.isLoading = true;

    this.filteredTasks = this.tasks.filter(
      (task) => task.categoria_id === value
    );

    this.isLoading = false;
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
