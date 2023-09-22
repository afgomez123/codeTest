import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, finalize, forkJoin, of } from 'rxjs';

import { ICategorias } from 'src/app/core/interfaces/ICategorias.models';
import { ITareas } from 'src/app/core/interfaces/ITareas.models';
import { IUsuarios } from 'src/app/core/interfaces/IUsuarios.models';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  public isEditing!: boolean;
  public form: FormGroup;
  public formId: string;
  public isLoading!: boolean;
  public usuarios!: IUsuarios[];
  public categorias!: ICategorias[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tareasService: TareasService,
    private snackBar: MatSnackBar
  ) {
    this.formId = this.route.snapshot.params['id'];
    this.isEditing = Boolean(this.formId);
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData(): void {
    this.isLoading = true;

    /**
     * Listamos las apis que necesitamos.
     */
    const apiCalls: {
      usuarios: Observable<IUsuarios[]>;
      categorias: Observable<ICategorias[]>;
      tareaActual: Observable<null | ITareas>;
    } = {
      usuarios: this.tareasService.getUsuarios(),
      categorias: this.tareasService.getCategorias(),
      tareaActual: of(null),
    };

    if (this.isEditing) {
      // agregamos observable a la llamada cuando es modo edicion para traer datos de la tarea a editar.
      apiCalls.tareaActual = this.tareasService.getTareasById(this.formId!);
    }

    forkJoin(apiCalls)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.usuarios = [...data.usuarios];
        this.categorias = [...data.categorias];

        // Llamamos buildForm y enviamos tarea actual sea o no sea modo edicion.
        this.form = this.buildForm(data.tareaActual);
      });
  }

  private buildForm(currentTask?: ITareas | null): FormGroup {
    /**
     * CurrentTask solo para modo edicion, Precargamos datos cuando estamos en edicion,
     * si no los valores son vacios por defecto.
     */
    const date = currentTask?.fecha_limite
      ? new Date(currentTask.fecha_limite).toISOString().substring(0, 10)
      : null;

    return this.fb.group({
      titulo: [{ value: currentTask?.titulo ?? '', disabled: false }],
      descripcion: [{ value: currentTask?.descripcion ?? '', disabled: false }],
      fecha_limite: [{ value: date ?? '', disabled: false }],
      completada: [
        { value: Boolean(currentTask?.completada) ?? '', disabled: false },
      ],
      categoria_id: [
        { value: currentTask?.categoria_id ?? '', disabled: false },
      ],
      usuario_id: [{ value: currentTask?.usuario_id ?? '', disabled: false }],
    });
  }

  public submit({ value }: FormGroup): void {
    this.isLoading = true;
    // Casteando datos
    value.completada = Boolean(value.completada) ? 1 : 0;

    /**
     * Si es modo edicion hacemos el submit con el ID del task y mandamos toda la data.
     */
    if (this.isEditing) {
      this.tareasService
        .setUpdateTareas(this.formId, value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((data) => {
          this.snackBar.open(`${data.message}`, 'Cerrar');
          this.router.navigateByUrl('/home-tareas');
        });

      return;
    }

    // Si es creacion ejecutamos api para crear tareas.
    this.tareasService
      .setTareas(value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.snackBar.open(`${data.message}`, 'Cerrar');
        this.router.navigateByUrl('/home-tareas');
      });
  }
}
