import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleContentDialogComponent } from './edit-article-content-dialog.component';

describe('EditArticleContentDialogComponent', () => {
  let component: EditArticleContentDialogComponent;
  let fixture: ComponentFixture<EditArticleContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticleContentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
