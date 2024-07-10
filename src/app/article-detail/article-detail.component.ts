import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../config/comment.service';
import { ArticleService } from '../config/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { EditArticleCommentsDialogComponent } from '../edit-article-comments-dialog/edit-article-comments-dialog.component';
import { EditArticleContentDialogComponent } from '../edit-article-content-dialog/edit-article-content-dialog.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})
export class ArticleDetailComponent implements OnInit {
  userId: string | null = '';
  roleId: string | null = '';
  article: any;
  images: any[] | undefined;
  comments: any[] | undefined;
  author: any | undefined;
  commentForm: FormGroup;
  isLoggedIn: boolean = true;
  isAuthorOrAdmin: boolean = true;
  articleId = this.route.snapshot.params['id'];
  selectedImageIdToDelete: number | null = null;

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      comment_title: ['', Validators.required],
      comment_content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.roleId = localStorage.getItem('role_id');
    this.loadArticle();
  }

  submitComment(): void {
    if (this.commentForm.valid && (this.userId && this.articleId)) {
      const reviewData = {
        commenter_id: this.userId,
        article_id: this.articleId,
        comment_title: this.commentForm.value.comment_title,
        comment_content: this.commentForm.value.comment_content
      };

      this.commentService.submitComment(reviewData).subscribe(response => {
        this.loadComments();
        this.commentForm.reset();
        this.openDialog('Success', "Your comment was submitted successfully!");
      },
      error => {
        this.openDialog('Error', "Couldn't submit comment!");
      }
    )}
  }

  public loadComments() {
    this.commentService.loadComments(this.articleId).subscribe(
      response => {
        this.comments = response;
    },
      error => {
        this.openDialog('Error', 'Loading other users comments failed.');
    });
  }

  public loadArticle() {
    this.articleService.getArticle(this.articleId).subscribe(data => {
      this.article = data.article;
      this.images = data.images;
      this.comments = data.comments;
      this.author = data.author;
    });
  }

  public deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(
      response => {
        this.loadComments();
        this.commentForm.reset();
        this.openDialog('Success', "Your comment was deleted successfully!");
    },
      error => {
        this.openDialog('Error', 'Loading other users comments failed.');
    });
  }

  public deleteArticle(articleId: string) {
    this.articleService.deleteArticle(articleId).subscribe(
      response => {
        this.router.navigate(['/articles']);
        this.openDialog('Success', "Article was deleted successfully!");
    },
      error => {
        this.openDialog('Error', 'Loading other users comments failed.');
    });
  }

  public deleteArticleImage(imageId: string) {
    this.articleService.deleteArticleImage(imageId).subscribe(
      response => {
        this.loadArticle();
        this.openDialog('Success', response.message);
    },
      error => {
        this.openDialog('Error', 'Could not delete this image!');
    });
  }

  public openEditDialog(review: any): void {
    const dialogRef = this.dialog.open(EditArticleCommentsDialogComponent, {
      width: '500px',
      data: review
    });
    this.loadComments();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadComments();
      }
    });
  }

  public openEditArticleDialog(article: any): void {
    const dialogRef = this.dialog.open(EditArticleContentDialogComponent, {
      width: '500px',
      data: article
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArticle();
      }
    });
  }

  public confirmDeleteArticle(articleId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Do you really want to delete this article?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteArticle(articleId);
      }
    });
  }

  public confirmDelete(commentId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Do you really want to delete this comment?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(commentId);
      }
    });
  }

  public confirmDeleteImage(imageId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Do you really want to delete this image?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteArticleImage(imageId);
      }
    });
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });
  }
}