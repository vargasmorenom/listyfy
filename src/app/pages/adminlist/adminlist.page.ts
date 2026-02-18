import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostedsService } from 'src/app/services/posteds.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { BackComponent } from 'src/app/shared/back/back.component';
import { ScriptLoaderService } from 'src/app/services/scriptloader.service';
import { ShowcontentComponent } from 'src/app/shared/showcontent/showcontent.component';
import { PopupService } from 'src/app/services/popup.service';
import { SocialmediaComponent } from 'src/app/shared/socialmedia/socialmedia.component';
import { LikescountComponent } from 'src/app/shared/likescount/likescount.component';
import { LikeService } from 'src/app/services/like.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EditcontentlistComponent } from 'src/app/shared/editcontentlist/editcontentlist.component';
import { NewcontentpopupComponent } from 'src/app/shared/newcontentpopup/newcontentpopup.component';
import {
  IonContent,
  IonImg,
  IonChip,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonCardHeader,
  IonList,
  IonItem,
  IonPopover,
  IonCardTitle,
  IonButton,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.page.html',
  styleUrls: ['./adminlist.page.scss'],
  standalone: true,
  imports: [
    ShowcontentComponent,
    SocialmediaComponent,
    IonCardContent,
    IonPopover,
    IonButton,
    IonCardTitle,
    LikescountComponent,
    IonCardHeader,
    IonCard,
    IonList,
    IonItem,
    IonContent,
    CommonModule,
    FormsModule,
    BackComponent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonChip,
  ],
})
export class AdminlistPage implements OnInit, AfterViewInit, OnDestroy {
  public id!: string;
  public data: any = [];
  public datacont: any;
  public usuario = this.validarEdit();
  public mensaje = 'saludos';
  public dataprueba = 'disabled';
  public likeCount = 0;
  public urlfiles = environment.servicio[0].urlfiles;
  private socketSubs: Subscription[] = [];

  constructor(
    public popUp: PopupService,
    public param: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private scriptLoader: ScriptLoaderService,
    private navegar: Router,
    private posted: PostedsService,
    public messToast: ToastrService,
    private storage: StorageService,
    private likeService: LikeService
  ) {}
  validarEdit() {
    return this.storage.get('usuario');
  }
  liked = false;

  toggleLike() {
    const userId = this.usuario?.id;
    console.log('[Like] toggleLike - userId:', userId, 'postId:', this.data._id);
    if (!userId) {
      this.messToast.warning('Debes iniciar sesión para dar like', 'Aviso');
      return;
    }
    this.likeService.toggleLikeHttp(this.data._id, userId).subscribe({
      next: (res: any) => {
        console.log('[Like] HTTP respuesta:', res);
        this.liked = res.action === 'like';
        this.likeCount = res.newLikeCount;
      },
      error: (err) => {
        console.error('[Like] HTTP error:', err);
        this.messToast.error('Error al procesar el like', 'Error');
      }
    });
  }

  cargarLikes(idPost: string) {
    const userId = this.usuario?.id;
    console.log('[Like] cargarLikes - postId:', idPost, 'userId:', userId);
    this.likeService.getLikes(idPost, userId).subscribe({
      next: (res: any) => {
        console.log('[Like] getLikes respuesta:', res);
        this.likeCount = res.likeCount || 0;
        this.liked = res.liked || false;
      },
      error: (err) => {
        console.error('[Like] getLikes error:', err);
      }
    });
  }

  async Addcontent(id: any) {
    const result = await this.popUp.showPopupDinamic(
      {
        title: 'Agregar Nuevo Contenido',
        message: 'Nuevo Contenido',
        confirmText: '',
        id: id,
      },
      NewcontentpopupComponent
    );

    if (result?.data) {
      this.BuscarContent(this.id);
    } else if (result?.cancelled) {
      console.warn('Modal no se abrió porque ya existía uno');
    } else if (result?.error) {
      console.error('Error al abrir modal:', result.message);
    }
  }

  ngOnInit() {
    this.cargarDatos();
    this.escucharSocketLikes();
  }

  escucharSocketLikes() {
    console.log('[Socket] Suscribiendo a eventos de like...');

    const likeUpdatedSub = this.likeService.onLikeUpdated().subscribe((update) => {
      console.log('[Socket] like:updated recibido:', update);
      if (update.postId === this.data._id) {
        this.likeCount = update.newLikeCount;
        if (update.userId === this.usuario?.id) {
          this.liked = update.action === 'like';
        }
        console.log('[Socket] Like actualizado - count:', this.likeCount, 'liked:', this.liked);
      }
    });

    const likeErrorSub = this.likeService.onLikeError().subscribe((err) => {
      console.error('[Socket] like:error recibido:', err);
      this.messToast.error(err.error, 'Error like');
    });

    this.socketSubs.push(likeUpdatedSub, likeErrorSub);
  }

  ngOnDestroy() {
    this.socketSubs.forEach((sub) => sub.unsubscribe());
  }

  cargarDatos() {
    this.param.queryParams.pipe(take(1)).subscribe((parametro: any) => {
      if (!parametro['id']) {
        this.navegar.navigate(['/']);
      }
      this.id = parametro['id'];
      this.BuscarContent(this.id);
    });
  }

  searcher(_event: any) {}

  async editarContenido(id: any) {
    const result = await this.popUp.showPopupDinamic(
      {
        title: 'Administración de Contenido',
        message: 'Editar Contenido',
        confirmText: '',
        id: id,
        onComplete: (postId: string) => {
          this.BuscarContent(postId);
        },
      },
      EditcontentlistComponent
    );

    if (result?.cancelled) {
      console.warn('Modal no se abrió porque ya existía uno');
    } else if (result?.error) {
      console.error('Error al abrir modal:', result.message);
    }
    this.popoverCtrl.dismiss();
  }

  borrarContent(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este contenido?');
    if (confirmacion) {
      const datoUser = this.storage.get('usuario');
      const datapost = {
        postId: id,
        postedBy: datoUser.id,
      };
      this.posted.deletePosted(datapost).subscribe(
        (data) => {
          if (data.status === 200) {
            this.messToast.success('Contenido eliminado correctamente', 'Éxito');
            this.popoverCtrl.dismiss();
            this.navegar.navigate(['/']);
          } else {
            this.messToast.error('Error al eliminar el contenido', 'Error');
          }
        },
        (error) => {
          console.error('Error al eliminar el contenido:', error);
          this.messToast.error('Error al eliminar el contenido', 'Error');
        }
      );
    } else {
      this.messToast.warning('Eliminación cancelada', 'Cancelado');
      this.popoverCtrl.dismiss();
    }
  }

  BuscarContent(id: any) {
    this.posted.getOnePosted(id).subscribe((data: any) => {
      console.log('[Post] datos completos del post:', data);
      console.log('[Post] campo likes:', data.likes);
      console.log('[Post] campo likespost:', data.likespost);
      this.data = data;
      const userId = this.usuario?.id;

      if (Array.isArray(data.likes)) {
        this.likeCount = data.likes.length;
        this.liked = userId
          ? data.likes.some((like: any) => like === userId || like._id === userId)
          : false;
      } else if (this.data._id) {
        this.cargarLikes(this.data._id);
      }
    });
  }

  profileview(id: any) {
    this.navegar.navigate(['perfil'], { queryParams: { id: id } });
  }

  searcherPost(id: any) {
    this.navegar.navigate(['searcher'], { queryParams: { id: id } });
  }

  actualiza(id: any) {
    this.navegar.navigateByUrl('adminlist?id=' + id, { replaceUrl: true });
  }

  ionViewWillEnter() {
    if (this.id) {
      this.BuscarContent(this.id);
    }
  }

  ionViewDidEnter() {
    this.reprocesarEmbeds();
  }

  ngAfterViewInit() {
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
    this.scriptLoader
      .loadScripts([
        {
          url: 'https://www.instagram.com/embed.js',
          globalObject: 'instgrm',
          callbackMethodPath: 'Embeds.process',
          innerText: '',
        },
        {
          url: 'https://platform.twitter.com/widgets.js',
          globalObject: 'twttr',
          callbackMethodPath: 'widgets.load',
          innerText: '',
        },
        {
          url: 'https://www.youtube.com/iframe_api',
          globalObject: 'YT',
          callbackMethodPath: '',
          innerText: '',
        },
        {
          url: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0',
          globalObject: 'FB',
          callbackMethodPath: 'XFBML.parse',
          innerText: '',
        },
        {
          url: 'https://platform.linkedin.com/in.js',
          globalObject: 'IN',
          callbackMethodPath: 'parse',
          innerText: 'lang: en_US',
        },
      ])
      .catch((err) => {
        console.error('Error cargando scripts:', err);
      });
  }

  private reprocesarEmbeds() {
    if ((window as any).instgrm?.Embeds?.process) {
      (window as any).instgrm.Embeds.process();
    }
    if ((window as any).twttr?.widgets?.load) {
      (window as any).twttr.widgets.load();
    }
    if ((window as any).FB?.XFBML?.parse) {
      (window as any).FB.XFBML.parse();
    }
    if ((window as any).IN?.parse) {
      (window as any).IN.parse();
    }
  }
}
