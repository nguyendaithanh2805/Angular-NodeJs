import { Injectable } from "@angular/core";
import { AuthenticationService } from "../Auth/authentication.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
  })
  
export class DecodeToken {

    constructor(
        private authService: AuthenticationService, 
        private router: Router
    ) {}

    getPayload(): any {
        try {
            const token = this.authService.getToken()
            if (token == null)
                throw new Error("Token is null");

            const payload = token.split('.')[1];
            const decodedToken = JSON.parse(atob(payload));
            return decodedToken;
        } catch (error) {
            console.error('Invalid token format:', error);
            this.router.navigate(['/login']);
            return null;
        }
    }
}