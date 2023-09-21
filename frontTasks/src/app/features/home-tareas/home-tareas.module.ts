import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormularioComponent } from './formulario/formulario.component';
import { HomeTareasComponent } from './home-tareas.component';
import { HomeTareasRoutingModule } from './home-tareas-routing.module';
import { ListarComponent } from './listar/listar.component';

@NgModule({
  declarations: [HomeTareasComponent, FormularioComponent, ListarComponent],
  imports: [
    CommonModule,
    HomeTareasRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class HomeTareasModule {}
