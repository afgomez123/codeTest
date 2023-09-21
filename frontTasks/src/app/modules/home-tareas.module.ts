import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTareasComponent } from './home-tareas/home-tareas.component';
import { HomeTareasRoutingModule } from './home-tareas-routing.module';
import { FormularioComponent } from './home-tareas/formulario/formulario.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeTareasComponent, FormularioComponent],
  imports: [CommonModule, HomeTareasRoutingModule,MatIconModule],
})
export class HomeTareasModule {}
