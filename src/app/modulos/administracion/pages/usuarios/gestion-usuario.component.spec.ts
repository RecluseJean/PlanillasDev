import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { GestionUsuariosComponent } from './gestion-usuario.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { UsuarioServiceStub } from '../../../../mocks/services/usuario.service.stub';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../services/roles/roles.service';
import { NuevoPasswordComponent } from './modals/nuevo-password/nuevo-password.component';

describe('GestionUsuariosComponent', () => {
  let component: GestionUsuariosComponent;
  let fixture: ComponentFixture<GestionUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionUsuariosComponent,
        NuevoUsuarioComponent,
        NuevoPasswordComponent
      ],
      imports: [RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: UsuarioService, useClass: UsuarioServiceStub },
        RolService,
        NgbModal,
        NgbModalStack,
        NgbActiveModal,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevoUsuarioComponent,NuevoPasswordComponent] } })
      .compileComponents();

    fixture = TestBed.createComponent(GestionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Creacion del component', () => {
    it('Deberia crearse el componente GestionUsuarios', async(() => {
      const fixture = TestBed.createComponent(GestionUsuariosComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  })

  describe('Pruebas de integracion', () => {
    describe('Llamada a nuevo usuario desde el HTML', () => {
      it('Deberia llamar a metodo openModal al hacer click en nuevo usuario', () => {
        const boton = fixture.debugElement.nativeElement.querySelector('#nuevo');
        spyOn(component, "openModal").and.callThrough();
        boton.click();
        expect(component.openModal).toHaveBeenCalled();
      })
    })

    describe('Llamada a actualizar usuario desde el HTML', () => {
      it('Deberia llamar al metodo openModal al hacer click en nuevo usuario', () => {
        const boton = fixture.debugElement.nativeElement.querySelector('#actusu');
        spyOn(component, "openModal").and.callThrough();
        boton.click();
        expect(component.openModal).toHaveBeenCalled();
      })
    })

    describe('Llamada a actualizar contraseña desde el HTML', () => {
      it('Deberia llamar al abrir un modal al hacer click en nuevo usuario', () => {
        const boton = fixture.debugElement.nativeElement.querySelector('#actpass');
        const modal = fixture.debugElement.componentInstance;
        var indice = ConstantesDatosPrueba.usuarioPrueba1;
        spyOn(component, "openModal").and.callThrough();
        boton.click();
        component.openModal(indice);
        expect(component.openModal).toHaveBeenCalled();
        expect(modal).toBeTruthy();
      })
    })

  })

  describe('Pruebas unitarias', () => {
    it('verificar que el input de modal se llene con el usuario ingresado', () => {
      const modal = fixture.debugElement.componentInstance;
      var user = ConstantesDatosPrueba.usuarioPrueba1;
      spyOn(component.modalService, "open").and.callThrough();
      component.actualizarUsuario(user);
      modal.input_usuario = user;
      expect(modal.input_usuario).toEqual(user);
      expect(component.modalService.open).toHaveBeenCalled();
    })
  })

  describe('Prueba metodo actualizar contra', () => {
    it('Deberia llamarse desde el template', () => {
      spyOn(component, 'actualizarContra').and.callThrough();
      const button = fixture.debugElement.nativeElement.querySelector('#actpass');
      button.click();
      expect(component.actualizarContra).toHaveBeenCalled();
    })
  })

})