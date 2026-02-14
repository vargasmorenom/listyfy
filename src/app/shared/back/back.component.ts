import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon],
})
export class BackComponent {
  constructor(private router: Router) {
    addIcons({ arrowBackOutline });
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
