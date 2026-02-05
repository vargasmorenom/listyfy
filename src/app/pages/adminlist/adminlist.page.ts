import { Component, OnInit, AfterViewInit, inject,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverController,Platform } from '@ionic/angular'; // 👈 IonicModule eliminado
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostedsService } from 'src/app/services/posteds.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ScriptLoaderService } from 'src/app/services/scriptloader.service';
import { XTwitterComponent } from 'src/app/shared/x-twitter/x-twitter.component';
import { ShowcontentComponent } from 'src/app/shared/showcontent/showcontent.component';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { PopupService } from 'src/app/services/popup.service';
import { SocialmediaComponent } from 'src/app/shared/socialmedia/socialmedia.component';
import { LikescountComponent } from 'src/app/shared/likescount/likescount.component';
import { environment } from 'src/environments/environment';
import { EditcontentlistComponent } from 'src/app/shared/editcontentlist/editcontentlist.component';
import { NewcontentpopupComponent } from 'src/app/shared/newcontentpopup/newcontentpopup.component';
import { IonContent,IonImg,IonCardSubtitle,IonChip, IonCard,IonCol,IonRow,IonGrid, IonCardHeader, IonList, IonItem, IonPopover, IonCardTitle, IonButton, IonCardContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.page.html',
  styleUrls: ['./adminlist.page.scss'],
  standalone: true,
  imports: [
    XTwitterComponent,ShowcontentComponent,SocialmediaComponent,
    IonCardContent, IonPopover, IonButton, IonCardTitle,LikescountComponent,
    IonCardHeader, NewcontentpopupComponent, IonCard, IonList, IonItem,
    IonContent, CommonModule, FormsModule, SessionComponent, MenubajoComponent,
    IonIcon,IonGrid,IonCol,IonRow,IonImg,IonCardSubtitle,IonChip
  ]
})
export class AdminlistPage implements OnInit, AfterViewInit {
  

  public id!: string;
  public data: any = [];
  public datacont: any;
  public usuario = this.validarEdit();
  public mensaje = 'saludos';
  public dataprueba = 'disabled';
  public likeCount = 0;
  public urlfiles = environment.servicio[0].urlfiles;

  constructor(
    public popUp: PopupService,
    public param: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private scriptLoader: ScriptLoaderService,
    private navegar: Router,
    private posted: PostedsService,
    public messToast:ToastrService,
    private storage: StorageService,
    private platform: Platform,
    
  ) {

  }
  validarEdit(){
    return this.storage.get('usuario');
  }
    liked = false;

    toggleLike() {
    this.liked = !this.liked;
    this.likeCount += this.liked ? 1 : -1;
    }

 async Addcontent(id: any) {
  const result = await this.popUp.showPopupDinamic({
      title: 'Agregar Nuevo Contenido',
      message: 'Nuevo Contenido',
      confirmText: '',
      id: id
    }, NewcontentpopupComponent);
    
   if (result?.data) {
    console.log('Contenido recibido al cerrar modal:', result.data);
    this.cargarDatos();
  } else if (result?.cancelled) {
    console.warn('Modal no se abrió porque ya existía uno');
  } else if (result?.error) {    
    console.error('Error al abrir modal:', result.message);
  }
 
  }

  ngOnInit() {
 this.cargarDatos();
   }

cargarDatos() {
       this.param.queryParams.subscribe((parametro: any) => {
      if (!parametro['id']) {
        this.navegar.navigate(['/']);
      }
      this.id = parametro['id'];
      this.BuscarContent(this.id);
      
    });
}

searcher(event: any) {
  this
}
  
async editarContenido(id: any) {
  
  const result =  await this.popUp.showPopupDinamic({
    title: 'Administración de Contenido',
    message: 'Editar Contenido',
    confirmText: '',
    id: id,
    onComplete: (postId: string) => {
      this.BuscarContent(postId);
    }
  }, EditcontentlistComponent); 
  
    if (result?.data) {
    console.log('Contenido recibido al cerrar modal:', result.data);
  } else if (result?.cancelled) {
    console.warn('Modal no se abrió porque ya existía uno');
  } else if (result?.error) {
    console.error('Error al abrir modal:', result.message);
  }
  this.popoverCtrl.dismiss();
}


borrarContent(id:any){

    const confirmacion = window.confirm('¿Estás seguro de eliminar este contenido?');
  if (confirmacion) {
    const datoUser = this.storage.get('usuario');
    const datapost = {
      postId: id,
      postedBy: datoUser.id
    };
    this.posted.deletePosted(datapost).subscribe((data) => {
      if (data.status === 200) {
        this.messToast.success('Contenido eliminado correctamente', 'Éxito');
        this.popoverCtrl.dismiss();
        this.navegar.navigate(['/']);
      } else {
        this.messToast.error('Error al eliminar el contenido', 'Error');
      }
    }, (error) => {
      console.error('Error al eliminar el contenido:', error);
      this.messToast.error('Error al eliminar el contenido', 'Error');

    });
  } else {
    this.messToast.warning('Eliminación cancelada', 'Cancelado');
    this.popoverCtrl.dismiss();
  }
  
}
 
BuscarContent(id: any) {
    this.posted.getOnePosted(id).subscribe((data)=>{
      this.data = data;
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

  // cepararInfo() {
  //   let array = [];
  //   for (let i = 0; i < twitter.length; i++) {
  //     let camp = twitter[i]['id'].split("/");
  //     array.push(camp[5]);
  //   }
  //   return array;
  // }

  ionViewDidEnter() {
    this.reprocesarEmbeds();
  }

  ngAfterViewInit() {
      if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
      }
    this.scriptLoader.loadScripts([
      {
        url: 'https://www.instagram.com/embed.js',
        globalObject: 'instgrm',
        callbackMethodPath: 'Embeds.process',
        innerText: ''
      },
      {
        url: 'https://platform.twitter.com/widgets.js',
        globalObject: 'twttr',
        callbackMethodPath: 'widgets.load',
        innerText: ''
      },
      {
        url: 'https://www.youtube.com/iframe_api',
        globalObject: 'YT',
        callbackMethodPath: '',
        innerText: ''
      },
      // {
      //   url: 'https://www.tiktok.com/embed.js',
      //   globalObject: 'tt',
      //   callbackMethodPath: 'tt._onWidgetLoad',
      //   innerText: ''
        
      // },
      {
        url: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0',
        globalObject: 'FB',
        callbackMethodPath: 'XFBML.parse',
        innerText: ''
      },
      {
        url: 'https://platform.linkedin.com/in.js',
        globalObject: 'IN',
        callbackMethodPath: 'parse',
        innerText: 'lang: en_US'
      }
    ]).then(() => {
      console.log('Todos los scripts cargados ✅');
    }).catch(err => {
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
    // if ((window as any).tt?._onWidgetLoad) {
    //   (window as any).tt._onWidgetLoad();
    // }
      if ((window as any).IN?.parse) {
      (window as any).IN.parse();
    }
  }





}
