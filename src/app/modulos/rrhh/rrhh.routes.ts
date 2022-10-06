import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { BuzonSugerenciaComponent } from './pages/buzon-sugerencia/buzon-sugerencia-component';
import { ComunicadosComponent } from './pages/comunicados/comunicados.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { PuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/puesto-area-empresa.component';
import { AreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/area-departamento-empresa.component';
import { DepartamentoEmpresaComponent } from './pages/departamentoEmpresa/departamento-empresa.component';
import { OrganigramaComponent } from './pages/organigrama/organigrama.component';
//componentes


const rrhhRoutes: Routes = [

    { path: 'calendario', component: CalendarioComponent, data: { titulo: 'Calendario', icono: '../../assets/images/icon/svg/paginaSVG/icon-gestion-equipo.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'comunicados', component: ComunicadosComponent, data: { titulo: 'Comunicados', icono: '../../assets/images/icon/svg/paginaSVG/icon-reclutamiento.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'buzon', component: BuzonSugerenciaComponent, data: { titulo: 'Buzon Sugerencias', icono: '../../assets/images/icon/svg/paginaSVG/icon-reclutamiento.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'puestoareaempresa', component: PuestoAreaEmpresaComponent, data: { titulo: 'Puesto de Área', icono: '../../assets/images/icon/svg/paginaSVG/icon-areas.svg' }, canActivate: [LoginGuardGuard] },
    { path: 'areadepartamentoempresa', component: AreaDepartamentoEmpresaComponent, data: { titulo: 'Área Empresa', icono: '../../assets/images/icon/svg/paginaSVG/icon-area-empresa.svg' }, canActivate: [LoginGuardGuard] },
    { path: 'departamentoempresa', component: DepartamentoEmpresaComponent, data: {titulo: 'Departamento Empresa', icono:'../../assets/images/icon/svg/paginaSVG/icon-cargos.svg'}, canActivate: [ LoginGuardGuard ]},
    { path: 'organigrama', component: OrganigramaComponent, data: {titulo: 'Organigrama', icono:'../../assets/images/icon/svg/paginaSVG/icon-cargos.svg'}, canActivate: [ LoginGuardGuard ]},
];



export const RRHH_ROUTES = RouterModule.forChild( rrhhRoutes );
