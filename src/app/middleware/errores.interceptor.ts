import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let errorMessage = 'Error desconocido. Intenta más tarde.';

      switch (error.status) {
        case 400:
          errorMessage = 'Datos inválidos. Verifica tu solicitud.';
          break;
        case 401:
          errorMessage = 'No autorizado. Inicia sesión nuevamente.';
          router.navigate(['/login']); // Redirige a login
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Contacta al soporte.';
          break;
        default:
          if (error.error instanceof ErrorEvent) {
            errorMessage = 'Error de red. Verifica tu conexión.';
          }
      }

      // Lanza el error con el mensaje personalizado
      return throwError(() => new Error(errorMessage));

    }));



};


