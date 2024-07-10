import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../config/article.service';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.less']
})
export class ArticleCreateComponent {
  public userId: string | null = '';
  public roleId: string | null = '';
  public articleForm: FormGroup;
  public selectedFiles: File[] = [];
  public additionalImages: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.roleId = localStorage.getItem('role_id');
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  public submitArticle() {
    if (this.articleForm.invalid || this.userId === null) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('content', this.articleForm.get('content')?.value);
    formData.append('author_id', this.userId);
    
    const mainImageInput = document.getElementById('images') as HTMLInputElement;
    if (mainImageInput.files && mainImageInput.files.length > 0) {
      formData.append('images[]', mainImageInput.files[0], mainImageInput.files[0].name);
    }

    // Append additional images
    if (this.additionalImages.length > 0) {
      this.additionalImages.shift();
    }
    for (const imageInput of this.additionalImages) {
      if (imageInput.files && imageInput.files.length > 0) {
        formData.append('images[]', imageInput.files[0], imageInput.files[0].name);
      }
    }

    this.articleService.createArticle(formData).subscribe(
      response => {
        this.openDialog('Success', response.message);
        this.router.navigate(['/articles', response.article_id]);
      },
      error => {
        this.openDialog('Error', error.message);
    });
  }

  onFileSelected(event: any) {
    // Handle file selection if needed
    this.additionalImages.push(event.target);
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });
  }
}