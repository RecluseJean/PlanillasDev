import { ReporteContratoComponent } from './reporte-contrato.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { TrabajadorServiceStub } from '../../../../../../mocks/services/trabajador.service.stub';
import * as FileSaver from 'file-saver';
import { of } from 'rxjs/observable/of';

describe('ReporteContratoComponent', () => {

    let component: ReporteContratoComponent;
    let fixture: ComponentFixture<ReporteContratoComponent>;
    let trabajador = ConstantesDatosPrueba.Trabajador3;
  

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ReporteContratoComponent
        ],
        imports: [
          NgbModule.forRoot()
        ],
        providers: [
          { provide: TrabajadorService, useClass: TrabajadorServiceStub },
          NgbActiveModal,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(ReporteContratoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));
  
  
    describe('Creacion del component', () => {
      it('Deberia crearse el componente ReporteContrato', async(() => {
        const fixture = TestBed.createComponent(ReporteContratoComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      }))
    })

    describe('Prueba metodo close',()=>{
        it('Deberia llamarse desde el template',()=>{
            spyOn(component,'close');
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })

        it('Deberia cerrar el modal',()=>{
            spyOn(component.activemodal,'dismiss').and.callThrough();
            component.close();
            expect(component.activemodal.dismiss).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo descargarContrato',()=>{
        it('Si la respuesta no es nula deberia guardar el archivo',()=>{
            component.objContrato = trabajador;
            spyOn(component.trabajadorService,'descargarContrato').and.callThrough();
            //mockFileSaver
            spyOn(FileSaver, 'saveAs').and.stub();
            component.descargarContrato();
            expect(component.trabajadorService.descargarContrato).toHaveBeenCalled();
            expect(FileSaver.saveAs).toHaveBeenCalled();
            expect(component.resEstado).toEqual(1);
        })

        it('Si la respuesta es nula deberia mostrar una alerta de error',()=>{
            component.objContrato = trabajador;
            spyOn(component.trabajadorService,'descargarContrato').and.returnValue(of(null));
            component.descargarContrato();
            expect(component.trabajadorService.descargarContrato).toHaveBeenCalled();
            expect(component.resEstado).toEqual(2);
        })
    })

    describe('Prueba metodo subirContrato',()=>{
        it('Deberia llamarse el metodo cargarContrato',()=>{
            spyOn(component,'cargarContrato').and.callFake(()=>{})
            component.subirContrato({'target':{'files':[{},{}]}})
            expect(component.cargarContrato).toHaveBeenCalled();
        })
    })

    describe('Prueb metodo cargarContrato',()=>{
        it('Deberia mostrar una alerta success si el estado es 1',()=>{
            spyOn(component.trabajadorService,'subirContrato').and.callThrough();
            component.objContrato = trabajador;
            component.objContrato.trabajador.idTrabajador = 1;
            component.cargarContrato();
            expect(component.trabajadorService.subirContrato).toHaveBeenCalled();
            expect(component.resEstado).toEqual(1);        
        })

        it('Deberia mostrar una alerta warning si el estado es 2',()=>{
            spyOn(component.trabajadorService,'subirContrato').and.callThrough();
            component.objContrato = trabajador;
            component.objContrato.trabajador.idTrabajador = 2;
            component.cargarContrato();
            expect(component.trabajadorService.subirContrato).toHaveBeenCalled();
            expect(component.resEstado).toEqual(2);        
        })

        it('Deberia mostrar una alerta error si el estado es 3',()=>{
            spyOn(component.trabajadorService,'subirContrato').and.callThrough();
            component.objContrato = trabajador;
            component.objContrato.trabajador.idTrabajador = 3;
            component.cargarContrato();
            expect(component.trabajadorService.subirContrato).toHaveBeenCalled();
            expect(component.resEstado).toEqual(3);        
        })
    })


});