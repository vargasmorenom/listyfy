import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  login(token: string) {
    localStorage.setItem('AuthToken', token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('AuthToken');
    this.loggedIn.next(false);
  }

  checkToken(): boolean {
    const hasToken = !!localStorage.getItem('AuthToken');
    this.loggedIn.next(hasToken);
    return hasToken;
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
  }
}
