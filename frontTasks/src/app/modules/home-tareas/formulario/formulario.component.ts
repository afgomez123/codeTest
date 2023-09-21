import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareasService } from 'src/app/data/services/tareas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  public isEdit!: boolean;

  public form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tareasService: TareasService
  ) {}

  ngOnInit(): void {
    // Acceder al valor del parámetro ID
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID:', id);
    });
  }
}
