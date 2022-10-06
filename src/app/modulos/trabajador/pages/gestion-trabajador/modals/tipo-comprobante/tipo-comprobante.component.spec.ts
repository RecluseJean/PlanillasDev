import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TipoComprobanteComponent } from './tipo-comprobante.component';
import { NuevoGestionTrabajadorComponent } from '../nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { TrabajadorServiceStub } from '../../../../../../mocks/services/trabajador.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing'
import { HorarioService } from '../../../../../configuracion/services/horarios/horarios.service';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';



describe('TipoComprobanteComponent', () => {

  let component: TipoComprobanteComponent;
  let fixture: ComponentFixture<TipoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TipoComprobanteComponent,
        NuevoGestionTrabajadorComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgSelectModule,
        NgbModule.forRoot(),
        DatePickerModule
      ],
      providers: [
        { provide: TrabajadorService, useClass: TrabajadorServiceStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        NgbModal,
        NgbActiveModal,
        HorarioService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          NuevoGestionTrabajadorComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(TipoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  describe('Creacion del component', () => {
    it('Deberia crearse el componente TipoComprobante', async(() => {
      const fixture = TestBed.createComponent(TipoComprobanteComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
  });

  describe('Prueba metodo ngOnInit',()=>{
    it('Deberia llamarse al metodo listarTiposComprobantes',()=>{
      spyOn(component,'listarTiposComprobantes').and.callThrough();
      component.ngOnInit();
      expect(component.listarTiposComprobantes).toHaveBeenCalled();
    });
  });

  describe('Prueba metodod listarTiposComprobantes',()=>{
    it('Deberia llenarse el arreglo lsTipoComprobante',()=>{
      component.listarTiposComprobantes();
      expect(component.lsTipoComprobante.length).toBeGreaterThan(0);
    });
  });

  describe('Prueba metodo close',()=>{
    it('Deberia llamarse el metodo desde el template',()=>{
      spyOn(component,'close').and.callThrough();
      const button = fixture.debugElement.nativeElement.querySelector('#cerrarTipoComprobante');
      button.click();
      expect(component.close).toHaveBeenCalled();
    });

    it('Deberia cerrarse el modal con close',()=>{
      spyOn(component.activemodal,'close').and.callThrough();
      component.close();
      expect(component.activemodal.close).toHaveBeenCalled();
    });
  });

  describe('Prueba metodo limpiar',()=>{
    it('Deberia setearse con 0 tipoCompr si el evento es null',()=>{
      component.limpiar(null);
      expect(component.tipoComp).toEqual(0);
    });
  });

  describe('Prueba metodo nuevoTrabajador',()=>{
    it('Deberia llamarse al metodo desde el template',()=>{
      spyOn(component,'nuevoTrabajador').and.callThrough();
      component.tipoComp=1;
      const button = fixture.debugElement.nativeElement.querySelector('#nuevoTipoComprobante');
      button.disabled = false;
      button.click();
      expect(component.nuevoTrabajador).toHaveBeenCalled();
    });

    it('Deberia crearse el modal con open',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      component.nuevoTrabajador();
      expect(component.modalService.open).toHaveBeenCalled();
    });

  });
});
