import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenubajoComponent } from '../shared/menubajo/menubajo.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { PopupService } from '../services/popup.service';
import { PostedsService } from '../services/posteds.service';


import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import { IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInfiniteScroll,MenubajoComponent, IonInfiniteScrollContent,ContentListComponent, 
            IonContent, CommonModule,SessionComponent]

})
export class HomePage {
 
     items: any[] = [];
     ini = 1;
     fin = 3;

    constructor(private popupService: PopupService,private posted: PostedsService) {

      addIcons({heartOutline,heart});
      console.log(this.obtenerInfoDispositivo());
     }

     
     ngOnInit() {
      this.loadItems();
      }

      
     loadItems(){

      this.posted.getAllPosted(this.ini,this.fin).subscribe((data:any)=>{
        this.items = this.items.concat(data);
        this.ini ++;
      });
     }

     loadMore(event: any){
      setTimeout(() =>{

        this.loadItems();
        event.target.complete();
      }, 500);
     }

  lastScrollTop = 0;
  isMenuHidden!: boolean;
  scrollTimeout: any;

  onScroll(event: CustomEvent) {
    const scrollTop = event.detail.scrollTop;

    // Limpiar timeout anterior
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (scrollTop > this.lastScrollTop + 1) {
      // 👇 Desplazándose hacia abajo → ocultar menú
      this.isMenuHidden = true;
    } else if (scrollTop < this.lastScrollTop - 1) {
      // 👆 Desplazándose hacia arriba → mostrar menú
      this.isMenuHidden = false;
    }

    // Mostrar menú cuando el scroll se detiene (después de 300ms de inactividad)
    this.scrollTimeout = setTimeout(() => {
      this.isMenuHidden = false;
    }, 300);

    this.lastScrollTop = scrollTop;
  }

  obtenerInfoDispositivo() {
  const nav = navigator;
  return {
    userAgent: nav.userAgent,
    language: nav.language,
    platform: nav.platform,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    screen: { width: screen.width, height: screen.height, orientation: screen.orientation?.type || null },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
}

