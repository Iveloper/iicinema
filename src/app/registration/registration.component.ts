import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.less']
})
export class RegistrationComponent implements OnInit {
  user: any = {};
  registerForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user_id')) {
      this.router.navigate(['/profile']);
    }
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = {
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password']
    };

    // Set the headers for the POST request
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>('http://localhost:8080/api/users/register', formData, {headers: header})
      .subscribe(
        response => {
          this.openDialog('Success', 'Registration successful');
        },
        error => {
          this.openDialog('Error', 'Registration failed');
        }
      );
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/login']);
      }
    });
  }
}
