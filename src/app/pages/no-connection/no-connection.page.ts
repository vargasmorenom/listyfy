import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-no-connection',
  templateUrl: './no-connection.page.html',
  styleUrls: ['./no-connection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class NoConnectionPage implements OnInit {
  constructor(
    private networkService: NetworkService,
    private router: Router
  ) {
    this.networkService.isOnline$.subscribe((isOnline) => {
      const currentUrl = this.router.url;
      console.log(9);

      if (!isOnline && currentUrl !== 'no-connection') {
        console.log(10);

        this.router.navigate(['no-connection']);
      } else if (isOnline && currentUrl === 'no-connection') {
        console.log(11);
        this.router.navigate(['/']); // O la ruta que prefieras al reconectar
      }
    });
  }

  ngOnInit() {}
}
