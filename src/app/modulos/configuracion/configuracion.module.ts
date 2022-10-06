
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// import { HttpModule } from '@angular/http';

//librerias
// import { Ng2TableModule } from 'ng2-table/ng2-table';
//interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CONFIGURACION_ROUTES } from './configuracion.routes';

//componentes del modulo
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { TreeTableModule } from 'ng-treetable';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { FilterPipeModule } from 'ngx-filter-pipe';


import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';


import { ParametrosComponent } from './pages/parametros/parametros.component';
import { DatosAfpOnpComponent } from './pages/datos-afp-onp/datos-afp-onp.component';
import { NuevoParametroComponent } from './pages/parametros/modals/nuevo-parametro/nuevo-parametro.component';
import { ConfirmarNuevoParametroComponent } from './pages/parametros/modals/confirmar-nuevo-parametro/confirmar-nuevo-parametro.component';
import { NuevoSistPensionComponent } from './pages/datos-afp-onp/modals/nuevo-sist-pension/nuevo-sist-pension.component';
import { ConfirmarNuevoSistPensionComponent } from './pages/datos-afp-onp/modals/confirmar-nuevo-sist-pension/confirmar-nuevo-sist-pension.component';
import { ParametroService } from './services/parametro/parametro.service';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { NuevoEmpresaComponent } from './pages/empresa/modals/nuevo-empresa/nuevo-empresa.component';
import { ConfirmarNuevoEmpresaComponent } from './pages/empresa/modals/confirmar-nuevo-empresa/confirmar-nuevo-empresa.component';
import { EmpresaService } from './services/empresa/empresa.service';
import { CentroCostosComponent } from './pages/centro-costos/centro-costos.component';
import { NuevoCentroCostosComponent } from './pages/centro-costos/modals/nuevo-centro-costos/nuevo-centro-costos.component';
import { ConfirmarNuevoCentroCostosComponent } from './pages/centro-costos/modals/confirmar-nuevo-centro-costos/confirmar-nuevo-centro-costos.component';
import { CentroCostosService } from './services/centro-costos/centro-costos.service';
import { AnoMesService } from './services/anomes/anomes.service';
import { AnomesComponent } from './pages/anomes/anomes.component';
import { NuevoAnoComponent } from './pages/anomes/modals/nuevo-ano/nuevo-ano.component';
import { ConfirmarNuevoAnoComponent } from './pages/anomes/modals/confirmar-nuevo-ano/confirmar-nuevo-ano.component';
import { NuevoMesComponent } from './pages/anomes/modals/nuevo-mes/nuevo-mes.component';
import { AfpService } from './services/afp/afp.service';
import { SctrComponent } from './pages/sctr/sctr.component';
import { SctrService } from './services/sctr/sctr.service';
import { NuevaSctrComponent } from './pages/sctr/modals/nueva-sctr/nueva-sctr.component';
import { ConfirmarNuevaSctrComponent } from './pages/sctr/modals/confirmar-nueva-sctr/confirmar-nueva-sctr.component';
import { EpsComponent } from './pages/eps/eps.component';
import { NuevoEpsComponent } from './pages/eps/modals/nuevo-eps/nuevo-eps.component';
import { ConfirmarNuevoEpsComponent } from './pages/eps/modals/confirmar-nuevo-eps/confirmar-nuevo-eps.component';
import { EpsService } from './services/eps/eps.service';
import { ConfirmarActualizarMesComponent } from './pages/anomes/modals/confirmar-actualizar-mes/confirmar-actualizar-mes.component';
import { HorarioService } from './services/horarios/horarios.service';
import { NuevoHorarioComponent } from './pages/horarios/modals/nuevo-horario/nuevo-horario.component';
import { NuevoHorarioConfirmarComponent } from './pages/horarios/modals/nuevo-horario-confirmar/nuevo-horario-confirmar.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { TiposPermisosComponent } from './pages/permisos/permisos.component';
import { TiposPermisoService } from './services/permisos/permisos.service';
import { NuevoTipoPermisoComponent } from './pages/permisos/modals/nuevo-permiso/nuevo-permiso.component';
import { NuevoTipoPermisoConfirmarComponent } from './pages/permisos/modals/nuevo-permiso-confirmar/nuevo-permiso-confirmar.component';
import { MostrarEncargadoPlanillaComponent } from './pages/empresa/modals/mostrar-encargado-planilla/mostrar-encargado-planilla.component';
import { NuevoEncargadoPlanillaComponent } from './pages/empresa/modals/nuevo-encargado-planilla/nuevo-encargado-planilla.component';
import { ConfirmarEncargadoPlanillaComponent } from './pages/empresa/modals/confirmar-encargado-planilla/confirmar-encargado-planilla.component';
import { MostrarCuentaCargoComponent } from './pages/empresa/modals/mostrar-cuenta-cargo/mostrar-cuenta-cargo.component';
import { NuevaCuentaCargoComponent } from './pages/empresa/modals/nueva-cuenta-cargo/nueva-cuenta-cargo.component';
import { ConfirmarCuentaCargoComponent } from './pages/empresa/modals/confirmar-cuenta-cargo/confirmar-cuenta-cargo.component';
import { RemuneracionesComponent } from './pages/remuneraciones/remuneraciones.component';
import { RemuneracionesService } from './services/remuneraciones/remuneraciones.service';
import { NuevaRemuneracionComponent } from './pages/remuneraciones/modals/nueva-remuneracion/nueva-remuneracion.component';
import { NuevaRemuneracionConfirmarComponent } from './pages/remuneraciones/modals/nueva-remuneracion-confirmar/nueva-remuneracion-confirmar.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { DescuentosService } from './services/descuentos/descuentos.service';
import { NuevoDescuentoComponent } from './pages/descuentos/modals/nuevo-descuento/nuevo-descuento.component';
import { NuevoDescuentoConfirmarComponent } from './pages/descuentos/modals/nuevo-descuento-confirmar/nuevo-descuento-confirmar.component';


import { SelecDiasferiadoComponent } from './pages/anomes/modals/selec-diasferiado/selec-diasferiado/selec-diasferiado.component';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { TipoPlanillaComponent } from './pages/tipo-planilla/tipo-planilla.component';
import { NuevoTipoPlanillaComponent } from './pages/tipo-planilla/modals/nuevo-tipo-planilla/nuevo-tipo-planilla.component';
import { TipoPlanillaService } from './services/tipo-planilla/tipo-planilla.service';
import { ConfirmarNuevoTipoPlanillaComponent } from './pages/tipo-planilla/modals/confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { PerfilesPlanillaComponent } from './pages/tipo-planilla/modals/perfiles-planilla/perfiles-planilla.component';
import { ConfirmarPerfilesPlanillaComponent } from './pages/tipo-planilla/modals/confirmar-perfiles-planilla/confirmar-perfiles-planilla.component';
import { TrabajadoresPlanillaComponent } from './pages/tipo-planilla/modals/trabajadores-planilla/trabajadores-planilla.component';
import { DepartamentoEmpresaComponent } from './pages/departamentoEmpresa/departamento-empresa.component';
import { ConfirmarNuevoDepartamentoEmpresaComponent } from './pages/departamentoEmpresa/modals/confirmar-nuevo-departamentoEmpresa/confirmar-nuevo-departamento-empresa.component';
import { NuevoDepartamentoEmpresaComponent } from './pages/departamentoEmpresa/modals/nuevo-departamentoEmpresa/nuevo-departamento-empresa.component';
import { DepartamentoEmpresaService } from './services/departamentoEmpresa/departamento-empresa.service';
import { AreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/area-departamento-empresa.component';
import { ConfirmarNuevaAreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/modals/confirmar-nueva-area-departamento-empresa/confirmar-nueva-area-departamento-empresa.component';
import { NuevaAreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/modals/nueva-area-departamento-empresa/nueva-area-departamento-empresa.component';
import { AreaDepartamentoEmpresaService } from './services/area-departamento-empresa/area-departamento-empresa.service';
import { PuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/puesto-area-empresa.component';
import { ConfirmarNuevoPuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/modals/confirmar-nuevo-puesto-area-empresa/confirmar-nuevo-puesto-area-empresa.component';
import { NuevoPuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/modals/nuevo-puesto-area-empresa/nuevo-puesto-area-empresa.component';
import { PuestoAreaEmpresaService } from './services/puesto-area-empresa/puesto-area-empresa.service';
import { TrabajadorService } from '../trabajador/services/trabajador/trabajador.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { Rango5taComponent } from './pages/rango5ta/rango5ta.component';
import { Rango5taService } from './services/rango5ta/rango5ta.service';
import { ActualizarRango5taComponent } from './pages/rango5ta/modals/actualizar-rango5ta/actualizar-rango5ta.component';
import { ConfirmarRango5taComponent } from './pages/rango5ta/modals/confirmar-rango5ta/confirmar-rango5ta.component';
import { PlanillasService } from '../planillas/services/planillas/planillas.service';
import { TxtComponent } from './pages/remuneraciones/modals/txt/txt.component';

@NgModule({
  imports: [
    CommonModule,
    CONFIGURACION_ROUTES,
    SharedModule,
    // Ng2TableModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    PipesModule,
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    BsDatepickerModule,
    DatePickerModule,
    TimePickerModule,
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
  TiposPermisosComponent,
  NuevoTipoPermisoComponent,
  NuevoTipoPermisoConfirmarComponent,
  HorariosComponent,
  NuevoHorarioComponent,
  NuevoHorarioConfirmarComponent,
  ParametrosComponent,
  DatosAfpOnpComponent,
  NuevoParametroComponent,
  ConfirmarNuevoParametroComponent,
  NuevoSistPensionComponent,
  ConfirmarNuevoSistPensionComponent,
  EmpresaComponent,
  NuevoEmpresaComponent,
  ConfirmarNuevoEmpresaComponent,
  CentroCostosComponent,
  NuevoCentroCostosComponent,
  ConfirmarNuevoCentroCostosComponent,
  AnomesComponent,
  NuevoAnoComponent,
  ConfirmarNuevoAnoComponent,
  NuevoMesComponent,
  ConfirmarActualizarMesComponent,
  SctrComponent,
  NuevaSctrComponent,
  ConfirmarNuevaSctrComponent,
  EpsComponent,
  NuevoEpsComponent,
  ConfirmarNuevoEpsComponent,
  MostrarEncargadoPlanillaComponent,
  NuevoEncargadoPlanillaComponent,
  ConfirmarEncargadoPlanillaComponent,
  MostrarCuentaCargoComponent,
  NuevaCuentaCargoComponent,
  ConfirmarCuentaCargoComponent,
  RemuneracionesComponent,
  NuevaRemuneracionComponent,
  NuevaRemuneracionConfirmarComponent,
  DescuentosComponent,
  NuevoDescuentoComponent,
  NuevoDescuentoConfirmarComponent,
  SelecDiasferiadoComponent,
  TipoPlanillaComponent,
  NuevoTipoPlanillaComponent,
  ConfirmarNuevoTipoPlanillaComponent,
  PerfilesPlanillaComponent,
  ConfirmarPerfilesPlanillaComponent,
  TrabajadoresPlanillaComponent,
  DepartamentoEmpresaComponent,
  ConfirmarNuevoDepartamentoEmpresaComponent,
  NuevoDepartamentoEmpresaComponent,
  AreaDepartamentoEmpresaComponent,
  ConfirmarNuevaAreaDepartamentoEmpresaComponent,
  NuevaAreaDepartamentoEmpresaComponent,
  PuestoAreaEmpresaComponent,
  NuevoPuestoAreaEmpresaComponent,
  ConfirmarNuevoPuestoAreaEmpresaComponent,
  Rango5taComponent,
  ActualizarRango5taComponent,
  ConfirmarRango5taComponent,
  TxtComponent
  ],
  entryComponents: [
    NuevoTipoPermisoComponent,
    NuevoTipoPermisoConfirmarComponent,
    NuevoHorarioComponent,
    NuevoHorarioConfirmarComponent,
    NuevoParametroComponent,
    ConfirmarNuevoParametroComponent,
    NuevoSistPensionComponent,
    ConfirmarNuevoSistPensionComponent,
    NuevoEmpresaComponent,
    ConfirmarNuevoEmpresaComponent,
    NuevoCentroCostosComponent,
    ConfirmarNuevoCentroCostosComponent,
    NuevaSctrComponent,
    ConfirmarNuevaSctrComponent,
    NuevoEpsComponent,
    ConfirmarNuevoEpsComponent,
    NuevoAnoComponent,
    ConfirmarNuevoAnoComponent,
    NuevoMesComponent,
    ConfirmarActualizarMesComponent,
    MostrarEncargadoPlanillaComponent,
    NuevoEncargadoPlanillaComponent,
    ConfirmarEncargadoPlanillaComponent,
    MostrarCuentaCargoComponent,
    NuevaCuentaCargoComponent,
    ConfirmarCuentaCargoComponent,
    NuevaRemuneracionComponent,
    NuevaRemuneracionConfirmarComponent,
    NuevoDescuentoComponent,
    NuevoDescuentoConfirmarComponent,
    SelecDiasferiadoComponent,
    NuevoTipoPlanillaComponent,
    ConfirmarNuevoTipoPlanillaComponent,
    PerfilesPlanillaComponent,
    ConfirmarPerfilesPlanillaComponent,
    TrabajadoresPlanillaComponent,
    DepartamentoEmpresaComponent,
    NuevoDepartamentoEmpresaComponent,
    ConfirmarNuevoDepartamentoEmpresaComponent,
    AreaDepartamentoEmpresaComponent,
    ConfirmarNuevaAreaDepartamentoEmpresaComponent,
    NuevaAreaDepartamentoEmpresaComponent,
    PuestoAreaEmpresaComponent,
    NuevoPuestoAreaEmpresaComponent,
    ConfirmarNuevoPuestoAreaEmpresaComponent,
    ActualizarRango5taComponent,
    ConfirmarRango5taComponent,
    TxtComponent
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,

      },
      DatePipe,
      ParametroService,
      UsuarioService,
      EmpresaService,
      SctrService,
      CentroCostosService,
      AfpService,
      AnoMesService,
      EpsService,
      HorarioService,
      TiposPermisoService,
      RemuneracionesService,
      DescuentosService,
      TipoPlanillaService,
      DepartamentoEmpresaService,
      AreaDepartamentoEmpresaService,
      PuestoAreaEmpresaService,
      TrabajadorService,
      Rango5taService,
      PlanillasService
    ],
})
export class ConfiguracionModule { }
