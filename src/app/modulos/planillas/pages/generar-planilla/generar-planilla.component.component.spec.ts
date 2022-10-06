import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { GenerarPlanillaComponent } from "./generar-planilla.component";
import ConstantesDatosPrueba from "../../../../mocks/ConstantesMockito";
import { GenerarTxtComponent } from "./modals/generar-txt/generar-txt.component";
import { MostrarRheComponent } from "./modals/mostrar-rhe/mostrar-rhe.component";
import { MostrarBoletaComponent } from "./modals/mostrar-boleta/mostrar-boleta.component";
import { CalculoPlanillaComponent } from "./modals/calculo-planilla/calculo-planilla.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { PlanillasService } from "../../services/planillas/planillas.service";
import { PlanillaServiceStub } from "../../../../mocks/services/planilla.service.stub";
import { TipoPlanillaService } from "../../../configuracion/services/tipo-planilla/tipo-planilla.service";
import { TipoPlanillaServiceStub } from "../../../../mocks/services/tipoPlanilla.service.stub";

fdescribe('GestionTrabajadorComponent', () => {

  let component:GenerarPlanillaComponent;
  let fixture: ComponentFixture<GenerarPlanillaComponent>;

  let empresa = ConstantesDatosPrueba.empresa1;
  let lsTipoPlanilla = ConstantesDatosPrueba.lsTipoPlanilla;
  let mockTipoPlanilla = ConstantesDatosPrueba.TipoPlanilla;

  @Pipe({ name: 'filter' })
  class MockPipe implements PipeTransform {
    transform(value: any[], postFilter: String, postBoolean: boolean): any[] {
      return value;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GenerarPlanillaComponent,
        GenerarTxtComponent,
        MostrarRheComponent,
        MostrarBoletaComponent,
        CalculoPlanillaComponent,
        MockPipe
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgSelectModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: PlanillasService, useClass: PlanillaServiceStub },
        { provide: TipoPlanillaService, useClass: TipoPlanillaServiceStub },
        NgbModal,
        NgbActiveModal,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          GenerarTxtComponent,
          MostrarRheComponent,
          MostrarBoletaComponent,
          CalculoPlanillaComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarPlanillaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.checkAction();
    fixture.detectChanges();
  }));

  describe('Creacion del component', () => {
    it('Deberia crearse el componente GenerarPlanilla', async(() => {
      const fixture = TestBed.createComponent(GenerarPlanillaComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  })

  describe('Metodo ngOnInit',()=>{
    it('Deberia entrar al if si hay empresa en localStorage',()=>{
      spyOn(component,'listarTrabajadorPlanilla');
      spyOn(component,'listarTrabajadorHonorario');
      spyOn(component,'checkAction');
      spyOn(component,'guardarTardanzaLocal');
      spyOn(component,'listarTiposPlanillaPorPerfil');
      localStorage.setItem('objEmpresaSeleccion',JSON.stringify(empresa));
      component.ngOnInit();
      expect(component.listarTrabajadorHonorario).toHaveBeenCalled();
      expect(component.listarTrabajadorPlanilla).toHaveBeenCalled();
      expect(component.checkAction).toHaveBeenCalled();
      expect(component.guardarTardanzaLocal).toHaveBeenCalled();
      expect(component.listarTiposPlanillaPorPerfil).toHaveBeenCalled();
      localStorage.clear();
    })
  });

  describe('Metodo listarTiposPlanillaPorPerfil',()=>{
    it('Deberia llenarse el arreglo lsTipoPlanilla',()=>{
      component.infoToken = {
        "id_perfil":1
      };
      component.listarTiposPlanillaPorPerfil();
      expect(component.lsTipoPlanilla.length>0).toBeTruthy();
    })
  })

  describe('Metodo changeTipoPlanilla',()=>{
    it('Deberia llamar a listarTrabajadoresPorTipoPlanilla si el evento no es nulo',()=>{
      spyOn(component,'listarTrabajadoresPorTipoPlanilla');
      spyOn(component,'listarTiposPlanillaPorPerfil');
      component.lsTipoPlanilla = lsTipoPlanilla;
      component.changeTipoPlanilla(1);
      expect(component.listarTrabajadoresPorTipoPlanilla).toHaveBeenCalled();
      expect(component.listarTiposPlanillaPorPerfil).toHaveBeenCalled();
    });

    it('Deberia llamar a los metodos listarTrabajadorHonorario y Planilla si el evento es nulo',()=>{
      spyOn(component,'listarTrabajadorHonorario');
      spyOn(component,'listarTrabajadorPlanilla');
      spyOn(component,'listarTiposPlanillaPorPerfil');
      component.changeTipoPlanilla(null);
      expect(component.listarTrabajadorHonorario).toHaveBeenCalled();
      expect(component.listarTrabajadorPlanilla).toHaveBeenCalled();
      expect(component.listarTiposPlanillaPorPerfil).toHaveBeenCalled();
    })
  });

  describe('Metodo listarTrabajadoresPorTipoPlanilla',()=>{
    it('Deberia llenarse lsTrabajadorPlanilla si es de 4ta categoria',()=>{
      component.tipoPlan = mockTipoPlanilla;
      component.tipoPlan.categoriaPlanilla = 4;
      component.listarTrabajadoresPorTipoPlanilla();
      expect(component.lsTrabajadorPlanilla.length>0).toBeTruthy();
    })
    it('Deberia llenarse lsTrabajadorHonorario si es de 5ta categoria',()=>{
      component.tipoPlan = mockTipoPlanilla;
      component.tipoPlan.categoriaPlanilla = 5;
      component.listarTrabajadoresPorTipoPlanilla();
      expect(component.lsTrabajadorHonorario.length>0).toBeTruthy();
    })
  })
})
