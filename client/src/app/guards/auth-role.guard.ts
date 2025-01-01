import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { DecodeToken } from '../services/Author/DecodeToken';

// https://v17.angular.io/api/router/CanActivateFn
export const authRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const decodeToken = inject(DecodeToken);

  const payload = decodeToken.getPayload();

  if (!payload) {
    router.navigate(['/login']);
    return false;
  }

  // Kiem tra khi nguoi dung truy cap den Route cos tien to /admin
  if (state.url.startsWith('/admin')) {
    if (payload.roleId !== 1) {
      router.navigate(['/forbidden']);
      return false;
    }
  }

  return true;
};
