import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarServiceStub } from '../../mocks/services/sidebar.service.stub';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [
        SidebarComponent,
      ],

      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', component: SidebarComponent }]),
        HttpClientTestingModule,

      ],

      providers: [{ provide: SidebarService, useClass: SidebarServiceStub },
        UsuarioService]

    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  describe('Creacion del componente', () => {
    it('Deberia crearse el SidebarComponent', async(() => {
      const fixture = TestBed.createComponent(SidebarComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
  })

  describe('Metodo Cargar Paginas Por Modulo', () => {
    it('Deberia llenarse el elemento menu[index]', () => {
      expect(component.lsmenu.length).toBeGreaterThan(0);
    })
  })

  describe('Implementacion ngOnInit', () => {
    it('Deberia llamarse el metodo CargarPaginasPerfil', () => {
      spyOn(component._sidebar, 'cargarPaginasPerfil').and.callThrough();
      component.ngOnInit();
      expect(component._sidebar.cargarPaginasPerfil).toHaveBeenCalled();
    })
  })

  describe('Metodo ToggleCollapse', () => {
    it('Deberia llamarse el metodo CollapsePerfil', () => {
      spyOn(component, 'collapsePerfil').and.callThrough();
      component.toggleCollapse(1);
      expect(component.collapsePerfil).toHaveBeenCalled();  
    })

    it('Deberia setearse con false el open de cada menu',()=>{
      component.lsmenu = [{'idModulo':1,'open':true}]
      component.toggleCollapse(1);
      expect(component.lsmenu[0].open).toBeFalsy();
    })
  })

  describe('Metodo LogOut', () => {
    it('Deberia llamarse el metodo logOut', () => {
      spyOn(component._usuarioService, 'logout').and.callThrough();
      component.logout();
      expect(component._usuarioService.logout).toHaveBeenCalled();
    })
  })

  describe('Prueba metodo CollapsePerfil', () => {
    it('Deberia cerrarse el sidebar cuando openperfil es falso', () => {
      component.openPerfil = true;
      component.collapsePerfil();
      expect(component.openPerfil).toBeFalsy();
    })
  })





});
