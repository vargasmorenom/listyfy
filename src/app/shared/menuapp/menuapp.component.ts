import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menuapp',
  templateUrl: './menuapp.component.html',
  styleUrls: ['./menuapp.component.scss'],
 imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
  standalone: true,
})
export class MenuappComponent  implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmText: string = 'OK';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
