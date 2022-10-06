import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GenerarPlanillaComponent } from './pages/generar-planilla/generar-planilla.component';
import { AdelantoSueldoComponent } from './pages/adelanto-sueldo/adelanto-sueldo.component';
import { GestionVacacionesComponent } from './pages/gestion-vacaciones/gestion-vacaciones.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
//componentes


const planillasRoutes: Routes = [

    { path: 'generarplanillas', component: GenerarPlanillaComponent, data: { titulo: 'Generar Planilla', icono:'../../assets/images/icon/svg/paginaSVG/icon-generar-planillas.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'adelantosueldo', component: AdelantoSueldoComponent, data: { titulo: 'Adelanto Sueldo', icono:'../../assets/images/icon/svg/paginaSVG/icon-adelanto-sueldo.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'prestamo', component: PrestamoComponent, data: { titulo: 'Préstamo', icono:'../../assets/images/icon/svg/paginaSVG/icon-adelanto-sueldo.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'vacaciones', component: GestionVacacionesComponent, data: { titulo: 'Vacaciones', icono:'../../assets/images/icon/svg/paginaSVG/icon-gestion-vacaciones.svg' },  canActivate: [ LoginGuardGuard ] },
    //copiar para compras
];



export const PLANILLAS_ROUTES = RouterModule.forChild( planillasRoutes );
