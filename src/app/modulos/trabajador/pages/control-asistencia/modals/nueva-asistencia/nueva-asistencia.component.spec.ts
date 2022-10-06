import { NuevaAsistenciaComponent } from './nueva-asistencia.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { AsistenciaServiceStub } from '../../../../../../mocks/services/asistencia.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { Asistencia } from '../../../../../../models/Asistencia';
import { Observable } from 'rxjs/Observable';


describe('NuevaAsistenciaComponent', () => {

    let component: NuevaAsistenciaComponent;
    let fixture: ComponentFixture<NuevaAsistenciaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NuevaAsistenciaComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),
                DatePickerModule,
                TimePickerModule,
                NgSelectModule
            ],
            providers: [
                { provide: AsistenciaService, useClass: AsistenciaServiceStub },
                NgbActiveModal
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(NuevaAsistenciaComponent);
        component = fixture.componentInstance;
        component.input_trabajador = ConstantesDatosPrueba.Trabajador1;
        component.asistencia = new Asistencia();
        localStorage.setItem('anoSeleccion', JSON.stringify(ConstantesDatosPrueba.añoPrueba1));
        localStorage.setItem('mesSeleccion', JSON.stringify(ConstantesDatosPrueba.MesPrueba1));
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente NuevaAsistencia', async(() => {
            const fixture = TestBed.createComponent(NuevaAsistenciaComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba metodo ngOnInit',()=>{
        it('Deberia setear la fecha actual en asistencia si input_asistencia es nulo',()=>{
            component.input_asistencia = null;
            component.ngOnInit();
            expect(component.asistencia.fecha).toBeDefined();
        })

        it('Deberia sobreescribirse la asistencia si input_asistencia no es nulo',()=>{
            component.input_asistencia = ConstantesDatosPrueba.asistencia;
            component.ngOnInit();
            expect(component.asistencia).toBeDefined();
            expect(component.trabajador).toBeDefined();
        })
    })

    describe('Prueba metodo close', () => {
        it('Deberia llamarse el metodo close desde el template', () => {
            spyOn(component, 'close').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo crud',()=>{
        
        it('Deberia llamarse al metodo desde el template',()=>{
            spyOn(component, 'crud').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
            button.click();
            expect(component.crud).toHaveBeenCalled();
        })
        
        it('Deberia llamar al metodo actualizarAsistencia si input_Asistencia no es nulo',()=>{
            spyOn(component,'actualizarAsistencia').and.callThrough();
            component.input_asistencia = ConstantesDatosPrueba.asistencia;
            component.crud();
            expect(component.actualizarAsistencia).toHaveBeenCalled();
        })

        it('Deberia llamar al metodo buscarFechaSiExiste si input_Asistencia es nulo',()=>{
            spyOn(component,'buscarFechaSiExiste').and.callThrough();
            component.input_asistencia = null;
            component.input_trabajador.accion = 'R'
            component.crud();
            expect(component.buscarFechaSiExiste).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo BuscarFechaSiExiste',()=>{
        it('deberia mostrar una alerta con fecha ya registrada',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(true);
            spyOn(component.asistenciaService,'buscarFecha').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.existe).toBeTruthy();
        })

        it('deberia llamar al metodo registrarAsistencia si no hay registros anteriores',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(false);
            spyOn(component.asistenciaService,'buscarFecha').and.callThrough();
            spyOn(component,'registrarAsistencia').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.existe).toEqual(false);
            expect(component.registrarAsistencia).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo actualizarAsistencia',()=>{
        it('Deberia cerrarse el modal y refrescar la pagina cuando la peticion es correcta',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(1);
            spyOn(component.asistenciaService,'actualizarAsistencia').and.callThrough();
            spyOn(component.activemodal,'close').and.callThrough();
            spyOn(component,'refrescar').and.callThrough();
            component.actualizarAsistencia();
            expect(component.asistenciaService.actualizarAsistencia).toHaveBeenCalled();
            expect(component.activemodal.close).toHaveBeenCalled();
            expect(component.refrescar).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo registrarAsistencia',()=>{
        it('deberia mostrar un mensaje de alerta de success y cerrarse el modal',()=>{
            spyOn(component.asistenciaService,'registrarAsistencia').and.callThrough();
            spyOn(component.activemodal,'close').and.callThrough();
            component.registrarAsistencia({});
            expect(component.activemodal.close).toHaveBeenCalled();
            expect(component.asistenciaService.registrarAsistencia).toHaveBeenCalled();
        })

        it('deberia mostrar un mensaje de alerta de error si la subscripcion fallo',()=>{
            spyOn(component.asistenciaService,'registrarAsistencia').and.returnValue(Observable.throw('error'))
            spyOn(component.activemodal,'dismiss').and.callThrough();
            component.registrarAsistencia({});
            expect(component.activemodal.dismiss).toHaveBeenCalled();
        })
    })
})