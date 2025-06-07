import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { MenuappComponent } from '../menuapp/menuapp.component';
import { heart, heartOutline,apps } from 'ionicons/icons';
import { PopupService } from '../../services/popup.service';
import { IonHeader,IonImg,IonIcon,IonButton,IonContent, IonModal, IonTitle, IonToolbar} from "@ionic/angular/standalone";


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  imports:[IonHeader,IonImg,MenuappComponent,IonIcon,IonButton,IonContent, IonModal, IonTitle, IonToolbar]
})
export class SessionComponent  implements OnInit {
  public saludo:string = 'Hola a todos';
  constructor(private popupService: PopupService) {
    addIcons({heartOutline,heart,apps});
   }

  ngOnInit() {}
 
  showWelcome() {
    this.popupService.showPopup({
      title: '¡Bienvenido!',
      message: 'Gracias por usar nuestra app.',
      confirmText: 'Entendido'
    });
  }
     
  

}
