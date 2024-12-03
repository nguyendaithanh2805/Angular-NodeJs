import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { DecodeToken } from '../services/Author/DecodeToken';

// https://v17.angular.io/api/router/CanActivateFn
export const authRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const decodeToken = inject(DecodeToken);

  const roleId = decodeToken.getPayload();

  if (roleId !== 1) {
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
