import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsMoviesReviewsComponent } from './shows-movies-reviews.component';

describe('ShowsMoviesReviewsComponent', () => {
  let component: ShowsMoviesReviewsComponent;
  let fixture: ComponentFixture<ShowsMoviesReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsMoviesReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsMoviesReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
