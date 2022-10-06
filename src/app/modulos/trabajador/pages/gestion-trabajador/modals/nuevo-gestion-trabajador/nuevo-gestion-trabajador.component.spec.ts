import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NuevoGestionTrabajadorComponent } from './nuevo-gestion-trabajador.component';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorServiceStub } from '../../../../../../mocks/services/trabajador.service.stub';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NuevoGestionTrabajadorConfirmarComponent } from '../../modals/nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import { HorarioService } from '../../../../../configuracion/services/horarios/horarios.service';
import { HorarioServiceStub } from '../../../../../../mocks/services/horario.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { Observable } from 'rxjs/Observable';


describe('NuevoGestionTrabajadorComponent', () => {
    let component: NuevoGestionTrabajadorComponent;
    let fixture: ComponentFixture<NuevoGestionTrabajadorComponent>;
    var error = {
        "status":400,
        "error":{
            "error":"Error al realizar la solicitud"
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NuevoGestionTrabajadorComponent,
                NuevoGestionTrabajadorConfirmarComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                NgSelectModule,
                FormsModule,
                DatePickerModule,
                NgbModule.forRoot()
            ],
            providers: [
                { provide: TrabajadorService, useClass: TrabajadorServiceStub },
                { provide: HorarioService, useClass: HorarioServiceStub },
                NgbActiveModal,
                NgbModal, NgbModalStack
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ NuevoGestionTrabajadorConfirmarComponent] } })
            .compileComponents();

        fixture = TestBed.createComponent(NuevoGestionTrabajadorComponent);
        component = fixture.componentInstance;
        component.input_tipo_comprobante = 1;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente NuevoGestionTrabajador', async(() => {
            const fixture = TestBed.createComponent(NuevoGestionTrabajadorComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Implementacion ngOnInit', () => {
        it('Deberia llamarse al metodo listarDatos', () => {
            spyOn(component, 'iniciarListasDatos').and.callFake(()=>{});
            component.ngOnInit();
            expect(component.iniciarListasDatos).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo setearPorDefecto', () => {
            spyOn(component, 'setearPorDefecto').and.callThrough();
            spyOn(component,'iniciarListasDatos').and.callFake(()=>{});
            component.ngOnInit();
            expect(component.setearPorDefecto).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo iniciarChecks', () => {
            spyOn(component, 'iniciarChecks').and.callThrough();
            spyOn(component,'iniciarListasDatos').and.callFake(()=>{});
            component.ngOnInit();
            expect(component.iniciarChecks).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo iniciarDropdowns si la solicitud es de actualizar', () => {
            var llamado = false;
            spyOn(component, 'iniciarDropdowns').and.callFake(()=>{ llamado = true;});
            spyOn(component,'iniciarListasDatos').and.callFake(()=>{});
            component.input_trabajador_final = ConstantesDatosPrueba.Trabajador1;
            component.ngOnInit();
            expect(component.iniciarDropdowns).toHaveBeenCalled();
        })

    })

    describe('Metodo iniciarDropdowns', () => {
        it('Deberian llenarses los dropdowns del modal de nuevo trabajador', () => {
            component.objTrabajador_final = ConstantesDatosPrueba.Trabajador2;
            spyOn(component, 'obtenerPais').and.callThrough();
            spyOn(component, 'obtenerRegPension').and.callThrough();
            spyOn(component, 'obtenerRegSalud').and.callThrough();
            spyOn(component, 'obtenerCentroCosto').and.callThrough();
            spyOn(component, 'obtenerSctr').and.callThrough();
            component.iniciarDropdowns();
            expect(component.pais).toEqual(component.objTrabajador_final.trabajador.pais.idPais);
            expect(component.obtenerPais).toHaveBeenCalled();
            expect(component.afp).toEqual(component.objTrabajador_final.trabajador.afp.idAfp);
            expect(component.obtenerRegPension).toHaveBeenCalled();
            expect(component.regsalud).toEqual(component.objTrabajador_final.trabajador.regSalud.idRegSalud);
            expect(component.obtenerRegSalud).toHaveBeenCalled();
            expect(component.centrocosto).toEqual(component.objTrabajador_final.centroCosto.idCentroCosto);
            expect(component.obtenerCentroCosto).toHaveBeenCalled();
            expect(component.sctrsalud).toEqual(component.objTrabajador_final.sctrSalud.idSctr);
            expect(component.obtenerSctr).toHaveBeenCalled();
        })

        it('Deberia setearse el flag_doc en true  si tipoDoc es 3',()=>{
            component.objTrabajador_final = ConstantesDatosPrueba.Trabajador2;
            component.objTrabajador_final.trabajador.tipoDoc.idTipoDoc = 3;
            component.iniciarDropdowns();
            expect(component.flag_tpo_doc).toBeTruthy();
        })

        it('Deberia setearse epsSaludCheck con 1 si es el tipo SALUD y EPS',()=>{
            var trab = ConstantesDatosPrueba.Trabajador2;
            trab.sctrSalud.idSctr = 3;
            trab.sctrSalud.tipo = 1;
            component.objTrabajador_final = trab;
            component.iniciarDropdowns();
            expect(component.epsSaludcheck).toEqual(1);
        })

        it('Deberia habilitarse la seccion de eps y llenarse sus dropdown', () => {
            component.objTrabajador_final = ConstantesDatosPrueba.Trabajador2;
            spyOn(component, 'obtenerSctr').and.callThrough();
            component.iniciarDropdowns();
            expect(component.sctrsalud).toEqual(component.objTrabajador_final.sctrSalud.idSctr);
            expect(component.obtenerSctr).toHaveBeenCalled();
        })

        it('Deberia habilitarse el check de epsSalud ', () => {
            component.objTrabajador_final = ConstantesDatosPrueba.Trabajador3;
            spyOn(component, 'obtenerSctr').and.callThrough();
            component.iniciarDropdowns();
            expect(component.epsSaludcheck).toEqual(component.objTrabajador_final.epsServPropSalud);
            expect(component.obtenerSctr).toHaveBeenCalled();
        })
    })

    describe('Prueba Metodo IniciarListaDatos',()=>{
        it('Deberia mostrar mensaje de alerta cuando falla la peticion en los metodos',()=>{
            spyOn(component.trabajadorService,'listarTipoDoc').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarPais').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarEstadoCivil').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarDepartamento').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoZona').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarNivelEdu').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarOcupacion').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarAfp').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarEps').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarRegSalud').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarSituacion').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarRegLaboral').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoContrato').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarCentroCosto').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarAreaDepEmp').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoPago').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarBanco').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarSctr').and.returnValue(Observable.throw(error));
            spyOn(component.horarioService,'listarHorariosPorEmpresa').and.returnValue(Observable.throw(error));
            component.lsTipoDoc = [];
            component.lsPais = [];
            component.lsEstadoCiv = [];
            component.lsDepartamento = [];
            component.lsTipoZona = [];
            component.lsNivelEdu= [];
            component.lsOcupacion = [];
            component.lsAfp= [];
            component.lsEps = [];
            component.lsRegSalud = [];
            component.lsSituacion = [];
            component.lsRegLaboral = [];
            component.lsTipoContrato = [];
            component.lsCentroCosto = [];
            component.lsAreaDepEmp = [];
            component.lsTipoPago = [];
            component.lsBanco = [];
            component.lsSctr = [];
            component.lsHorario = [];
            component.iniciarListasDatos();
            expect(component.lsTipoDoc.length).toEqual(0);
            expect(component.lsPais.length).toEqual(0);
            expect(component.lsEstadoCiv.length).toEqual(0);
            expect(component.lsDepartamento.length).toEqual(0);
            expect(component.lsTipoZona.length).toEqual(0);
            expect(component.lsNivelEdu.length).toEqual(0);
            expect(component.lsOcupacion.length).toEqual(0);
            expect(component.lsAfp.length).toEqual(0);
            expect(component.lsEps.length).toEqual(0);
            expect(component.lsRegSalud.length).toEqual(0);
            expect(component.lsSituacion.length).toEqual(0);
            expect(component.lsRegLaboral.length).toEqual(0);
            expect(component.lsTipoContrato.length).toEqual(0);
            expect(component.lsCentroCosto.length).toEqual(0);
            expect(component.lsAreaDepEmp.length).toEqual(0);
            expect(component.lsTipoPago.length).toEqual(0);
            expect(component.lsBanco.length).toEqual(0);
            expect(component.lsSctr.length).toEqual(0);
            expect(component.lsHorario.length).toEqual(0);
        });

        it('Deberia mostrar un mensaje de error en los metodos del dropdown si fallan',()=>{
            component.objTrabajador_final = ConstantesDatosPrueba.Trabajador2;
            spyOn(component.trabajadorService,'listarTipoDoc').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarPais').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarProvincia').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarDistrito').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarEstadoCivil').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoZona').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarNivelEdu').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarOcupacion').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarEps').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarRegSalud').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarSituacion').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarRegLaboral').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoContrato').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarCentroCosto').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService, 'listarAreaDepEmp').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService, 'listarPuesto').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarAfp').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarTipoPago').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarBanco').and.returnValue(Observable.throw(error));
            spyOn(component.trabajadorService,'listarSctr').and.returnValue(Observable.throw(error));
            spyOn(component.horarioService,'listarHorariosPorEmpresa').and.returnValue(Observable.throw(error));
            component.lsTipoDoc = [];
            component.lsPais = [];
            component.lsEstadoCiv = [];
            component.lsProvincia= [];
            component.lsDistrito = [];
            component.lsTipoZona = [];
            component.lsNivelEdu= [];
            component.lsOcupacion = [];
            component.lsEps = [];
            component.lsRegSalud = [];
            component.lsSituacion = [];
            component.lsRegLaboral = [];
            component.lsTipoContrato = [];
            component.lsCentroCosto = [];
            component.lsAreaDepEmp = [];
            component.lsPuesto = [];
            component.lsTipoPago = [];
            component.lsBanco = [];
            component.lsSctr = [];
            component.lsAfp = [];
            component.lsHorario = [];
            component.iniciarDropdowns();
            expect(component.lsTipoDoc.length).toEqual(0);
            expect(component.lsPais.length).toEqual(0);
            expect(component.lsEstadoCiv.length).toEqual(0);
            expect(component.lsProvincia.length).toEqual(0);
            expect(component.lsDistrito.length).toEqual(0);
            expect(component.lsTipoZona.length).toEqual(0);
            expect(component.lsNivelEdu.length).toEqual(0);
            expect(component.lsOcupacion.length).toEqual(0);
            expect(component.lsEps.length).toEqual(0);
            expect(component.lsRegSalud.length).toEqual(0);
            expect(component.lsSituacion.length).toEqual(0);
            expect(component.lsRegLaboral.length).toEqual(0);
            expect(component.lsTipoContrato.length).toEqual(0);
            expect(component.lsCentroCosto.length).toEqual(0);
            expect(component.lsAreaDepEmp.length).toEqual(0);
            expect(component.lsPuesto.length).toEqual(0);
            expect(component.lsTipoPago.length).toEqual(0);
            expect(component.lsBanco.length).toEqual(0);
            expect(component.lsSctr.length).toEqual(0);
            expect(component.lsHorario.length).toEqual(0);
            expect(component.lsAfp.length).toEqual(0);
        })

    })

    describe('Metodo obtenerProvincias', () => {
        it('Deberia eliminarse la provincia y distrito seleccionado si se borra el departamento ', () => {
            component.obtenerProvincias(null);
            expect(component.provincia).toBeNull();
            expect(component.distrito).toBeNull();
        })
    })

    describe('Metodo obtenerDistrito', () => {
        it('Deberia eliminarse el distrito seleccionado si se borra la provincia ', () => {
            component.obtenerDistrito(null);
            expect(component.distrito).toBeNull();
        })
    })

    describe('Metodo revisarTipoDoc', () => {

        it('Deberia setear como falso el flag si el tipo de documento es pasaporte', () => {
            component.revisarTipoDoc(3);
            expect(component.flag_tpo_doc).toBeFalsy();
            expect(component.trabajador.nroDoc).toBeNull();
            expect(component.pais).toBeNull();
        })

        it('Deberia setear como verdadero el flag si el tipo de documento no es pasaporte', () => {
            component.revisarTipoDoc(1);
            expect(component.flag_tpo_doc).toBeTruthy();
            expect(component.trabajador.nroDoc).toBeNull();
            expect(component.pais).toBeNull();
        })
    })

    describe('Metodo calcularPorHora', () => {
        it('Deberia obtener el sueldo por hora', () => {
            component.calcularPorHora(2400);
            expect(component.contrato.valorHora).toEqual(10.00);
        })
    })

    describe('Metodo CheckEps', () => {
        it('Si se selecciona el check de EPS se guardan como 1', () => {
            component.checkEPS(1);
            expect(component.contrato.epsServPropSalud).toEqual(1);
            expect(component.epsSaludcheck).toEqual(1);
        })

        it('Si se desactiva el check de EPS se guardan como 0', () => {
            component.checkEPS(0);
            expect(component.contrato.epsServPropSalud).toEqual(0);
            expect(component.epsSaludcheck).toEqual(0);
            expect(component.epsSalud).toBeNull();
        })
    })


    describe('Metodo CheckAfilAseg', () => {
        it('Si se selecciona el check de Afiliado Seguro se guardan como 1', () => {
            component.checkAfilAseg(1)
            expect(component.trabajador.afilAseguPens).toEqual(1);
        })

        it('Si se desactiva el check de Afiliado Seguro se guardan como 0', () => {
            component.checkAfilAseg(0);
            expect(component.trabajador.afilAseguPens).toEqual(0);
        })
    })

    describe('Metodo CheckAlterAcuAtp', () => {
        it('Si se selecciona el check de Regimen alternativo se guardan como 1', () => {
            component.checkAlterAcuAtp(1)
            expect(component.contrato.regAlterAcuAtp).toEqual(1);
        })

        it('Si se desactiva el check de Regimen alternativo se guardan como 0', () => {
            component.checkAlterAcuAtp(0)
            expect(component.contrato.regAlterAcuAtp).toEqual(0);
        })
    })

    describe('Metodo CheckComiMix', () => {
        it('Si se selecciona el check de Comision Mixta se guardan como 1', () => {
            component.checkComiMix(1)
            expect(component.trabajador.comiMixta).toEqual(1);
        })

        it('Si se desactiva el check de Comision Mixta se guardan como 0', () => {
            component.checkComiMix(0)
            expect(component.trabajador.comiMixta).toEqual(0);
        })
    })

    describe('Metodo CheckDiscap', () => {
        it('Si se selecciona el check de Discapacidad se guardan como 1', () => {
            component.checkDiscap(1)
            expect(component.contrato.discap).toEqual(1);
        })

        it('Si se desactiva el check de Discapacidad se guardan como 0', () => {
            component.checkDiscap(0)
            expect(component.contrato.discap).toEqual(0);
        })
    })

    describe('Metodo CheckJorMax', () => {
        it('Si se selecciona el check de Jornada Maxima se guardan como 1', () => {
            component.checkJorMax(1)
            expect(component.contrato.jorMax).toEqual(1);
        })

        it('Si se desactiva el check de Jornada Maxima se guardan como 0', () => {
            component.checkJorMax(0)
            expect(component.contrato.jorMax).toEqual(0);
        })
    })

    describe('Metodo CheckHorNoc', () => {
        it('Si se selecciona el check de Horario Nocturno se guardan como 1', () => {
            component.checkHorNoc(1)
            expect(component.contrato.horNoc).toEqual(1);
        })

        it('Si se desactiva el check de Horario Nocturno se guardan como 0', () => {
            component.checkHorNoc(0)
            expect(component.contrato.horNoc).toEqual(0);
        })
    })

    describe('Metodo CheckOtrIgr5ta', () => {
        it('Si se selecciona el check de Ingresos 5ta Categoria se guardan como 1', () => {
            component.checkOtrIgr5ta(1)
            expect(component.contrato.otrIgr5ta).toEqual(1);
        })

        it('Si se desactiva el check de Ingresos de 5ta Categoria se guardan como 0', () => {
            component.checkOtrIgr5ta(0)
            expect(component.contrato.otrIgr5ta).toEqual(0);
        })
    })

    describe('Metodo CheckSindical', () => {
        it('Si se selecciona el check de Sindicalizado se guardan como 1', () => {
            component.checkSindical(1)
            expect(component.contrato.sindical).toEqual(1);
        })

        it('Si se desactiva el check de Sindicalizado se guardan como 0', () => {
            component.checkSindical(0)
            expect(component.contrato.sindical).toEqual(0);
        })
    })

    describe('Metodo CheckQuintaExo', () => {
        it('Si se selecciona el check de Renta 5ta Categoria Exonerada se guardan como 1', () => {
            component.checkQuintaExo(1)
            expect(component.contrato.quintaExo).toEqual(1);
        })

        it('Si se desactiva el check de Renta 5ta Categoria Exonerada se guardan como 0', () => {
            component.checkQuintaExo(0)
            expect(component.contrato.quintaExo).toEqual(0);
        })
    })

    describe('Metodo CheckEssaludVida', () => {
        it('Si se selecciona el check de Essalud Vida se guardan como 1', () => {
            component.checkEssaludVida(1)
            expect(component.trabajador.essaludVida).toEqual(1);
        })

        it('Si se desactiva el check de Essalud Vida se guardan como 0', () => {
            component.checkEssaludVida(0)
            expect(component.trabajador.essaludVida).toEqual(0);
        })
    })

    describe('Metodo limpiarEPSreg', () => {
        it('Deberia limpiarse los campos si se cambia la opcion de EPs en Regimen Salud', () => {
            component.limpiarEPSreg(1);
            expect(component.epsRegsalud).toBeNull();
            expect(component.trabajador.fecIngrSalud).toBeNull();
        })
    })

    describe('Metodo limpiarEPSpens', () => {
        it('Deberia limpiarse los campos si se cambia la opcion de EPs en Pension', () => {
            component.limpiarEPSpens(1);
            expect(component.epsPension).toBeNull();
        })
    })

    describe('Metodo limpiarRegPen', () => {
        it('Deberia limpiarse los campos si se  cambia la opcion de Regimen Pension', () => {
            component.limpiarRegPen(1);
            expect(component.trabajador.comiMixta).toEqual(0);
            expect(component.trabajador.fecRegPens).toBeNull();
        })
    })

    describe('Metodo limpiarTipoPago', () => {
        it('Deberia limpiarse los campos si se cambia la opcion de Tipo de Pago', () => {
            component.limpiarTipoPago(null);
            expect(component.banco).toBeNull();
            expect(component.contrato.nroCta).toBeNull();
            expect(component.contrato.nroCci).toBeNull();
        })
    })

    describe('Metodo setearTipo', () => {
        it('Deberia limpiarse los campos si se cambia la opcion de Sctr', () => {
            component.setearTipo(null);
            expect(component.contrato.epsServPropSalud).toEqual(0);
            expect(component.epsSaludcheck).toEqual(0);
            expect(component.epsSalud).toBeNull();
            expect(component.trabajador.afilAseguPens).toEqual(0);
            expect(component.sctrsaludTipo).toBeNull();
        })

        it('Deberia limpiarse los campos de eps cuando se escoge la opcion de ninguno', () => {
            component.lsSctr = ConstantesDatosPrueba.ResponseWrapperListaSctr.aaData;
            component.sctrsalud = 1;
            component.setearTipo(1);
            expect(component.epsSalud).toBeNull();
            expect(component.contrato.epsServPropSalud).toEqual(0);
            expect(component.trabajador.afilAseguPens).toEqual(0);
        })

        it('Deberia setear como 1 los campos si se selecciona eps', () => {
            component.lsSctr = ConstantesDatosPrueba.ResponseWrapperListaSctr.aaData;
            component.sctrsalud = 3;
            component.setearTipo(1);
            expect(component.contrato.epsServPropSalud).toEqual(1);
            expect(component.epsSaludcheck).toEqual(1);
        })

        it('Deberia limpiarse los campos de eps cuando se escoge la opcion de Sctr Salud', () => {
            component.lsSctr = ConstantesDatosPrueba.ResponseWrapperListaSctr.aaData;
            component.sctrsalud = 2;
            component.setearTipo(1);
            expect(component.epsSalud).toBeNull();
            expect(component.epsSaludcheck).toEqual(0);
            expect(component.contrato.epsServPropSalud).toEqual(0);
            expect(component.trabajador.afilAseguPens).toEqual(0);
        })
    })

    describe('Prueba metodo darValor',()=>{
        it('Deberia setearse el tipo de documento en 2',()=>{
            component.darValor();
            expect(component.tipoDoc).toEqual(2);
        })
    })

    describe('Prueba metodo obtener Puesto', () => {
        it('deberia setear el puesto en null si areaDepEmp es null', () => {
            component.obtenerPuesto(null);
            expect(component.puesto).toBeNull();
        })
    })

    describe('Metodo asignando Objetos', () => {

        it('Deberia vaciar la variable epsRegsalud si no se selecciona un regimen de salud', () => {
            component.regsalud = null;
            component.trabajador = new Trabajador();
            component.trabajador.nombres= "Junior Angel  ";
            component.trabajador.apeMater= " Brenis ";
            component.trabajador.apePater = " Morales  ";
            component.asignandoObjetos();
            expect(component.trabajador.epsServProp).toEqual(0);
            expect(component.epsRegsalud).toBeNull();
        })

        it('Deberia llenarse la variable epsServProp si se selecciona ESSALUD REGULAR Y EPS/SERV. PROPIOS', () => {
            component.regsalud = 4;
            component.trabajador = new Trabajador();
            component.trabajador.nombres= "Junior Angel  ";
            component.trabajador.apeMater= " Brenis ";
            component.trabajador.apePater = " Morales  ";
            component.asignandoObjetos();
            expect(component.trabajador.epsServProp).toEqual(1);
        })

        it('Deberia setearse los objetos si sus entradas no son nulo',()=>{
            component.trabajador = new Trabajador();
            component.trabajador.nombres= "Junior Angel  ";
            component.trabajador.apeMater= " Brenis ";
            component.trabajador.apePater = " Morales  ";
            component.pais = 1;
            component.tpozona = 1;
            component.ocupacion =1;
            component.afp =1;
            component.regsalud=1;
            component.epsRegsalud =1;
            component.epsSalud =1;
            component.epsPension=1;
            component.reglabo =1;
            component.tipocontrato=1;
            component.centrocosto =1;
            component.areaDepEmp = 1;
            component.puesto = 1;
            component.tipopago = 1;
            component.banco = 1;
            component.bancocts =1;
            component.sctrpension =1;
            component.sctrsalud = 1;
            component.asignandoObjetos();
            expect(component.objPais).toBeDefined();
            expect(component.objTpoZona).toBeDefined();
            expect(component.objOcupacion).toBeDefined();
            expect(component.objAfp).toBeDefined();
            expect(component.objEpsRegSalud).toBeDefined();
            expect(component.objEpsSalud).toBeDefined();
            expect(component.objEpsPension).toBeDefined();
            expect(component.objRegLaboral).toBeDefined();
            expect(component.objTpoContrato).toBeDefined();
            expect(component.objCentroCosto).toBeDefined();
            expect(component.objAreaDepEmp).toBeDefined();
            expect(component.objPuesto).toBeDefined();
            expect(component.objBancoSueldo).toBeDefined();
            expect(component.objBancoCTS).toBeDefined();
            expect(component.objSCTRPension).toBeDefined();
            expect(component.objSCTRSalud).toBeDefined();

        })
    })

    describe('Metodo ConfirmarNuevoTrabajador', () => {
        it('Deberia abrir el modal de confirmar cuando se hace clic en el boton confirmar en el template', async(() => {
            const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
            spyOn(component, 'openModalConfirmar').and.callThrough();
            button.click();
            expect(component.openModalConfirmar).toHaveBeenCalled();
        }))
    })

    describe('Metodo Close', () => {
        it('Deberia cerrar el modal de nuevo trabajador cuando se hace clic en el boton cancelar en el template', async(() => {
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            spyOn(component, 'close').and.callThrough();
            button.click();
            expect(component.close).toHaveBeenCalled();
        }))
    })

    describe('Metodo validarData', () => {
        it('Deberia mostrar un mensaje de alerta para el caso de DNI cuando se tiene menos de 8 digitos', () => {
            component.trabajador.nroDoc = '1458756';
            component.validarData('dni');
            expect(component.validarData('dni')).toBeFalsy();

        })

        it('Deberia mostrar un mensaje de alerta para el caso de RUC cuando se tiene menos de 11 digitos', () => {
            component.trabajador.nroDoc = '145875586';
            component.validarData('ruc');
            expect(component.validarData('ruc')).toBeFalsy();

        })

        it('Deberia mostrar un mensaje de alerta para el caso de CEL cuando se tiene menos de 9 digitos', () => {
            component.trabajador.nroHij = null;
            component.validarData('nhij');
            expect(component.validarData('nhij')).toBeFalsy();

        })

        it('Deberia setear en 0 en el campo N hijos cuando no existe ningun otro valor', () => {
            component.trabajador.nroDoc = '1458756';
            component.validarData('cel');
            expect(component.validarData('cel')).toBeFalsy();

        })
    })

    describe('Metodo verificarString', () => {
        it('Deberia aparecer un mensaje si se ingreso una tecla que no es una letra', () => {
            component.verificarString(7);
            expect(component.verificarString(7)).toBeFalsy();
        })
    })

    describe('Metodo verificarCorreo', () => {
        it('Deberia mostar un mensaje de alerta si el correo es invalido', () => {
            component.trabajador.correo = 'angel';
            var patron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})/
            component.verificarCorreo('angel');
            expect(patron.test('angel')).toBeFalsy();
        })
    })

    describe('Metodo verificarNumeroDecimal', () => {
        it('Deberia mostar un mensaje de alerta si el sueldo base no es un numero decimal', () => {
            component.verificarNumeroDecimal(null, 'sldb')
            expect(component.contrato.sueldoBase).toEqual(0);
        })

        it('Deberia mostar un mensaje de alerta si la movilidad no es un numero decimal', () => {
            component.verificarNumeroDecimal(null, 'mov')
            expect(component.contrato.movilidad).toEqual(0);
        })
    })

    describe('Prueba metodo VerificarNumero',()=>{

    })
})
