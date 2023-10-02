import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Observable, finalize } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ICategorias } from 'src/app/core/interfaces/ICategorias.models';
import { ITareas } from 'src/app/core/interfaces/ITareas.models';
import { IUsuarios } from 'src/app/core/interfaces/IUsuarios.models';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ITareasService } from 'src/app/core/interfaces/tareas-service.interface';
import { TAREAS_SERVICE_TOKEN } from 'src/app/core/services/tareas-service.token';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  public categoryFilter$!: Observable<ICategorias[]>;
  public userFilter$!: Observable<IUsuarios[]>;
  public filteredTasks!: ITareas[];
  public isDeleting?: boolean;
  public isError = false;
  public isLoading?: boolean;
  public tasks!: ITareas[];

  @ViewChild('categoriaSelect') categoriaSelect!: MatSelect;
  @ViewChild('usuarioSelect') usuarioSelect!: MatSelect;
  @ViewChild('completeToggle') completeToggle!: MatSlideToggle;

  constructor(
    @Inject(TAREAS_SERVICE_TOKEN) private tareasService: ITareasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFilters();
    this.getTasks();
  }

  getFilters(): void {
    this.categoryFilter$ = this.tareasService.getCategorias();
    this.userFilter$ = this.tareasService.getUsuarios();
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

  filterByUser({ value }: { value: number }): void {
    this.isLoading = true;

    this.filteredTasks = this.tasks.filter((task) => task.usuario_id === value);

    this.isLoading = false;
  }

  resetFilter(): void {
    this.filteredTasks = this.tasks;

    // Restablecer los campos de selección a su estado predeterminado
    this.categoriaSelect.value = null;
    this.usuarioSelect.value = null;
    this.completeToggle.checked = false;
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
