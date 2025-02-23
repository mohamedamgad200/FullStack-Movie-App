import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  register(email: string, password: string, role: string) {
    return this.http.post(environment.API_URL + '/user/register', {
      email,
      password,
      role,
    });
  }
  login(email: string, password: string) {
    return this.http.post(environment.API_URL + '/user/login', {
      email,
      password,
    });
  }
  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  get isAdmin() {
    let role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      return true;
    }
    return false;
  }
  get isUser() {
    let role = localStorage.getItem('role');
    if (role === 'USER') {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  }
}
