import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearcherPageService } from 'src/app/services/search.service';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { MenubajoComponent } from '../../shared/menubajo/menubajo.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import {
  IonContent,
  IonSearchbar,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.page.html',
  styleUrls: ['./searcher.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    SessionComponent,
    IonSearchbar,
    MenubajoComponent,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    ContentListComponent,
  ],
})
export class SearcherPage implements OnInit {
  items: any[] = [];
  ini = 1;
  fin = 3;
  isMenuHidden = false;

  constructor(
    private searcherPageService: SearcherPageService,
    private messToast: ToastrService
  ) {}
  ionViewWillEnter() {
    this.onSearch({ detail: { value: 'pendejos' } });
  }

  ngOnInit() {}
  lastScrollTop = 0;

  onScroll(event: CustomEvent) {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > this.lastScrollTop + 1) {
      // 👇 Desplazándose hacia abajo → ocultar menú

      this.isMenuHidden = true;
    } else if (scrollTop < this.lastScrollTop - 1) {
      this.isMenuHidden = false;
    }

    this.lastScrollTop = scrollTop;
  }

  loadMore(event: any) {
    this.ini += 3;
    this.fin += 3;

    this.searcherPageService.searchForTags(event, this.ini, this.fin).subscribe((results) => {
      if (results?.length) {
        this.items = [...this.items, ...results];
      }
      event.target.complete();
    });
  }

  onSearch(event: any) {
    if (!event.detail.value || event.detail.value.trim() === '') return;
    const query = event.detail.value;
    this.ini = 1;
    this.fin = 3;
    this.items = [];

    if (query && query.trim() !== '') {
      this.searcherPageService.searchForTags(query, this.ini, this.fin).subscribe({
        next: (results) => {
          if (results?.length) {
            this.items = results;
          } else {
            this.messToast.success('No se encontró contenido relacionado con la búsqueda', 'Sin resultados');
          }
        },
        error: () => {
          this.messToast.error('Ocurrió un error al realizar la búsqueda', 'Error');
        },
      });
    }
  }
}
