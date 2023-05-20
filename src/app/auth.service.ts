import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private isLoggedInValue: boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService
  ) { }

  storeToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, undefined, '/', 'localhost', true, 'Strict');
  }

  getToken(): string | null {
    //return localStorage.getItem(this.TOKEN_KEY);
    return this.cookieService.get(this.TOKEN_KEY);
  }

  removeToken(): void {
    // Remove the token from localStorage
    //->localStorage.removeItem(this.TOKEN_KEY);
    // Remove the token from the cookie
    this.cookieService.delete(this.TOKEN_KEY, '/', 'localhost', true, 'Strict');
    this.cookieService.delete('jwtToken', '/', 'localhost', true, 'Strict');
  }
  
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }

/*   isLoggedIn(): boolean {
    console.log(!!this.getToken() || this.cookieService.check('token'))
    return !!this.getToken() || this.cookieService.check('token');
  } */

  login(data: any): Observable<any> {
    this.isLoggedInValue = true;
    return this.http.post(`http://localhost:5056/api/v1/Login`, data);

  }
  logout(): void {
    this.removeToken();
  }




  regist(data: any): Observable<any> {
    return this.http.post(`http://localhost:5056/api/v1/Registration`, data);
  }
}
