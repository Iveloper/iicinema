import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { AuthService } from './config/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public title = 'iicinema';
  public userId: string | null = '';
  public username: string | null = '';
  public email: string | null = '';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.getUserInfoObservable().subscribe(userInfo => {
      if (userInfo) {
        // User is logged in, update properties
        this.userId = userInfo.id;
        this.username = userInfo.username;
        this.email = userInfo.email;
      } else {
        // User is logged out, reset properties
        this.userId = '';
        this.username = '';
        this.email = '';
      }
    });
    // Retrieve user information from localStorage
    this.userId = localStorage.getItem('user_id');
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }
}
