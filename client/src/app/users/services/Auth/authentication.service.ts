import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'AuthToken';

  constructor() { }

  getToken(): string {
    let token = localStorage.getItem(this.TOKEN_KEY);
    if (token == null)
      throw new Error('Token is null');
    console.log('Lay token tu localStorage:', token);
    return token;
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('Set token thanh cong');
  }

  clearToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    console.log("Clear token thanh cong");
  }
}
