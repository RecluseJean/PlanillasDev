import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';


import { ParametrosComponent } from './pages/parametros/parametros.component';
import { DatosAfpOnpComponent } from './pages/datos-afp-onp/datos-afp-onp.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { CentroCostosComponent } from './pages/centro-costos/centro-costos.component';
import { AnomesComponent } from './pages/anomes/anomes.component';
import { SctrComponent } from './pages/sctr/sctr.component';
import { EpsComponent } from './pages/eps/eps.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { TiposPermisosComponent } from './pages/permisos/permisos.component';
import { RemuneracionesComponent } from './pages/remuneraciones/remuneraciones.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { TipoPlanillaComponent } from './pages/tipo-planilla/tipo-planilla.component';
import { DepartamentoEmpresaComponent } from './pages/departamentoEmpresa/departamento-empresa.component';
import { AreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/area-departamento-empresa.component';
import { PuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/puesto-area-empresa.component';
import { Rango5taComponent } from './pages/rango5ta/rango5ta.component';

//componentes


const configuracionRoutes: Routes = [

    { path: 'parametros', component: ParametrosComponent, data: { titulo: 'Parámetros', icono:'../../assets/images/icon/svg/paginaSVG/icon-parametros.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'sistemapension', component: DatosAfpOnpComponent, data: { titulo: 'Sistema Pensión', icono:'../../assets/images/icon/svg/paginaSVG/icon-sistema-pension.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'empresa', component: EmpresaComponent, data: { titulo: 'Empresa', icono:'../../assets/images/icon/svg/paginaSVG/icon-empresa.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'tipoplanilla', component: TipoPlanillaComponent, data: { titulo: 'Tipo Planilla', icono:'../../assets/images/icon/svg/paginaSVG/icon-tipo-planillas.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'centrocostos', component: CentroCostosComponent, data: { titulo: 'Centro Costos', icono:'../../assets/images/icon/svg/paginaSVG/icon-centro-costo.svg' },  canActivate: [ LoginGuardGuard ] },
    { path: 'sctr', component: SctrComponent, data:{ titulo: 'Seguro Complementario de Trabajo de Riesgo', icono:'../../assets/images/icon/svg/paginaSVG/icon-s-c-t-r.svg'}, canActivate: [LoginGuardGuard]},
    { path: 'eps', component: EpsComponent, data: {titulo: 'Entidad Prestadora de Salud', icono:'../../assets/images/icon/svg/paginaSVG/icon-e-p-s.svg'}, canActivate: [LoginGuardGuard]},
    { path: 'anual', component: AnomesComponent, data: { titulo: 'Año y Mes' , icono:'../../assets/images/icon/svg/paginaSVG/icon-anio-mes.svg'},  canActivate: [ LoginGuardGuard ] },
    { path:'horarios',component: HorariosComponent, data: {titulo: 'Horarios', icono:'../../assets/images/icon/svg/paginaSVG/icon-horarios.svg'}, canActivate: [ LoginGuardGuard ]},
    { path:'permisos',component:TiposPermisosComponent, data: {titulo: 'Tipos de Permisos', icono:'../../assets/images/icon/svg/paginaSVG/icon-permisos.svg'}, canActivate: [ LoginGuardGuard ]},
    { path:'remuneraciones',component:RemuneracionesComponent, data: {titulo: 'Remuneraciones', icono:'../../assets/images/icon/svg/paginaSVG/icon-remuneracion.svg'}, canActivate: [ LoginGuardGuard ]},
    { path:'descuentos',component:DescuentosComponent, data: {titulo: 'Descuentos', icono:'../../assets/images/icon/svg/paginaSVG/icon-descuentos.svg'}, canActivate: [ LoginGuardGuard ]},
    { path: 'departamentoempresa', component: DepartamentoEmpresaComponent, data: {titulo: 'Departamento Empresa', icono:'../../assets/images/icon/svg/paginaSVG/icon-cargos.svg'}, canActivate: [ LoginGuardGuard ]},
    { path: 'areadepartamentoempresa', component: AreaDepartamentoEmpresaComponent, data: { titulo: 'Área Empresa', icono: '../../assets/images/icon/svg/paginaSVG/icon-area-empresa.svg' }, canActivate: [LoginGuardGuard] },
    { path: 'puestoareaempresa', component: PuestoAreaEmpresaComponent, data: { titulo: 'Puesto de Área', icono: '../../assets/images/icon/svg/paginaSVG/icon-areas.svg' }, canActivate: [LoginGuardGuard] },
    { path: 'quinta', component: Rango5taComponent, data: { titulo: 'Rango 5ta', icono: '../../assets/images/icon/svg/paginaSVG/icon-rango5ta.svg' }, canActivate: [LoginGuardGuard] },
    //copiar para compras
];

export const CONFIGURACION_ROUTES = RouterModule.forChild( configuracionRoutes );
