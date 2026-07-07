import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // ✅ appelé de façon synchrone, dans le bon contexte

  return next(req).pipe(
    catchError((err: any) => {
      if (err && err.status === 401) {
        console.error('[401 interceptor] endpoint:', req.url, 'status:', err.status);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          setTimeout(() => router.navigateByUrl('/login', { replaceUrl: true }));
        }
      }
      return throwError(() => err);
    })
  );
};
