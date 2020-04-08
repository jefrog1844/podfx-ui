import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunktionsListComponent } from './funktions-list.component';

describe('FunktionsListComponent', () => {
  let component: FunktionsListComponent;
  let fixture: ComponentFixture<FunktionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunktionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunktionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
