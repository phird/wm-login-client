import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  firstName: string;
  lastName: string;
  username: string;

  constructor(private authService: AuthService) {
    const user = this.authService.decodeToken();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
  }

  logout(): void {
    this.authService.logout();
    // Redirect to the login page
    // You can use the Router module for navigation if needed
    window.location.href = '/login';
  }
}
