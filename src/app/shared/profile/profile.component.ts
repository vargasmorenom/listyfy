import { Component, OnInit, Input } from '@angular/core';
import { IonGrid, IonButton, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { EditprofileimageformComponent } from '../editprofileimageform/editprofileimageform.component';
import {
  person,
  mail,
  location,
  arrowForwardOutline,
  close,
  people,
  heart,
  images,
  imageOutline,
} from 'ionicons/icons';
import { PopupService } from 'src/app/services/popup.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonGrid, IonButton, IonRow, IonCol, IonIcon],
})
export class ProfileComponent implements OnInit {
  @Input() info!: any;
  @Input() session!: boolean;
  public page!: string;
  public dcimg: string = '';
  public urlBack = environment.servicio[0].urlfiles;

  constructor(
    private activatedRoute: ActivatedRoute,
    public popUp: PopupService,
    private authService: AuthService
  ) {
    addIcons({ imageOutline, people, heart, images, person, mail, location, close, arrowForwardOutline });
  }

  ngOnInit() {

    if (this.session) {
      const profile = this.authService.getProfile();
      this.imagenPerfil(profile);
    } else {
      this.dcimg = '../../../assets/logo/perfil02.png';
      const currentRouteSnapshot = this.activatedRoute.snapshot;
      this.page = currentRouteSnapshot.url.join('/');
    }
  }

  mostrarData(id: any) {
    this.popUp.showPopupDinamic(
      {
        title: 'Administracion de Contenido',
        message: 'Nuevo Contenido',
        confirmText: '',
        id: id,
      },
      EditprofileimageformComponent
    );
  }

  imagenPerfil(data: any) {
    if (data?.profilePic) {
      this.dcimg = this.urlBack + data.profilePic[0].medium;
    } else {
      this.dcimg = '../../../assets/logo/perfil02.png';
    }
  }
}
