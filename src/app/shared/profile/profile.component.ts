import { Component, OnInit,Input} from '@angular/core';
import { IonGrid, IonButton,IonRow,IonCol,IonIcon } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { EditprofileimageformComponent } from '../editprofileimageform/editprofileimageform.component';
import { person, mail, location, arrowForwardOutline, close, people, heart, images, imageOutline } from 'ionicons/icons';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports:[IonGrid,IonButton,IonRow,IonCol,IonIcon]

})
export class ProfileComponent  implements OnInit {

  @Input() info!:any;
  public page!:string;
  public perfil:boolean = false; 
  public perfilimg:string = '';
  public dcimg: string='';
  public urlBack = 'http://localhost:3000/files/';
  public urlfront = '../../../assets/logo/';

  constructor(private storage : StorageService,
              private activatedRoute: ActivatedRoute,
              public popUp: PopupService){
              
    addIcons({imageOutline,people,heart,images,person,mail,location,close,arrowForwardOutline});
  }

  ngOnInit() {
      const dataSession = this.sessionActiva();
      if(dataSession){
        this.imagenPerfil(dataSession);
        this.perfil = true;
      }else{
        this.dcimg = '../../../assets/logo/perfil02.png';
        const currentRouteSnapshot = this.activatedRoute.snapshot;
        this.page = currentRouteSnapshot.url.join('/');
      }
  }
 mostrarData(id:any){   
  this.popUp.showPopupDinamic({
        title: 'Administracion de Contenido',
        message: 'Nuevo Contenido',
        confirmText: '',
        id : id
      },EditprofileimageformComponent);
}
imagenPerfil(data:any){
  if(data.profilePic){
   this.dcimg ='http://localhost:3000/files/'+ data.profilePic[0].medium;
  }else{
   this.dcimg = '../../../assets/logo/perfil02.png';
  }
   
}

sessionActiva(){
  if(this.storage.exists('usuario')){
     return this.storage.get('usuario');
  }
  return null;
}

}
