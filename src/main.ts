import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr} from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authValidInterceptor } from './app/middleware/auth-valid.interceptor';
import { erroresInterceptor } from './app/middleware/errores.interceptor';
import { errorConexionInterceptor } from './app/middleware/errorConexion.interceptor';
import { ModalController, PopoverController } from '@ionic/angular';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ModalController },
    { provide: PopoverController },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideToastr({timeOut: 3000, preventDuplicates: true}),
    provideHttpClient(
      withInterceptors([authValidInterceptor,erroresInterceptor,errorConexionInterceptor])
    ),
  ],
});
