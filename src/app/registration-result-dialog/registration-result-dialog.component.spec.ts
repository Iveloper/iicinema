import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationResultDialogComponent } from './registration-result-dialog.component';

describe('RegistrationResultDialogComponent', () => {
  let component: RegistrationResultDialogComponent;
  let fixture: ComponentFixture<RegistrationResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
