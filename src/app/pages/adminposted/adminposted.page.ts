
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { posted } from '../../configs/posted';
import { HeadersComponent } from 'src/app/shared/headers/headers.component';
import { SessionComponent } from './../../shared/session/session.component';
import { PostedsService } from 'src/app/services/posteds.service';
import { StorageService } from 'src/app/services/storage.service';


import { IonContent,IonItem, IonInput, IonButton, IonIcon, IonSelect,
         IonSelectOption,IonTextarea} from '@ionic/angular/standalone';


@Component({
  selector: 'app-adminposted',
  templateUrl: './adminposted.page.html',
  styleUrls: ['./adminposted.page.scss'],
  standalone: true,
  imports: [IonContent,IonItem, IonInput, IonButton,
    IonIcon, FormsModule, ReactiveFormsModule,IonSelect, IonSelectOption,IonTextarea,
    HeadersComponent,SessionComponent,MenubajoComponent],
})
export class AdminpostedPage implements OnInit {

  public formCreate:any;
  public form:FormGroup;
  private url!:string;
  public logo:string;

  constructor(public router: Router,
              public formUl: DynamicFormService,
              public messToast:ToastrService,
              public adminPosted: PostedsService,
              private storage: StorageService) {
    this.formCreate = posted;
   // this.url = environment.servicio[0].key;
    this.form = this.formUl.createForm(this.formCreate);
    this.logo = environment.servicio[0].logosmall;

  }

  ngOnInit() {
  }

  dataStorage(){
    if(this.storage.exists('usuario')){
      const user = this.storage.get('usuario');
      return this.storage.get(user.id);   }
  }

  enviar(){

   const profile = this.dataStorage();
    const posted ={
      name : this.form.value.name,
      description : this.form.value.description,
      typePost : this.form.value.tipopost,
      tags : this.form.value.tags,
      access : this.form.value.access,
      profileId: profile._id,
      userName : profile.chanelName,
      profilepic : profile.profilePic[0].small,
      postedBy : profile.userBy
    };
    this.adminPosted.createPosted(posted).subscribe((data:any)=>{
      
      if(data.status === 200){
        this.messToast.success(data.body.message, 'Success');
        
          setTimeout(() => {
           this.form.reset();
         }, 1000);
      }else{
        this.messToast.error(data.body.message, 'Error');
      }
    });
  }

}
