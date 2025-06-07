import { HttpInterceptorFn } from '@angular/common/http';


export const authValidInterceptor: HttpInterceptorFn = (req, next) => {

   const isFormData = req.body instanceof FormData;
  const Header = req.clone({
    withCredentials: true,
     ...(isFormData
      ? {}
      : {
          setHeaders: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Origin': 'http://localhost:8100'
          }
        })
  });

  return next(Header);
};
