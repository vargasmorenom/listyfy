import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuappComponent } from '../shared/menuapp/menuapp.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private modalCtrl: ModalController) { }

    async showPopup(options: {
    title?: string;
    message?: string;
    confirmText?: string;
  }) {
    const modal = await this.modalCtrl.create({
      component: MenuappComponent,
      componentProps: {
        title: options.title || 'Info',
        message: options.message || '',
        confirmText: options.confirmText || 'OK'
      },
      cssClass: 'custom-popup-modal',
      backdropDismiss: true,
    });
        await modal.present();
    return modal.onDidDismiss(); // puedes esperar respuesta si lo necesitas
  }

}
