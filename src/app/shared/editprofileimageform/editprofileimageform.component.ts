import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { ActivatedRoute,Router } from '@angular/router';
import { imagen } from './../../configs/imagen';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { IonHeader,IonIcon, IonToolbar,IonTitle,IonButtons,IonButton,IonContent,IonInput,
         IonTextarea,IonItem,IonLabel} from '@ionic/angular/standalone';

@Component({
  selector: 'app-editprofileimageform',
  templateUrl: './editprofileimageform.component.html',
  styleUrls: ['./editprofileimageform.component.scss'],
  imports: [IonHeader,IonIcon, IonToolbar, IonTitle,IonLabel, IonButtons, IonButton, IonInput, IonItem,IonTextarea,IonContent, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class EditprofileimageformComponent  implements OnInit {
 title: string = '';
 public formImg!: FormGroup; 
 public form!: FormGroup; 
 public formCreateImg:any;
 public fileData:any;
 public imagen:any;

    constructor(public formUl: DynamicFormService,
              private navParams: NavParams,
              public messToast:ToastrService,
              private modalCtrl: ModalController,
              private perfil: ProfileService,
              private storage: StorageService,
              private routes: Router) { 

      this.formCreateImg = imagen;
      const id = this.navParams.get('id');
      this.formImg = this.formUl.createForm(this.formCreateImg,id);
              }

  ngOnInit() {}
       close() {
    this.modalCtrl.dismiss();
  }

    onfile(event:any){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      if(file.type.includes("image")){
        this.fileData = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e)=>{
          this.imagen = reader.result;
        }
    }
  }
  }


  enviarImagen(){
    const dataForm = new FormData();
    const user = this.storage.get('usuario');

    dataForm.append('userBy', user.id);
    dataForm.append('usuario', user.user);

    if(this.fileData){
      dataForm.append('imagen', this.fileData);
    }


   this.perfil.updateImage(dataForm).subscribe((data:any)=>{
     //this.storage.set(user.id, data.perfilUpdated);
      if(data){
        this.messToast.success(data.message);
        this.storage.set(user.id, data.perfilCreate.perfilUpdated);
        setTimeout(() =>{
          this.close();
        }, 1000);
          setTimeout(() =>{
          this.routes.navigate(['/perfil']);
        }, 1500);
      }
   })


  }

}
