import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionEquipoComponent } from './pages/gestion-equipo/gestion-equipo.component';
import { ReclutamientoComponent } from './pages/reclutamiento/reclutamiento.component';
//componentes


const equipoRoutes: Routes = [

  { path: 'equipo', component: GestionEquipoComponent, data: { titulo: 'Gestión equipo', icono: '../../assets/images/icon/svg/paginaSVG/icon-gestion-equipo.svg' },  canActivate: [ LoginGuardGuard ] },
  { path: 'reclutamiento', component: ReclutamientoComponent, data: { titulo: 'Reclutamiento', icono: '../../assets/images/icon/svg/paginaSVG/icon-reclutamiento.svg' },  canActivate: [ LoginGuardGuard ] },
];



export const EQUIPO_ROUTES = RouterModule.forChild( equipoRoutes );
