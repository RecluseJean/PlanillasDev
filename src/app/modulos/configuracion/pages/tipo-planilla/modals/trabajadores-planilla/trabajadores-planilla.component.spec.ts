import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresPlanillaComponent } from './trabajadores-planilla.component';

describe('TrabajadoresPlanillaComponent', () => {
  let component: TrabajadoresPlanillaComponent;
  let fixture: ComponentFixture<TrabajadoresPlanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajadoresPlanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
