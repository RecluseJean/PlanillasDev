import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModal, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { GestionTrabajadorComponent } from './gestion-trabajador.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { TrabajadorServiceStub } from '../../../../mocks/services/trabajador.service.stub';
import { NuevoGestionTrabajadorComponent } from './modals/nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NuevoGestionTrabajadorConfirmarComponent } from './modals/nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { TipoComprobanteComponent } from './modals/tipo-comprobante/tipo-comprobante.component';
import { HorarioService } from '../../../configuracion/services/horarios/horarios.service';
import { HorarioServiceStub } from '../../../../mocks/services/horario.service.stub';
import { ReporteContratoComponent } from './modals/reporte-contrato/reporte-contrato.component';
import { Observable } from 'rxjs/Observable';

describe('GestionTrabajadorComponent', () => {

  let component: GestionTrabajadorComponent;
  let fixture: ComponentFixture<GestionTrabajadorComponent>;
  let empresa = ConstantesDatosPrueba.empresa1;
  let trabajador = ConstantesDatosPrueba.ResponseWrapperCRUDTrab;

  @Pipe({ name: 'filter' })
  class MockPipe implements PipeTransform {
    transform(value: any[], postFilter: String, postBoolean: boolean): any[] {
      return value;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionTrabajadorComponent,
        NuevoGestionTrabajadorComponent,
        NuevoGestionTrabajadorConfirmarComponent,
        TipoComprobanteComponent,
        ReporteContratoComponent,
        MockPipe,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgSelectModule,
        DatePickerModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: TrabajadorService, useClass: TrabajadorServiceStub },
        { provide: HorarioService, useClass: HorarioServiceStub },
        NgbModal,
        NgbModalStack,
        NgbActiveModal,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          NuevoGestionTrabajadorComponent,
          NuevoGestionTrabajadorConfirmarComponent,
          TipoComprobanteComponent,
          ReporteContratoComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(GestionTrabajadorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.checkAction();
    fixture.detectChanges();
  }));


  describe('Creacion del component', () => {
    it('Deberia crearse el componente GestionTrabajador', async(() => {
      const fixture = TestBed.createComponent(GestionTrabajadorComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  })

  describe('Implementacion ngOnInit', () => {
    it('Deberia llamar al metodo listarTrabajadorPlanilla cuando haya un obj empresa en el localStorage', () => {
      localStorage.setItem('objEmpresaSeleccion', JSON.stringify(empresa));
      component.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
      spyOn(component, 'listarTrabajadorPlanilla').and.callThrough();
      component.ngOnInit();
      expect(component.listarTrabajadorPlanilla).toHaveBeenCalled();
    })

    it('Deberia llamar al metodo listarTrabajadorHonorario cuando haya un obj empresa en el localStorage', () => {
      localStorage.setItem('objEmpresaSeleccion', JSON.stringify(empresa));
      component.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
      spyOn(component, 'listarTrabajadorHonorario').and.callThrough();
      component.ngOnInit();
      expect(component.listarTrabajadorHonorario).toHaveBeenCalled();
    })
  })

  describe('Metodo ListarTrabajadorPlanilla', () => {
    it('Deberia llenarse el array lsTrabajadorPlanilla[] si estado es 1', () => {
      component.listarTrabajadorPlanilla();
      expect(component.lsTrabajadorPlanilla.length).toBeGreaterThan(0);
    })

    it('Deberia llenarse la variable error si falla la peticion', () => {
      spyOn(component.trabajadorService,'listarTrabajadorPorComprobante').and.returnValue(Observable.throw('error'))
      component.listarTrabajadorPlanilla();
      expect(component.error).toBeDefined();
    })
  })

  describe('Metodo ListarTrabajadorHonorario', () => {
    it('Deberia llenarse el array lsTrabajadorHonorrio[] si estado es 1', () => {
      component.listarTrabajadorHonorario();
      expect(component.lsTrabajadorHonorario.length).toBeGreaterThan(0);
    })

    it('Deberia llenarse la variable error si falla la peticion', () => {
      spyOn(component.trabajadorService,'listarTrabajadorPorComprobante').and.returnValue(Observable.throw('error'))
      component.listarTrabajadorHonorario();
      expect(component.error).toBeDefined();
    })
  })

  describe('Metodo ActualizarTrabajador', () => {
    it('Deberia llamarse al metodo actualizarTrabajador desde el template', () => {
      const button = fixture.debugElement.nativeElement.querySelector('#actualizar');
      spyOn(component, 'actualizarTrabajador').and.callThrough();
      button.click();
      expect(component.actualizarTrabajador).toHaveBeenCalled();
    })
  })

  describe('Metodo NuevoTrabajador', () => {
    it('Deberia llamarse al metodo nuevoTrabajador desde el template', () => {
      const button = fixture.debugElement.nativeElement.querySelector('#nuevo');
      spyOn(component, 'nuevoTrabajador').and.callThrough();
      button.click();
      expect(component.nuevoTrabajador).toHaveBeenCalled();
    })
  })

  describe('Abrir modal', () => {
    it('Deberia abrirse el componente TipoPlanilla si se selecciona registrar trabajador', () => {
      let indice = {
        "accion": "R"
      }
      const modal = fixture.debugElement.componentInstance;
      component.openModal(indice);
      expect(modal).toBeTruthy();
    })

    it('Deberia abrirse el componente NuevoGestionTrabajador si se selecciona actualizar trabajador', () => {
      let indice = {
        "accion": "U"
      }
      const modal = fixture.debugElement.componentInstance;
      component.openModal(indice);
      expect(modal).toBeTruthy();
    })

    it('Deberia abrirse el componente NuevoGestionTrabajadorConfirmar si se selecciona una accion distinta a ingresar o actualizar trabajador', () => {
      let indice = {
        "accion": "D"
      }
      const modal = fixture.debugElement.componentInstance;
      component.openModal(indice);
      expect(modal).toBeTruthy();
    })
  })

  describe('Prueba metodo generarContrato', () => {
    it('Deberia llamarse desde el template', () => {
      spyOn(component, 'generarContrato').and.callThrough();
      const button = fixture.debugElement.nativeElement.querySelector('#generarCont');
      button.click();
      expect(component.generarContrato).toHaveBeenCalled();
    })

    it('Deberia generar un contrato si la respuesta es un observable', () => {
      spyOn(component.trabajadorService, 'generarContrato').and.callThrough();
      component.generarContrato(1);
      expect(component.contratoGenerado).toBeTruthy();
    })

    it('Deberia llamar al metodo openModal', () => {
      spyOn(component, 'openModal').and.callThrough();
      component.generarContrato({});
      expect(component.openModal).toHaveBeenCalled();
    })
  })

  describe('Prueba del metodo checkAction', () => {
    it('Deberia mostrar el mensaje de Apellidos si se cambia a false', () => {
      const input = fixture.debugElement.nativeElement.querySelector('#inputGeneral');
      component.checkND.checked = false;
      component.checkAction();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(input.placeholder).toEqual("Apellido paterno + Apellido Materno + Nombres");
        expect(component.filterBoolean).toBeFalsy();
      });
    })
  })



});
