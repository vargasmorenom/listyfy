import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';

import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    ContentListComponent,
    IonContent,
    CommonModule,
    SessionComponent,
    ProfileComponent,
  ],
})
export class ContentPage implements OnInit {
  items: any[] = [];
  ini = 1;
  fin = 3;

  constructor() {
    addIcons({ heartOutline, heart });
  }
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    // this.getList.getcontent(this.ini,this.fin).subscribe((data:any)=>{
    //   this.items = this.items.concat(data);
    //   this.ini ++;
    //   console.log(this.ini);
    //});
  }

  loadMore(event: any) {
    setTimeout(() => {
      this.loadItems();
      event.target.complete();
    }, 500);
  }
}
