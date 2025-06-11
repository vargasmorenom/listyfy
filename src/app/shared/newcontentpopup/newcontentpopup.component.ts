import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { content } from '../../configs/content';
import { NavParams } from '@ionic/angular';
import { IonButton, IonItem, IonInput, IonHeader,IonButtons, 
  IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-newcontentpopup',
  templateUrl: './newcontentpopup.component.html',
  styleUrls: ['./newcontentpopup.component.scss'],
  imports: [IonButton, IonItem,IonButtons, IonInput,FormsModule,ReactiveFormsModule,
            IonContent,IonHeader,IonToolbar,IonTitle],
  standalone: true
})
export class NewcontentpopupComponent  implements OnInit {
  public form!:FormGroup;
  public content:any = [];
  title: any;
  message: any;
  confirmText: any;
  id: any;
  constructor(public formUl: DynamicFormService,private modalCtrl: ModalController,private navParams: NavParams) { 
    this.content = content;
    this.form = this.formUl.createForm(this.content);
    console.log(this.id);

  }

  ngOnInit() {
    console.log(this.navParams);
     const id = this.navParams.get('id');
      console.log('ID recibido en el popup:', id);
  }

    close() {
    this.modalCtrl.dismiss();
  }
 

  enviar(){
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
    } else {
      console.log('Form is invalid');
    }
  }
}