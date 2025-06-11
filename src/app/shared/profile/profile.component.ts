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
  title: string = '';


  public perfilimg:string = '';
  constructor(private storage : StorageService,
              private activatedRoute: ActivatedRoute,
              public popUp: PopupService){
    this.perfilimg = '../../../assets/logo/perfil02.png';
    addIcons({imageOutline,people,heart,images,person,mail,location,close,arrowForwardOutline});
  }

  ngOnInit() {
      const currentRouteSnapshot = this.activatedRoute.snapshot;
      this.page = currentRouteSnapshot.url.join('/'); // Obtiene la ruta como una cadena
      

  }
 showWelcome(id:any){   
  this.popUp.showPopupDinamic({
        title: 'Administracion de Contenido',
        message: 'Nuevo Contenido',
        confirmText: '',
        id : id
      },EditprofileimageformComponent);
}
}
