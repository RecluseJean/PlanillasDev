import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { TrabajadorComponent } from './modulos/trabajador/trabajador.component';
import { PlanillasComponent } from './modulos/planillas/planillas.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { InicioComponent } from './shared/Inicio/inicio.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { AsistenciaComponent } from './shared/asistencia/asistencia.component';
import { EquipoComponent } from './modulos/equipo/equipo.component';
import { CambiarPasswordComponent } from './shared/cambiar-password/cambiar-password.component';
import { RecursosHumanosComponent } from './modulos/rrhh/rrhh.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio', icono: '../../assets/images/icon/svg/icon-inicio.svg' } },
  { path: 'cambiarpassword/:id', component: CambiarPasswordComponent},
  { path: 'asistencia', component: AsistenciaComponent, data: { titulo: 'Asistencia', icono: '../../assets/images/icon/svg/icon-inicio.svg' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: TrabajadorComponent,
    loadChildren: './modulos/trabajador/trabajador.module#TrabajadorModule'
  },
  {
    path: '',
    component: PlanillasComponent,
    loadChildren: './modulos/planillas/planillas.module#PlanillasModule'
  },
  {
    path: '',
    component: ConfiguracionComponent,
    loadChildren: './modulos/configuracion/configuracion.module#ConfiguracionModule'
  },
  {
    path: '',
    component: AdministracionComponent,
    loadChildren: './modulos/administracion/administracion.module#AdministracionModule'
  },
  {
    path: '',
    component: ContabilidadComponent,
    loadChildren: './modulos/contabilidad/contabilidad.module#ContabilidadModule'
  },
  {
    path: '',
    component: EquipoComponent,
    loadChildren: './modulos/equipo/equipo.module#EquipoModule'
  },

  {
    path: '',
    component: RecursosHumanosComponent,
    loadChildren: './modulos/rrhh/rrhh.module#RecursosHumanosModule'
  },
  
  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
