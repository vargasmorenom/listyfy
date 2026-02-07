import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { ToastrService } from 'ngx-toastr';
import { PostedsService } from 'src/app/services/posteds.service';
import { content } from '../../configs/content';
import { NavParams } from '@ionic/angular';
import {
  IonButton,
  IonItem,
  IonInput,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-newcontentpopup',
  templateUrl: './newcontentpopup.component.html',
  styleUrls: ['./newcontentpopup.component.scss'],
  imports: [
    IonButton,
    IonItem,
    IonButtons,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
  standalone: true,
})
export class NewcontentpopupComponent implements OnInit {
  public form!: FormGroup;
  public content: any = [];
  title: any;
  message: any;
  confirmText: any;
  id: any;
  typepost: string = 'video'; // Default typepost, can be changed based on requirements
  constructor(
    private formUl: DynamicFormService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public messToast: ToastrService,
    private posted: PostedsService
  ) {
    this.content = content;
    this.form = this.formUl.createForm(this.content);
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
  }

  close() {
    this.modalCtrl.dismiss();
    this.form.reset();
  }

  enviar() {
    if (this.form.valid) {
      const dataContenido = {
        url: this.form.value.contenid,
        typePost: this.id.typePost,
        postId: this.id._id,
      };
      this.posted.addContent(dataContenido).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            this.messToast.success(response.body.message, 'Éxito');
            setTimeout(() => {
              this.close();
            }, 2000);
          }
          if (response.status === 201) {
            this.messToast.warning(response.body.message, 'Alerta');
          }
          if (response.status === 400) {
            this.messToast.error(response.body.message, 'error');
          }
          if (response.status === 404) {
            this.messToast.error(response.body.message, 'error');
          }
          if (response.status === 500) {
            this.messToast.error(response.body.message, 'error');
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
          this.messToast.error('Error en la solicitud', 'error');
        }
      );

      // this.modalCtrl.dismiss();
    } else {
      console.log('Form is invalid');
    }
  }
}
