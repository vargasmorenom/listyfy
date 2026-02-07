import { Component, OnInit, Input } from '@angular/core';
import type { OverlayEventDetail } from '@ionic/core';
import { PostedsService } from 'src/app/services/posteds.service';
import { ToastrService } from 'ngx-toastr';
import { AlertController } from '@ionic/angular';
import { IonButton, IonAlert, IonItem, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-delete-content',
  templateUrl: './delete-content.component.html',
  styleUrls: ['./delete-content.component.scss'],
  imports: [IonButton, IonAlert, IonItem, IonIcon],
  standalone: true,
})
export class DeleteContentComponent implements OnInit {
  @Input() idContent!: any;
  @Input() session!: any;
  @Input() idpost!: any;

  public titulo = 'Eliminar contenido';
  //  public alertButtons:any;

  constructor(
    private messToast: ToastrService,
    private posted: PostedsService,
    private alertController: AlertController
  ) {}

  deleteContent(id: any, idpost: any) {
    this.posted.deleteContent(id, idpost).subscribe((response) => {
      console.log(response);
      if (response.status === 200) {
        this.messToast.success(response.body.message, 'Éxito');
      }
      if (response.status === 400) {
        this.messToast.error(response.body.message, 'Error');
      }
    });
  }

  async presentAlert(idContent: string, idPost: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar contenido?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteContent(idContent, idPost);
            this.eleminarContenido(idContent);
          },
        },
      ],
    });

    await alert.present();
  }

  eleminarContenido(id: any) {
    const div = document.getElementById(id);
    console.log(div);
    div?.remove();
  }

  ngOnInit() {}
}
