import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoriteService } from '../config/favorite.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { AuthService } from '../config/auth.service';
import { EditReviewNewsDialogComponent } from '../edit-review-news-dialog/edit-review-news-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-shows-movies-reviews',
  templateUrl: './shows-movies-reviews.component.html',
  styleUrls: ['./shows-movies-reviews.component.less']
})
export class ShowsMoviesReviewsComponent implements OnInit {
  @Input() productionId: string = '';
  public userId: string | null = '';
  public roleId: string | null = '';
  public systemUsersReviews: any = [];
  public reviewForm: FormGroup;

  constructor(
    public authService: AuthService,
    public favoriteService: FavoriteService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { 
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      reviewContent: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.roleId = localStorage.getItem('role_id');
    this.loadReviews();
  }

  public loadReviews() {
    this.authService.loadProductionReviews(this.productionId).subscribe(
      response => {
        this.systemUsersReviews = response;
    },
      error => {
        this.openDialog('Error', 'Loading other users reviews failed.');
    });
  }

  public openEditDialog(review: any): void {
    const dialogRef = this.dialog.open(EditReviewNewsDialogComponent, {
      width: '500px',
      data: review
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReviews();
      }
    });
  }

  public confirmDelete(reviewId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Do you really want to delete this review?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteReview(reviewId);
      }
    });
  }

  public deleteReview(reviewId: string) {
    this.authService.deleteReview(reviewId).subscribe(
      response => {
        this.openDialog('Success', response.message);
        this.loadReviews();
      },
      error => {
        this.openDialog('Error', error.message);
      }
    );
  }

  public submitReview(): void {
    if (this.reviewForm.valid && (this.userId && this.productionId)) {
      const reviewData = {
        user_id: this.userId,
        production_id: this.productionId,
        review_title: this.reviewForm.value.title,
        review_content: this.reviewForm.value.reviewContent
      };

      this.authService.submitReview(reviewData).subscribe(response => {
        this.loadReviews();
        this.reviewForm.reset();
      },
      error => {
        console.log('Error');
      }
    );
    }
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });
  }
}
