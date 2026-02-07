import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from './services/network.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(private networkService: NetworkService,private router: Router) {
      this.networkService.isOnline$.subscribe(isOnline => {
          const currentUrl = this.router.url;
      
          if (!isOnline && currentUrl !== 'no-connection') {
            
  
              this.router.navigate(['no-connection']);
          } else if (isOnline && currentUrl === 'no-connection') {
            
            this.router.navigate(['/']); // O la ruta que prefieras al reconectar
          }
      
     
    });
    
  }


}
