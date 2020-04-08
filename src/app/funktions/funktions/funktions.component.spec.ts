import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunktionsComponent } from './funktions.component';

describe('FunktionsComponent', () => {
  let component: FunktionsComponent;
  let fixture: ComponentFixture<FunktionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunktionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunktionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
