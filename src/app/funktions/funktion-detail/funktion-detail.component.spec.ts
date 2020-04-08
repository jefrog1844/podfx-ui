import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunktionDetailComponent } from './funktion-detail.component';

describe('FunktionDetailComponent', () => {
  let component: FunktionDetailComponent;
  let fixture: ComponentFixture<FunktionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunktionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunktionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
