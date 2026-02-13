import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostedsService } from 'src/app/services/posteds.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileComponent } from 'src/app/shared/profile/profile.component';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { InfoPerfilComponent } from 'src/app/shared/info-perfil/info-perfil.component';
import { ContentListComponent } from 'src/app/shared/content-list/content-list.component';
import { PopupService } from 'src/app/services/popup.service';
import { EditprofileformComponent } from 'src/app/shared/editprofileform/editprofileform.component';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person,
  mail,
  location,
  arrowForwardOutline,
  close,
  people,
  heart,
  images,
  call,
} from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonButton,
    IonContent,
    CommonModule,
    FormsModule,
    SessionComponent,
    ContentListComponent,
    InfoPerfilComponent,
    IonLabel,
    ReactiveFormsModule,
    ProfileComponent,
    MenubajoComponent,
    IonSegment,
    IonSegmentButton,
  ],
})
export class PerfilPage implements OnInit {
  public name!: string;

  public selectedTab: string = 'info';
  public listasPerfil: any;
  public perfileData: any;
  public session :boolean = false;
  public perfilSession: any = [];
  public items: any[] = [];
  public idConsult!: string;
  public ini = 1;
  public fin = 3;

  constructor(
    public param: ActivatedRoute,
    public storage: StorageService,
    private perfil: ProfileService,
    public popUp: PopupService,
    public router: Router,
    private posted: PostedsService,
    private authService: AuthService
  ) {
    addIcons({ person, mail, location, call, close, arrowForwardOutline, images, people, heart });
  }

  ngOnInit() {
  this.session = this.authService.isSessionValid();

  this.param.queryParams.subscribe(params => {
    const paramId = params['id'];

    if (paramId) {
      this.dataPerfil(paramId);
      return;
    }

    if (!this.session) {
      this.router.navigate(['/']);
      return;
    }

    const user = this.storage.get('usuario');
    if (user?.id) {
      this.dataPerfil(user.id);
    }
  });
  }

  showWelcome(id: any) {
    this.popUp.showPopupDinamic(
      {
        title: 'Editor de Perfil',
        message: 'Nuevo Contenido',
        confirmText: '',
        id: id,
      },
      EditprofileformComponent
    );
  }

  showimage(id: any) {
    this.popUp.showPopupDinamic(
      {
        title: 'Administracion de Contenido',
        message: 'Nuevo Contenido',
        confirmText: '',
        id: id,
      },
      EditprofileformComponent
    );
  }

  dataPerfil(id: any) {
    this.perfil.seachProfile(id).subscribe((data: any) => {
      if (data) {
        this.perfilSession = data;
      }
    });
  }

  loadItems() {
    this.posted.getPostedId(this.idConsult, this.ini, this.fin).subscribe((data: any) => {
      this.items = this.items.concat(data);
      this.ini++;
    });
  }

  loadMore(event: any) {
    setTimeout(() => {
      this.loadItems();
      event.target.complete();
    }, 500);
  }
}
