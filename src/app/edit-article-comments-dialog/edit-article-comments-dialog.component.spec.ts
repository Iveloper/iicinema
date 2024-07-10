import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleCommentsDialogComponent } from './edit-article-comments-dialog.component';

describe('EditArticleCommentsDialogComponent', () => {
  let component: EditArticleCommentsDialogComponent;
  let fixture: ComponentFixture<EditArticleCommentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticleCommentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
