import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenubajoComponent } from '../shared/menubajo/menubajo.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';
import { PopupService } from '../services/popup.service';

import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import { IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/angular/standalone';


/***contenido de prueba */

import { content } from 'src/app/configs/contentPrueba';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInfiniteScroll,MenubajoComponent, IonInfiniteScrollContent,ContentListComponent, IonContent, CommonModule,SessionComponent,ProfileComponent]

})
export class HomePage {
  public listasPerfil:any[];
     items: any[] = [];
     ini = 1;
     fin = 3;

    constructor(private popupService: PopupService) {
      this.listasPerfil = content;
      addIcons({heartOutline,heart});

     }

     
     ngOnInit() {
      this.loadItems();

    }
     loadItems(){

      // this.getList.getcontent(this.ini,this.fin).subscribe((data:any)=>{
      //   this.items = this.items.concat(data);
      //   this.ini ++;
      //   console.log(this.ini);
      //});
     }

     loadMore(event: any){
      setTimeout(() =>{

        this.loadItems();
        event.target.complete();
      }, 500);
     }
}
