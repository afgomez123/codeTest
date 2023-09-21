import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTareasComponent } from './home-tareas.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTareasComponent,
    children: [
      {
        path: '',
        component: ListarComponent,
      },
      {
        path: 'formulario',
        component: FormularioComponent,
      },
      {
        path: 'formulario/:id',
        component: FormularioComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTareasRoutingModule {}
