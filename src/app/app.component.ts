import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wm-app';
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    console.log("now im at app.component ")
    const token = this.cookieService.get('token');
    console.log("i get token => ")
    console.log(token)
    if (token && !this.authService.isTokenExpired()) {
      console.log("Hello World")
      this.currentUser = this.authService.decodeToken();
      console.log("Current user is => " , this.currentUser)
      this.router.navigate(['/home']); // Navigate to home if logged in
    } else {
      this.router.navigate(['/login']); // Navigate to login if not logged in
    }
  }
}
