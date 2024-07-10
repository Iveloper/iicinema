import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewNewsDialogComponent } from './edit-review-news-dialog.component';

describe('EditReviewNewsDialogComponent', () => {
  let component: EditReviewNewsDialogComponent;
  let fixture: ComponentFixture<EditReviewNewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewNewsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewNewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
