import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';
import { catchError, map, of } from 'rxjs';

// https://v17.angular.io/api/router/CanActivateFn
export const authRoleGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get('/api/admin', { observe: 'response' }).pipe(
    map((response) => {
      if (response.status === 200)
        return true;
      return false;
    }),
    catchError((error) => {
      if (error.status === 403)
        router.navigate(['/forbidden']);
      return of(false); // Khong cho phep truy cap
    })
  )
};
