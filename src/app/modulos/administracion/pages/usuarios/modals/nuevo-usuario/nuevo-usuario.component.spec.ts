import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NuevoUsuarioComponent } from './nuevo-usuario.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NuevoUsuarioConfirmarComponent } from '../nuevo-usuario-confirmar/nuevo-usuario-confirmar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { UsuarioServiceStub } from '../../../../../../mocks/services/usuario.service.stub';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { RolService } from '../../../../services/roles/roles.service';
import { RolServiceStub } from '../../../../../../mocks/services/roles.service.stub';


describe('NuevoUsuarioComponent', () => {
  let component: NuevoUsuarioComponent;
  let fixture: ComponentFixture<NuevoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NuevoUsuarioComponent,
        NuevoUsuarioConfirmarComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: UsuarioService, useClass: UsuarioServiceStub },
        { provide: RolService, useClass: RolServiceStub },
        NgbActiveModal,
        NgbModal,
        NgbModalStack
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevoUsuarioConfirmarComponent] } })
      .compileComponents();

    fixture = TestBed.createComponent(NuevoUsuarioComponent);
    component = fixture.componentInstance;
    component.input_usuario_final = ConstantesDatosPrueba.usuarioPrueba1;
    fixture.detectChanges();
  }))

  describe('Creacion del component', () => {
    it('Deberia crearse el componente NuevoUsuario', async(() => {
      const fixture = TestBed.createComponent(NuevoUsuarioComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  })

  // describe('Implementacion ngOnInit', () => {
  //   it('Deberia llamar al metodo porDefecto del ngOnInit', () => {
  //     spyOn(component, 'porDefecto').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.porDefecto).toHaveBeenCalled();
  //   })
  // })

  // describe('Metodo porDefecto', () => {
  //   it("Deberia setearse user.estado a verdad", () => {
  //     component.porDefecto();
  //     expect(component.usuario.estado).toBeTruthy();
  //   })
  // })

  describe('Metodo verificarContraseña', () => {
    it('Deberia setearse en true el validar si la contraseña es igual a confirmar', () => {
      component.usuario.password = "123";
      component.confirm = "123";
      component.verificarContrasena(1);
      expect(component.validar).toBeTruthy();
    })
    it('Deberia setearse en falso el validar si la contraseña no es igual a confirmar', () => {
      component.usuario.password = "1234";
      component.confirm = "123";
      component.verificarContrasena(1);
      expect(component.validar).toBeFalsy();
    })
    it('validar deberia ser true, confirm y password vacios si se deja el campo de Password vacio', () => {
      component.verificarContrasena(null);
      expect(component.validar).toBeTruthy();
      expect(component.usuario.password).toEqual('');
      expect(component.confirm).toEqual('');
    })
  })

  describe("Metodo close integracion", () => {
    it('Deberia llamarse al metooo close cuando se hace click en el boton cancelar', () => {
      const boton = fixture.debugElement.nativeElement.querySelector('#cerrar');
      spyOn(component, 'close').and.callThrough();
      boton.click();
      expect(component.close).toHaveBeenCalled();
    })
  })

  describe("Metodo confirmarNuevoUsuario integracion", () => {
    it('Deberia llamarse al metodo confirmarNuevoUsuario cuando se hace click en el boton Continuar', () => {
      const boton = fixture.debugElement.nativeElement.querySelector('#continuar');
      spyOn(component, 'confirmarNuevoUsuario').and.callThrough();
      boton.click();
      expect(component.confirmarNuevoUsuario).toHaveBeenCalled();
    })

    it('Deberia llamarse al metooo openModalConfirmar cuando se hace click en el boton Continuar', () => {
      const boton = fixture.debugElement.nativeElement.querySelector('#continuar');
      spyOn(component, 'openModalConfirmar').and.callThrough();
      boton.click();
      expect(component.openModalConfirmar).toHaveBeenCalled();
    })
  })
})