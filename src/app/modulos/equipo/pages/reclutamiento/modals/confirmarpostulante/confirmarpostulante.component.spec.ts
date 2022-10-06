import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarpostulanteComponent } from './confirmarpostulante.component';

describe('ConfirmarpostulanteComponent', () => {
  let component: ConfirmarpostulanteComponent;
  let fixture: ComponentFixture<ConfirmarpostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarpostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarpostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


