import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreTitlesComponent } from './genre-titles.component';

describe('GenreTitlesComponent', () => {
  let component: GenreTitlesComponent;
  let fixture: ComponentFixture<GenreTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreTitlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
