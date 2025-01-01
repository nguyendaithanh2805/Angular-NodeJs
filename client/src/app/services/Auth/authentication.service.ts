import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// https://jscrambler.com/blog/working-with-angular-local-storage
export class AuthenticationService {
  private readonly TOKEN_KEY = 'AuthToken';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem(this.TOKEN_KEY);
      console.log('Lay token tu localStorage:', token);
      return token;
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
      console.log('Set token thanh cong');
    }
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      console.log("Clear token thanh cong");
    }
  }
}
