import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';

import { GestionTrabajadorComponent } from './pages/gestion-trabajador/gestion-trabajador.component';
import { ControlAsistenciaComponent } from './pages/control-asistencia/control-asistencia.component';
import { DerechoHabientesComponent } from './pages/derecho-habientes/derecho-habientes.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { InfoGestionTrabajadorComponent } from './pages/gestion-trabajador/modals/info-gestion-trabajador/info-gestion-trabajador.component';

const trabajadorRoutes: Routes = [

    { path: 'gestiontrabajador', component: GestionTrabajadorComponent, data: { titulo: 'Gestión Trabajador', icono: '../../assets/images/icon/svg/paginaSVG/icon-gestion-trabajador.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'controlasistencia', component: ControlAsistenciaComponent, data: { titulo: 'Gestión de Asistencias', icono: '../../assets/images/icon/svg/paginaSVG/icon-control-asistencia.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'derechohabientes', component: DerechoHabientesComponent, data: { titulo: 'Derecho Habientes', icono: '../../assets/images/icon/svg/paginaSVG/icon-derecho-habientes.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'infoGestionTrabajador', component: InfoGestionTrabajadorComponent, data: { titulo: 'Información Trabajador', icono: '../../assets/images/icon/svg/paginaSVG/icon-gestion-usuarios.svg' }, canActivate: [ LoginGuardGuard ] },
    { path: 'solicitud', component: SolicitudComponent, data: { titulo: 'Solicitud', icono: '../../assets/images/icon/svg/paginaSVG/icon-solicitud.svg'}, canActivate: [LoginGuardGuard]},

];

export const TRABAJADOR_ROUTES = RouterModule.forChild( trabajadorRoutes );
