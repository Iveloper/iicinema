import { Component } from '@angular/core';
import { AuthService } from '../config/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user_id')) {
      this.router.navigate(['/profile']);
    }
  }

  login() {
    let email = this.email,
    password = this. password;
    this.authService.login(email, password).subscribe(
      response => {
        // Store user info
        this.authService.handleLoginSuccess(response);
        this.openDialog('Success', 'Login successful');
      },
      error => {
        this.openDialog('Error', 'Login failed');
      }
    );
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/profile']);
      }
    });
  }
}
