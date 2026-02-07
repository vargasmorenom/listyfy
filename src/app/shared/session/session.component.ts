import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { heart, heartOutline, apps } from 'ionicons/icons';
import { menuActive } from 'src/app/configs/menuActive';
import { ActionSheetServiceService } from 'src/app/services/action-sheet-service.service';
import { IonHeader, IonImg, IonIcon, IonButton, IonActionSheet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  imports: [IonHeader, IonImg, IonIcon, IonButton, IonActionSheet],
})
export class SessionComponent implements OnInit {
  public saludo: string = 'Hola a todos';
  isActionSheetOpen = false;
  public menu = menuActive;

  constructor(
    private actionSheet: ActionSheetServiceService,
    private router: Router
  ) {
    addIcons({ heartOutline, heart, apps });
  }

  ngOnInit() {}

  mostrarOpciones() {
    this.actionSheet.present({
      header: 'Acciones disponibles',
      buttons: [
        {
          text: 'Home',
          icon: 'home',
          handler: () => {
            this.router.navigate(['/']);
          },
        },
        {
          text: 'inscripciones',
          icon: 'create',
          handler: () => {
            this.router.navigate(['register']);
          },
        },
        {
          text: 'Login',
          role: 'Ingreso',
          icon: 'person',
          handler: () => {
            this.router.navigate(['login']);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
  }
}
