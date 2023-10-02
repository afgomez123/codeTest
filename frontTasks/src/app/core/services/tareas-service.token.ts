import { InjectionToken } from '@angular/core';
import { ITareasService } from '../interfaces/tareas-service.interface';


export const TAREAS_SERVICE_TOKEN = new InjectionToken<ITareasService>('TareasService');
