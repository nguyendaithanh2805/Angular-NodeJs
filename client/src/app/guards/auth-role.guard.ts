import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiResponse } from '../common/ApiResponse';

// https://v17.angular.io/api/router/CanActivateFn
export const authRoleGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<ApiResponse<null>>('http://localhost:3000/api/admin', {observe: 'response'})
      .pipe(
        map((response) => {
          if (response.body?.success)
            return true;

          router.navigate(['/forbidden']);
          return false;
        }),
        catchError((error) => {
          if (error.status === 403) {
            router.navigate(['/forbidden']);
          } else if (error.status === 401) {
            router.navigate(['/login']);
          }
          return of(false); // khong cho phep truy cap neu co loi
        })
      )
};
