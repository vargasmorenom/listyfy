import { routes } from './../../app.routes';
import { ProfileModel } from './../../interfaces/profile';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { profile } from '../../configs/profile';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { InfoPerfilComponent } from 'src/app/shared/info-perfil/info-perfil.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { imagen } from './../../configs/imagen';
import { content } from 'src/app/configs/contentPrueba';
import { IonContent, IonHeader, IonToolbar, IonIcon, IonItem, IonButton, IonModal, IonInput,IonTextarea,IonSegment, IonSegmentButton,IonLabel, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ToastrService } from 'ngx-toastr';

import { addIcons } from 'ionicons';
import { person, mail, location, arrowForwardOutline, close, people, heart, images, call, videocamOffOutline, videocamOffSharp, heartCircleSharp, hammerSharp } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll,IonInput, IonButton, IonItem, IonIcon, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,SessionComponent
           , IonModal,ContentListComponent,InfoPerfilComponent,FormsModule,ReactiveFormsModule,IonLabel, ReactiveFormsModule, IonTextarea,ProfileComponent,MenubajoComponent,IonSegment, IonSegmentButton]
})
export class PerfilPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  public name!: string;
  public formCreate:any;
  public formCreateImg:any;
  public form!:FormGroup;
  public formImg!:FormGroup;
  public perfilimg:string;
  public imagen:any;
  public fileData:any;
  public selectedTab: string = 'info';
  public listasPerfil:any;
  public isModalOpen = false;
  public perfileData:any;
  public errorMessage: string = '';
  public perfilSession: any = [];

  constructor(public param: ActivatedRoute,
              public formUl: DynamicFormService,
              public storage: StorageService,
              private perfil: ProfileService,
              public messToast:ToastrService,
              private routes: Router ) {

      this.perfilimg = '../../../assets/logo/perfil02.png';
      addIcons({person,mail,location,call,close,arrowForwardOutline,images,people,heart});
      this.listasPerfil = content;
    }


  ngOnInit() {
            this.param.queryParams.subscribe((parametro:any)=>{
          if(parametro['id']){
            if(this.storage.exists('usuario')){
               this.perfilSession = this.storage.get(parametro['id']);
              this.crearComponentes(this.perfilSession);
            }else{
              this.dataPerfil(parametro['id']);
            }
           }else{
            if(this.storage.exists('usuario')){
              const user = this.storage.get('usuario');
              this.dataPerfil(user.id);
            }
           }
       })
  }


  cancel() {

    this.formImg.reset();
    this.imagen = '';
    this.modal.dismiss({'dismissed': true});

  }

  crearComponentes(datacomp:any){

      this.formCreate = profile;
      this.perfilSession = datacomp;
      this.form = this.formUl.createForm(this.formCreate,datacomp);
      this.formCreateImg = imagen;
      this.formImg = this.formUl.createForm(this.formCreateImg,datacomp);
  }

  cerrar(){
    this.cancel1();
    this.modal.dismiss({'dismissed': true});
  }

  cancel1() {

    this.modal.dismiss(null, 'cancel1');

  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.isModalOpen
    console.log(this.isModalOpen);
  }

  dataPerfil(id:any){

    this.perfil.seachProfile(id).subscribe((data:any)=>{
        if(data){
       this.crearComponentes(data);
        }
    });

  }

  enviar(){
  const iddata =  this.storage.get('usuario');

  if(!iddata){
         setTimeout(() =>{
          this.modal.dismiss({'dismissed': true}); 
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
          this.modal.dismiss({'dismissed': true});
        }, 1000);
          setTimeout(() =>{
          this.routes.navigate(['/perfil']);
        }, 1500);

      }
    });;
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
          this.modal.dismiss({'dismissed': true});
        }, 1000);
          setTimeout(() =>{
          this.routes.navigate(['/perfil']);
        }, 1500);
      }
   })


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

  loadItems(){

    // this.getList.getcontent(this.ini,this.fin).subscribe((data:any)=>{
    //   this.items = this.items.concat(data);
    //   this.ini ++;
    //   console.log(this.ini);
    // });
   }

  loadMore(event: any){
    setTimeout(() =>{

      this.loadItems();
      event.target.complete();
    }, 500);
   }

}
