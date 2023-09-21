import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareasService } from 'src/app/data/services/tareas.service';
import { finalize, forkJoin } from 'rxjs';
import { IUsuarios } from 'src/app/data/interfaces/IUsuarios.models';
import { ICategorias } from 'src/app/data/interfaces/ICategorias.models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  public isEditing!: boolean;
  public form: FormGroup;
  public formId? : string;
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

  private getInitialData():void {
    this.isLoading = true;

    const apiCalls = {
        usuarios: this.tareasService.getUsuarios(),
        categorias: this.tareasService.getCategorias(),
    }

    // if (this.isEditing) {
    //   apiCalls.tareaActual = this.tareasService.getTareaActual(),
    // }

    forkJoin(apiCalls)
    .pipe(
      finalize(() => {this.isLoading = false;this.form = this.buildForm();
      })
    )
    .subscribe((data: {usuarios: IUsuarios[], categorias: ICategorias[]}) => {
      this.usuarios = [...data.usuarios];
      this.categorias = [...data.categorias]
    })
  }

  private buildForm(): FormGroup {
    console.log(this.isEditing);

    return this.fb.group({
      titulo: [''],
      descripcion: [''],
      fecha_limite: [''],
      completada: [''],
      categoria_id: [''],
      usuario_id: [''],
    });
  }

  submit({value}: any): void {
    this.isLoading = true;
    // Casteando datos
    value.completada = Boolean(value.completada) ? 1 : 0;

    if (this.isEditing) {
      console.log('Editando', value);

      // Logica edicion

      return;;
    }

    console.log(
      'creando', value
    );
      // Logica creacion

      this.tareasService.setTareas(value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((data)=> {
        this.snackBar.open(`${data.message}`, 'Cerrar');
        this.router.navigateByUrl('/home-tareas');
      })

  }
}
