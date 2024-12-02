import { Injectable } from "@angular/core";
import { AuthenticationService } from "../Auth/authentication.service";

@Injectable({
    providedIn: 'root',
  })
  
export class DecodeToken {

    constructor(private authService: AuthenticationService) {}

    getPayload(): any {
        try {
            const token = this.authService.getToken()
            if (token == null)
                throw new Error("Token is null");

            const payload = token.split('.')[1];
            const decodedToken = JSON.parse(atob(payload));
            return decodedToken.roleId;
        } catch (error) {
            return console.error('Invalid token format', error);
        }
    }
}