import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { GenericHttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  
  constructor(
    private http: GenericHttpService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  
  login(email: string, password: string) {
    return this.http
      .post(`/auth`, {
        email,
        password,
      })      
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post(`/auth/register`, {
        name,
        email,
        password,
      })
    
  }
}
