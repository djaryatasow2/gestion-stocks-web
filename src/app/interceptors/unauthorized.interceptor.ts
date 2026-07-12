import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: any) => {
      if (err && err.status === 401) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          localStorage.clear();
          setTimeout(() => router.navigateByUrl('/login', { replaceUrl: true }), 100);
        }
      }
      return throwError(() => err);
    })
  );
};