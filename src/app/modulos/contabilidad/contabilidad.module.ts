import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CONTABILIDAD_ROUTES } from './contabilidad.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { NuevoConceptoCuentaComponent } from './pages/conceptos-cuenta/modals/nuevo-concepto-cuenta/nuevo-concepto-cuenta.component';
import { ConfirmarConceptoCuentaComponent } from './pages/conceptos-cuenta/modals/confirmar-concepto-cuenta/confirmar-concepto-cuenta.component';
import { ConceptosCuentaComponent } from './pages/conceptos-cuenta/conceptos-cuenta.component';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { TreeTableModule } from 'ng-treetable';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ConceptoCuentaService } from './services/concepto-cuenta/concepto-cuenta.service';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { ConfigVistaPlameComponent } from './pages/conceptos-cuenta/modals/config-vista-plame/config-vista-plame.component';
import { ConfirmarVistaPlameComponent } from './pages/conceptos-cuenta/modals/confirmar-vista-plame/confirmar-vista-plame.component';

@NgModule({
  imports: [
    CommonModule,
    CONTABILIDAD_ROUTES,
    SharedModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    PipesModule,
    TreeTableModule,
    //Ng2SmartTableModule,
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
    ConceptosCuentaComponent,
    NuevoConceptoCuentaComponent,
    ConfirmarConceptoCuentaComponent,
    ConfigVistaPlameComponent,
    ConfirmarVistaPlameComponent],
  entryComponents: [
    NuevoConceptoCuentaComponent,
    ConfirmarConceptoCuentaComponent,
    ConfigVistaPlameComponent,
    ConfirmarVistaPlameComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
    UsuarioService,
    ConceptoCuentaService
  ],

})
export class ContabilidadModule { }
