import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTareasComponent } from './home-tareas/home-tareas.component';
import { HomeTareasRoutingModule } from './home-tareas-routing.module';

@NgModule({
  declarations: [HomeTareasComponent],
  imports: [CommonModule, HomeTareasRoutingModule],
})
export class HomeTareasModule {}
