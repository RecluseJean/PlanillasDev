import { Routes, RouterModule } from '@angular/router';
import { GestionUsuariosComponent } from './pages/usuarios/gestion-usuario.component';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionUtilitarioComponent } from './pages/utilitario/gestion-utilitario.component';
import { GestionPaginasComponent } from './pages/paginas/gestion-paginas.component';


const administracionRoutes: Routes = [
{path:'gestionusuarios',component:GestionUsuariosComponent,data: { titulo: 'Gestión Usuarios', icono:'../../assets/images/icon/svg/paginaSVG/icon-gestion-usuarios.svg' }, canActivate: [ LoginGuardGuard ]},
{path:'gestionpaginas',component:GestionPaginasComponent,data: { titulo: 'Gestión Paginas', icono:'../../assets/images/icon/svg/paginaSVG/icon-gestion-paginas.svg' }, canActivate: [ LoginGuardGuard ]},
{path:'gestionutilitario',component:GestionUtilitarioComponent,data: { titulo: 'Gestión Utilitario', icono:'../../assets/images/icon/svg/paginaSVG/icon-gestion-usuarios.svg' }, canActivate: [ LoginGuardGuard ]},
];



export const ADMINISTRACION_ROUTES = RouterModule.forChild( administracionRoutes );
