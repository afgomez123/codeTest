import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-tareas',
    pathMatch: 'full',
  },
  {
    path: 'home-tareas',
    loadChildren: () =>
      import('./modules/home-tareas.module').then((m) => m.HomeTareasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
