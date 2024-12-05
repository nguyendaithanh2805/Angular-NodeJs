import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/Auth/authentication.service';

// https://v17.angular.io/api/common/http/HttpInterceptorFn
export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService)
  
  const authToken = authService.getToken();
  if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next(authReq);
  }
  
  return next(req);
};
