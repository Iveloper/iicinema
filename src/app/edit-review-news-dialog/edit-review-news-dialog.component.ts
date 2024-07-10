import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../config/auth.service';

@Component({
  selector: 'app-edit-review-news-dialog',
  templateUrl: './edit-review-news-dialog.component.html',
  styleUrls: ['./edit-review-news-dialog.component.less']
})
export class EditReviewNewsDialogComponent {
  editReviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<EditReviewNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editReviewForm = this.fb.group({
      review_title: [data.review_title, Validators.required],
      review_content: [data.review_content, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editReviewForm.valid) {
      this.authService.updateReview(this.data.id, this.editReviewForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }
}
