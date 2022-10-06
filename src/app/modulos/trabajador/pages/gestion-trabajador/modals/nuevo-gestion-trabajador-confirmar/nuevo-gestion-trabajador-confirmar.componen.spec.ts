import { TestBed, async,ComponentFixture  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NuevoGestionTrabajadorConfirmarComponent } from './nuevo-gestion-trabajador-confirmar.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { TrabajadorServiceStub } from '../../../../../../mocks/services/trabajador.service.stub';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { Observable } from 'rxjs/Observable';

describe('NuevoGestionTrabajadorConfirmarComponent',()=>{
    let component: NuevoGestionTrabajadorConfirmarComponent;
    let fixture: ComponentFixture<NuevoGestionTrabajadorConfirmarComponent>;
    let error = {
        'status':400,
        'error':{
            'error':'Error en la solicitud'
        }
    }
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            NuevoGestionTrabajadorConfirmarComponent
          ],
          imports: [RouterTestingModule,
                    HttpClientTestingModule,
                    
                    ],
            providers: [
                {provide: TrabajadorService, useClass: TrabajadorServiceStub},
                NgbActiveModal           
                   ]
        }).compileComponents();
    
        fixture = TestBed.createComponent(NuevoGestionTrabajadorConfirmarComponent);
        component = fixture.componentInstance;
        component.input_trabajador_final = ConstantesDatosPrueba.Trabajador1;
            fixture.detectChanges();
    }))

    describe('Creacion del component',()=>{
        it('Deberia crearse el componente NuevoGestionTrabajadorConfirmar', async(() => {
          const fixture = TestBed.createComponent(NuevoGestionTrabajadorConfirmarComponent);
          const app = fixture.debugElement.componentInstance;
          expect(app).toBeTruthy();
        }))
    })
    
    describe('Implementacion ngOnInit',()=>{
        it('Deberia llenarse la variable objtrabajador',()=>{
            spyOn(component,'ngOnInit').and.callThrough();
            component.ngOnInit();
            expect(component.ngOnInit).toHaveBeenCalled();
            expect(component.objtrabajador).toEqual(component.input_trabajador_final);
        })
    })

    describe('Metodo CRUD',()=>{
        it('Deberia llamarse al metodo crud cuando se selecciona Confirmar desde el template',async(()=>{
            const button = fixture.debugElement.nativeElement.querySelector('#crud');
            spyOn(component,'crud').and.callThrough();
            button.click();
            expect(component.crud).toHaveBeenCalled();
        }))

        it('Deberia llamarse al metodo actualizarTrabajador si el caso es ACTUALIZAR',()=>{
            let objtrabajador = ConstantesDatosPrueba.Trabajador1;
            objtrabajador.accion = "U";
            component.objtrabajador = objtrabajador;
            spyOn(component,'actualizarTrabajador').and.callThrough();
            component.crud();
            expect(component.actualizarTrabajador).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo registrarTrabajador si el caso es DEFAULT',()=>{
            let objtrabajador = ConstantesDatosPrueba.Trabajador1;
            objtrabajador.accion = "I";
            component.objtrabajador = objtrabajador;
            spyOn(component,'registrarTrabajador').and.callThrough();
            component.crud();
            expect(component.registrarTrabajador).toHaveBeenCalled();
        })

        it('Deberia entrar al case Eliminar si el caso es Eiminar',()=>{
            let objtrabajador = ConstantesDatosPrueba.Trabajador1;
            objtrabajador.accion = "D";
            component.objtrabajador = objtrabajador;
            component.crud();
        })
    })

    describe('Metodo close',()=>{
        it("Deberia cerrarse el modal cuando se presiona el boton Cancelar en el template",async(()=>{
            spyOn(component,'close').and.callThrough();
            component.close();
            expect(component.close).toHaveBeenCalled();
        }))
    })

    describe('Metodo actualizarTrabajador()',()=>{
        it('Mostrar Swal de Actualizacion correcta',()=>{
            spyOn(component.trabajadorService,'actualizarTrabajador').and.callThrough();
            component.actualizarTrabajador();
            expect(component.trabajadorService.actualizarTrabajador).toHaveBeenCalled();
        })
        it('Mostrar Swal de Actualizar error',()=>{
            spyOn(component.trabajadorService,'actualizarTrabajador').and.returnValue(Observable.throw(error))
            component.actualizarTrabajador();
            expect(component.trabajadorService.actualizarTrabajador).toHaveBeenCalled();
            expect(component.error).toBeTruthy();
        })
    })

    describe('Metodo registrarTrabajador()',()=>{
        it('Mostrar Swal de Registro correcta',()=>{
            spyOn(component.trabajadorService,'insertarTrabajador').and.callThrough();
            component.registrarTrabajador();
            expect(component.trabajadorService.insertarTrabajador).toHaveBeenCalled();
        })
        it('Mostrar Swal de Registro error',()=>{
            spyOn(component.trabajadorService,'insertarTrabajador').and.returnValue(Observable.throw(error))
            component.registrarTrabajador();
            expect(component.trabajadorService.insertarTrabajador).toHaveBeenCalled();
            expect(component.error).toBeTruthy();
        })
    })
})