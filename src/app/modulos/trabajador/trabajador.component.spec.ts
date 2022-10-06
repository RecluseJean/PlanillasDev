import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TrabajadorComponent } from './trabajador.component'
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderService } from '../../services/shared/header.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TrabajadorComponent', () => {

  let component: TrabajadorComponent;
  let fixture: ComponentFixture<TrabajadorComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrabajadorComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        PipesModule,
        NgSelectModule
      ],
      providers: [
        HeaderService,
        SidebarService,
        UsuarioService,
        NgbModal,
        NgbModalStack,
        NgbActiveModal
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajadorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('Deberia crearse el componente trabajador', async(() => {
    const fixture = TestBed.createComponent(TrabajadorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
