import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarNuevoTipoPlanillaComponent } from './confirmar-nuevo-tipo-planilla.component';

describe('ConfirmarNuevoTipoPlanillaComponent', () => {
  let component: ConfirmarNuevoTipoPlanillaComponent;
  let fixture: ComponentFixture<ConfirmarNuevoTipoPlanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarNuevoTipoPlanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarNuevoTipoPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
