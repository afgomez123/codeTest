import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTareasComponent } from './home-tareas/home-tareas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeTareasComponent,
      },
      //add more routes if it is necessary
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTareasRoutingModule {}
