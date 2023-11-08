import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  private isLoggedIn = new BehaviorSubject<boolean>(
    this.getInitialLoggedInState()
  );

  private getInitialLoggedInState(): boolean {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  }

  logoutUser() {
    this.isLoggedIn.next(false);
    localStorage.setItem('isLoggedIn', 'false');
  }

  loginUser() {
    this.isLoggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }
}
