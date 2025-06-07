import { Component, OnInit,Input} from '@angular/core';
import { IonGrid, IonButton,IonRow,IonCol,IonIcon } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { person, mail, location, arrowForwardOutline, close, people, heart, images, imageOutline } from 'ionicons/icons';


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


  public perfilimg:string = '';
  constructor(private storage : StorageService,
              private activatedRoute: ActivatedRoute) {
    this.perfilimg = '../../../assets/logo/perfil02.png';
    addIcons({imageOutline,people,heart,images,person,mail,location,close,arrowForwardOutline});
  }

  ngOnInit() {
      const currentRouteSnapshot = this.activatedRoute.snapshot;
      this.page = currentRouteSnapshot.url.join('/'); // Obtiene la ruta como una cadena
      

  }




}
