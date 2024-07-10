import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../config/article.service';

@Component({
  selector: 'app-edit-article-content-dialog',
  templateUrl: './edit-article-content-dialog.component.html',
  styleUrls: ['../edit-review-news-dialog/edit-review-news-dialog.component.less']
})
export class EditArticleContentDialogComponent {
  editArticleContentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    public dialogRef: MatDialogRef<EditArticleContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editArticleContentForm = this.fb.group({
      title: [data.title, Validators.required],
      content: [data.content, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editArticleContentForm.valid) {
      this.articleService.updateArticle(this.data.id, this.editArticleContentForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }
}
