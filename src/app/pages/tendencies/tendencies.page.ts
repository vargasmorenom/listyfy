import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular'
import { SessionComponent } from 'src/app/shared/session/session.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenubajoComponent } from '../../shared/menubajo/menubajo.component';
import {TendenciesService} from '../../services/tendencies.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBadge, IonLabel, IonItem, IonIcon, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tendencies',
  templateUrl: './tendencies.page.html',
  styleUrls: ['./tendencies.page.scss'],
  standalone: true,
  imports: [IonContent,MenubajoComponent, SessionComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBadge, IonLabel, IonItem, IonIcon, IonList],
})
export class TendenciesPage implements OnInit {
   isMenuHidden!: true;

  tendencias: any[] = [];
  constructor(private TendenciesService: TendenciesService, private router: Router,private navCtrl: NavController,) {}

  ngOnInit() {
    this.getTrendingTags();
  }

  getTrendingTags() {
      this.TendenciesService.seachTendencies(1).subscribe((data) => {
        this.tendencias = data;
      });
  }

  openTendency(t: any) {
    
        this.navCtrl.navigateForward('/viewtrends', {
        queryParams: { id: t._id },
    });
  }
}
