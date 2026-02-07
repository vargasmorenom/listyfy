import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenubajoComponent } from '../../shared/menubajo/menubajo.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { PopupService } from '../../services/popup.service';
import { PostedsService } from '../../services/posteds.service';

import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import { IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-viewtrends',
  templateUrl: './viewtrends.page.html',
  styleUrls: ['./viewtrends.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, MenubajoComponent, ContentListComponent, SessionComponent, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class ViewtrendsPage implements OnInit {

  lastScrollTop = 0;
  isMenuHidden!: boolean;
  scrollTimeout: any;
  idcontent: any;
  items: any[] = [];
  ini = 1;
  fin = 3;

  constructor(    
    private popupService: PopupService,
    private posted: PostedsService,
    private param: ActivatedRoute,
    private navegar: Router,
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.loadItems(this.idcontent);
    addIcons({ heart, heartOutline })
  }

    loadItems(id: any) {
      this.posted.getAllPostedByTag(this.ini, this.fin, id).subscribe((data: any) => {
        this.items = this.items.concat(data);
        this.ini++;
      });
    }

    cargarDatos() {
    this.param.queryParams.subscribe((parametro: any) => {
      if(!parametro['id']) {
      //  this.navegar.navigate(['/']);
      }else{
        this.idcontent =  parametro['id'];
      }
      
      });
    }


    loadMore(event: any) {
      setTimeout(() => {
      this.loadItems(this.idcontent);
      event.target.complete();
      }, 500);
    }
    
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

}
