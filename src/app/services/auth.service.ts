import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    this.checkToken();
  }

  login(token: string) {
    localStorage.setItem('AuthToken', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('AuthToken');
    this.loggedIn.next(false);
  }

  checkToken() {
    const token = localStorage.getItem('AuthToken');
    this.loggedIn.next(!!token); // true si existe token, false si no
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
  }

}
