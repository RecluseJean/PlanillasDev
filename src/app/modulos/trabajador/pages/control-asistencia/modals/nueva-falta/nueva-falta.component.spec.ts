import { NuevaFaltaComponent } from './nueva-falta.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgSelectModule } from '@ng-select/ng-select';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { FaltaServiceStub } from '../../../../../../mocks/services/faltas.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { Falta } from '../../../../../../models/Falta';
import { Observable } from 'rxjs/Observable';

describe('NuevaFaltaComponent', () => {

    let component: NuevaFaltaComponent;
    let fixture: ComponentFixture<NuevaFaltaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NuevaFaltaComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),
                DatePickerModule,
                NgSelectModule
            ],
            providers: [
                { provide: FaltaService, useClass: FaltaServiceStub },
                NgbActiveModal
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(NuevaFaltaComponent);
        component = fixture.componentInstance;
        component.input_trabajador = ConstantesDatosPrueba.Trabajador1;
        component.falta = new Falta();

        localStorage.setItem('anoSeleccion', JSON.stringify(ConstantesDatosPrueba.añoPrueba1));
        localStorage.setItem('mesSeleccion', JSON.stringify(ConstantesDatosPrueba.MesPrueba1));
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente NuevaFalta', async(() => {
            const fixture = TestBed.createComponent(NuevaFaltaComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba del metodo ngOnInit',()=>{
        it('Deberia setearse la fecha actual si input_falta es nulo',()=>{
            component.input_falta = null;
            component.ngOnInit();
            expect(component.falta.fecha).toBeDefined();
        })

        it('Deberia soobreescribirse la falta si input_falta no es nulo',()=>{
            component.input_falta = ConstantesDatosPrueba.falta;
            component.ngOnInit();
            expect(component.falta).toBeDefined();
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
        
        it('Deberia llamar al metodo actualizarFalta si input_falta no es nulo',()=>{
            spyOn(component,'actualizarFalta').and.callThrough();
            component.input_falta = ConstantesDatosPrueba.falta;
            component.crud();
            expect(component.actualizarFalta).toHaveBeenCalled();
        })

        it('Deberia llamar al metodo buscarFechaSiExiste si input_falta es nulo',()=>{
            spyOn(component,'buscarFechaSiExiste').and.callThrough();
            component.input_falta = null;
            component.input_trabajador.accion = 'R'
            component.crud();
            expect(component.buscarFechaSiExiste).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo BuscarFechaSiExiste',()=>{
        it('deberia mostrar una alerta con fecha ya registrada',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(0);
            spyOn(component.faltaService,'buscarFecha').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.existe).toEqual(0);
        })

        it('deberia mostrar una alerta con falta ya registrada',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(1);
            spyOn(component.faltaService,'buscarFecha').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.existe).toEqual(1);
        })

        it('deberia llamar al metodo registrarFalta si no hay registros anteriores',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(2);
            spyOn(component.faltaService,'buscarFecha').and.callThrough();
            spyOn(component,'registrarFalta').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.existe).toEqual(2);
            expect(component.registrarFalta).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo actualizarFalta',()=>{
        it('Deberia cerrarse el modal y refrescar la pagina cuando la peticion es correcta',()=>{
            spyOn(component,'asignarObjetos').and.returnValue(1);
            spyOn(component.faltaService,'actualizarFalta').and.callThrough();
            spyOn(component.activemodal,'close').and.callThrough();
            spyOn(component,'refrescar').and.callThrough();
            component.actualizarFalta();
            expect(component.faltaService.actualizarFalta).toHaveBeenCalled();
            expect(component.activemodal.close).toHaveBeenCalled();
            expect(component.refrescar).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo registrarFalta',()=>{
        it('deberia mostrar un mensaje de alerta de success y cerrarse el modal',()=>{
            spyOn(component.faltaService,'registrarFalta').and.callThrough();
            spyOn(component.activemodal,'close').and.callThrough();
            component.registrarFalta(1);
            expect(component.activemodal.close).toHaveBeenCalled();
            expect(component.faltaService.registrarFalta).toHaveBeenCalled();
        })

        it('deberia mostrar un mensaje de alerta de error si la subscripcion fallo',()=>{
            spyOn(component.faltaService,'registrarFalta').and.returnValue(Observable.throw('error'))
            spyOn(component.activemodal,'dismiss').and.callThrough();
            component.registrarFalta(0);
            expect(component.activemodal.dismiss).toHaveBeenCalled();
        })

    })
})