import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenubajoComponent } from '../../shared/menubajo/menubajo.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { PostedsService } from '../../services/posteds.service';
import { ToastrService } from 'ngx-toastr';

import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBackOutline } from 'ionicons/icons';

import { IonInfiniteScroll, IonInfiniteScrollContent, IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-viewtrends',
  templateUrl: './viewtrends.page.html',
  styleUrls: ['./viewtrends.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, MenubajoComponent, ContentListComponent, SessionComponent, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class ViewtrendsPage implements OnInit {

  lastScrollTop = 0;
  isMenuHidden!: boolean;
  scrollTimeout: any;
  idcontent: any;
  tagName = '';
  items: any[] = [];
  ini = 1;
  fin = 3;

  constructor(
    private posted: PostedsService,
    private param: ActivatedRoute,
    private navCtrl: NavController,
    private messToast: ToastrService,
  ) { }

  ngOnInit() {
    addIcons({ heart, heartOutline, arrowBackOutline });
    this.cargarDatos();
  }

  loadItems(id: any) {
    this.posted.getAllPostedByTag(this.ini, this.fin, id).subscribe((data: any) => {
      if (data.length === 0 && this.items.length === 0) {
        this.messToast.info('No se encontraron publicaciones para #' + this.tagName, 'Sin contenido');
      } else {
        this.items = this.items.concat(data);
        this.ini++;
      }
    });
  }

  cargarDatos() {
    this.param.queryParams.subscribe((parametro: any) => {
      if (parametro['id']) {
        this.idcontent = parametro['id'];
        this.tagName = parametro['name'] || parametro['id'];
        this.loadItems(this.idcontent);
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  loadMore(event: any) {
    setTimeout(() => {
      this.loadItems(this.idcontent);
      event.target.complete();
    }, 500);
  }

  onScroll(event: CustomEvent) {
    const scrollTop = event.detail.scrollTop;

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (scrollTop > this.lastScrollTop + 1) {
      this.isMenuHidden = true;
    } else if (scrollTop < this.lastScrollTop - 1) {
      this.isMenuHidden = false;
    }

    this.scrollTimeout = setTimeout(() => {
      this.isMenuHidden = false;
    }, 300);

    this.lastScrollTop = scrollTop;
  }

}
