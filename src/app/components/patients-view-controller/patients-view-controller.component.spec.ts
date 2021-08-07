import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsViewControllerComponent } from './patients-view-controller.component';

describe('PatientsViewControllerComponent', () => {
  let component: PatientsViewControllerComponent;
  let fixture: ComponentFixture<PatientsViewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsViewControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsViewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
