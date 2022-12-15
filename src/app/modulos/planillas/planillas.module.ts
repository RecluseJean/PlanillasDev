import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { HttpModule } from '@angular/http';

//librerias
// import { Ng2TableModule } from 'ng2-table/ng2-table';
//interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PLANILLAS_ROUTES } from './planillas.routes';

//componentes del modulo
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { TreeTableModule } from 'ng-treetable';

//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { FilterPipeModule } from 'ngx-filter-pipe';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GenerarPlanillaComponent } from './pages/generar-planilla/generar-planilla.component';
import { CalculoPlanillaComponent } from './pages/generar-planilla/modals/calculo-planilla/calculo-planilla.component';
import { ConfirmarCalculoPlanillaComponent } from './pages/generar-planilla/modals/confirmar-calculo-planilla/confirmar-calculo-planilla.component';
import { PlanillasService } from './services/planillas/planillas.service';
import { PrevisualizacionPlanillaComponent } from './pages/generar-planilla/modals/previsualizacion-planilla/previsualizacion-planilla.component';
import { MostrarBoletaComponent } from './pages/generar-planilla/modals/mostrar-boleta/mostrar-boleta.component';
import { EliminarBoletaComponent } from './pages/generar-planilla/modals/eliminar-boleta/eliminar-boleta.component';
import { MostrarBoletaBuscadaComponent } from './pages/generar-planilla/modals/mostrar-boleta/mostrat-boleta-buscada/mostrar-boleta-buscada.component';
import { MostrarRheComponent } from './pages/generar-planilla/modals/mostrar-rhe/mostrar-rhe.component';
import { ConfirmarRegistroRheComponent } from './pages/generar-planilla/modals/mostrar-rhe/confirmar-registro-rhe/confirmar-registro-rhe.component';
import { MostrarRheBuscadaComponent } from './pages/generar-planilla/modals/mostrar-rhe/mostrar-rhe-buscada/mostrar-rhe-buscada.component';
import { AdelantoSueldoComponent } from './pages/adelanto-sueldo/adelanto-sueldo.component';
import { SolicitarAdelantoSueldoComponent } from './pages/adelanto-sueldo/modals/solicitar-adelanto-sueldo/solicitar-adelanto-sueldo.component';
import { MostrarAdelantoSueldoComponent } from './pages/adelanto-sueldo/modals/mostrar-adelanto-sueldo/mostrar-adelanto-sueldo.component';
import { GenerarTxtComponent } from './pages/generar-planilla/modals/generar-txt/generar-txt.component';
import { GestionVacacionesComponent } from './pages/gestion-vacaciones/gestion-vacaciones.component';
import { TrabajadorService } from '../trabajador/services/trabajador/trabajador.service';
import { MostrarVacacionesComponent } from './pages/gestion-vacaciones/modals/mostrar-vacaciones/mostrar-vacaciones.component';
import { TomarVacacionesComponent } from './pages/gestion-vacaciones/modals/tomar-vacaciones/tomar-vacaciones.component';
import { VacacionesService } from './services/vacaciones/vacaciones.service';
import { ConfirmarVacacionComponent } from './pages/gestion-vacaciones/modals/confirmar-vacacion/confirmar-vacacion.component';
import { VenderVacacionesComponent } from './pages/gestion-vacaciones/modals/vender-vacaciones/vender-vacaciones.component';
import { AdelantarVacacionesComponent } from './pages/gestion-vacaciones/modals/adelantar-vacaciones/adelantar-vacaciones.component';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { TipoPlanillaService } from '../configuracion/services/tipo-planilla/tipo-planilla.service';
import { ConfirmarAdelantoSueldoComponent } from './pages/adelanto-sueldo/modals/confirmar-adelanto-sueldo/confirmar-adelanto-sueldo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { RegistrarAdelantoSueldoComponent } from './pages/adelanto-sueldo/modals/registrar-adelanto-sueldo/registrar-adelanto-sueldo.component';
import { GestionSuspencionComponent } from './pages/generar-planilla/modals/gestion-suspencion/gestion-suspencion.component';
import { GenerarExcelComponent } from './pages/generar-planilla/modals/generar-excel/generar-excel.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { MostrarPrestamoComponent } from './pages/prestamo/modals/mostrar-prestamo/mostrar-prestamo.component';
import { RegistrarPrestamoComponent } from './pages/prestamo/modals/registrar-prestamo/registrar-prestamo.component';
import { ConfirmarPrestamoComponent } from './pages/prestamo/modals/confirmar-prestamo/confirmar-prestamo.component';
import { ListarVacacionesComponent } from './pages/gestion-vacaciones/modals/listar-vacaciones/listar-vacaciones.component';



@NgModule({
  imports: [
    CommonModule,
    PLANILLAS_ROUTES,
    SharedModule,
    // Ng2TableModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    // HttpModule,
    PipesModule,
    TreeTableModule,
    //Ng2SmartTableModule,
    NgbModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    BsDatepickerModule,
    DatePickerModule,
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
    GenerarPlanillaComponent,
    CalculoPlanillaComponent,
    ConfirmarCalculoPlanillaComponent,
    PrevisualizacionPlanillaComponent,
    MostrarBoletaComponent,
    EliminarBoletaComponent,
    MostrarBoletaBuscadaComponent,
    MostrarRheComponent,
    ConfirmarRegistroRheComponent,
    MostrarRheBuscadaComponent,
    AdelantoSueldoComponent,
    SolicitarAdelantoSueldoComponent,
    MostrarAdelantoSueldoComponent,
    GenerarTxtComponent,
    GestionVacacionesComponent,
    MostrarVacacionesComponent,
    TomarVacacionesComponent,
    ConfirmarVacacionComponent,
    VenderVacacionesComponent,
    AdelantarVacacionesComponent,
    ConfirmarAdelantoSueldoComponent,
    RegistrarAdelantoSueldoComponent,
    GenerarExcelComponent,
    GestionSuspencionComponent,
    PrestamoComponent,
    MostrarPrestamoComponent,
    RegistrarPrestamoComponent,
    ConfirmarPrestamoComponent,
    ListarVacacionesComponent
  ],
  entryComponents: [
    CalculoPlanillaComponent,
    ConfirmarCalculoPlanillaComponent,
    PrevisualizacionPlanillaComponent,
    MostrarBoletaComponent,
    EliminarBoletaComponent,
    MostrarBoletaBuscadaComponent,
    MostrarRheComponent,
    ConfirmarRegistroRheComponent,
    MostrarRheBuscadaComponent,
    SolicitarAdelantoSueldoComponent,
    MostrarAdelantoSueldoComponent,
    GenerarTxtComponent,
    MostrarVacacionesComponent,
    TomarVacacionesComponent,
    VenderVacacionesComponent,
    AdelantarVacacionesComponent,
    ConfirmarVacacionComponent,
    ConfirmarAdelantoSueldoComponent,
    RegistrarAdelantoSueldoComponent,
    GenerarExcelComponent,
    GestionSuspencionComponent,
    MostrarPrestamoComponent,
    RegistrarPrestamoComponent,
    ConfirmarPrestamoComponent,
    ListarVacacionesComponent
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,

      },
      DatePipe,
      UsuarioService,
      PlanillasService,
      TrabajadorService,
      VacacionesService,
      TipoPlanillaService
    ],
})
export class PlanillasModule { }
