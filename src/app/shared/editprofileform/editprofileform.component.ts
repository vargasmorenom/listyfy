import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { profile } from '../../configs/profile';
import { ActivatedRoute,Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { IonHeader,IonIcon, IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonInput,IonTextarea,IonItem} from '@ionic/angular/standalone';

@Component({
  selector: 'app-editprofileform',
  templateUrl: './editprofileform.component.html',
  styleUrls: ['./editprofileform.component.scss'],
  imports: [IonHeader,IonIcon, IonToolbar, IonTitle, IonButtons, IonButton, IonInput, IonItem,IonTextarea,IonContent, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class EditprofileformComponent  implements OnInit {
   public form!:FormGroup;
   public formCreate:any;
   public title!: string;

  constructor(public formUl: DynamicFormService,
              private navParams: NavParams,
              public messToast:ToastrService,
              private modalCtrl: ModalController,
              private perfil: ProfileService,
              private storage: StorageService,
              private routes: Router) {
    this.formCreate = profile;
    const id = this.navParams.get('id');
    this.form = this.formUl.createForm(this.formCreate,id);
   }

  ngOnInit() {
   
  }
     close() {
    this.modalCtrl.dismiss();
  }
 
  enviar(){
  const iddata =  this.storage.get('usuario');

  if(!iddata){
         setTimeout(() =>{
         this.close();
        }, 500);

  }

  const data = {
    "firstname" : this.form.value.firstname,
    "lastname" : this.form.value.lastname,
    "chanelName" : this.form.value.chanelName,
    "description" : this.form.value.description,
    "links" : this.form.value.linksString,
    "phoneNumber" : this.form.value.phoneNumber,
    "location" : this.form.value.location,
    "email" : this.form.value.email,
    "socialMedia" : this.form.value.socialMediaString,
    "instantMessages" : this.form.value.instantMessagesString,
    "userBy" : iddata.id 
  };

    this.perfil.updateProfile(data).subscribe((datos:any)=>{
      if(datos){

        this.messToast.success(datos.message);

        setTimeout(() =>{
          this.close();
        }, 1000);
          setTimeout(() =>{
          this.routes.navigate(['/perfil']);
        }, 1500);

      }
    });
  }

}
