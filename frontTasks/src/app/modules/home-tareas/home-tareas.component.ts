import { Component } from '@angular/core';
import { TareasService } from 'src/app/data/services/tareas.service';

@Component({
  selector: 'app-home-tareas',
  templateUrl: './home-tareas.component.html',
  styleUrls: ['./home-tareas.component.scss'],
})
export class HomeTareasComponent {
  constructor(private tareasService: TareasService) {
    this.tareasService.getTareas().subscribe(res => console.log(res));
  }
}
