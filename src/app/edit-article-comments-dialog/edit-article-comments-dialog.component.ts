import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../config/comment.service';

@Component({
  selector: 'app-edit-article-comments-dialog',
  templateUrl: './edit-article-comments-dialog.component.html',
  styleUrls: ['../edit-review-news-dialog/edit-review-news-dialog.component.less']
})
export class EditArticleCommentsDialogComponent {
  editArticleCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    public dialogRef: MatDialogRef<EditArticleCommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editArticleCommentForm = this.fb.group({
      comment_title: [data.comment_title, Validators.required],
      comment_content: [data.comment_content, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editArticleCommentForm.valid) {
      this.commentService.updateComment(this.data.id, this.editArticleCommentForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }
}
