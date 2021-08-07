import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsContainerComponent } from './patients-container.component';

describe('PatientsContainerComponent', () => {
  let component: PatientsContainerComponent;
  let fixture: ComponentFixture<PatientsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
