import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { content } from '../../configs/contentPrueba';
import { twitter } from 'src/app/configs/listTwitter';
import { SessionComponent } from 'src/app/shared/session/session.component';
import { ScriptLoaderService } from 'src/app/services/scriptloader.service';
import { XTwitterComponent } from 'src/app/shared/x-twitter/x-twitter.component';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.page.html',
  styleUrls: ['./adminlist.page.scss'],
  standalone: true,
  imports: [XTwitterComponent,IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader,
            IonCard, IonContent,CommonModule,FormsModule,SessionComponent,MenubajoComponent,IonModal]
})
export class AdminlistPage implements OnInit,AfterViewInit {

  public id!:string;
  public data:any;
  public datacont:any;

  constructor(public param: ActivatedRoute,private scriptLoader: ScriptLoaderService, private navegar:Router) {
    this.param.queryParams.subscribe((parametro:any)=>{
      if(!parametro['id']){

        this.navegar.navigate(['content']);
      }
      this.id = parametro['id'];
      this.data = this.BuscarContent(this.id);
      console.log(this.data);
      this.datacont = this.cepararInfo();
    })


  }

  ngOnInit() {
  }

  BuscarContent(id:any){
   return content.find((elem:any)=> elem.id == id);
  }

  cepararInfo(){
    let array = [];
    for(let i = 0; i < twitter.length; i++){
      let camp = twitter[i]['id'].split("/");

      array.push(camp[5]);
    }
    return array;
  }


// Y luego también al volver a mostrar la vista
ionViewDidEnter() {
  this.reprocesarEmbeds(); // Reprocesar si el usuario vuelve a esta vista
}

  ngAfterViewInit() {
    this.scriptLoader.loadScripts([
      {
        url: 'https://www.instagram.com/embed.js',
        globalObject: 'instgrm',
        callbackMethodPath: 'Embeds.process'
      },
      {
        url: 'https://platform.twitter.com/widgets.js',
        globalObject: 'twttr',
        callbackMethodPath: 'widgets.load'
      },
      {
        url: 'https://www.youtube.com/iframe_api',
        globalObject: 'YT'
        // No método a ejecutar directamente, la API tiene otro flujo
      },
      {
        url: 'https://www.tiktok.com/embed.js',  // URL oficial del script (puede cambiar)
        globalObject: 'tt',                      // Objeto global que TikTok usa (ej: `tt.widgets`)
        callbackMethodPath: 'tt._onWidgetLoad'
      },
      {
        url: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0',
        globalObject: 'FB',
        callbackMethodPath: 'XFBML.parse'
      }
    ]).then(() => {
      console.log('Todos los scripts cargados ✅');
    }).catch(err => {
      console.error('Error cargando scripts:', err);
    });
  }


    private reprocesarEmbeds() {
      // Instagram
      if ((window as any).instgrm?.Embeds?.process) {
        (window as any).instgrm.Embeds.process();
      }

      // Twitter
      if ((window as any).twttr?.widgets?.load) {
        (window as any).twttr.widgets.load();
      }

      // Facebook
      if ((window as any).FB?.XFBML?.parse) {
        (window as any).FB.XFBML.parse();
      }

      // TikTok (si es necesario, depende si expone un método claro)
      if ((window as any).tt?._onWidgetLoad) {
        (window as any).tt._onWidgetLoad();
      }

      // YouTube: este depende del iframe embebido, pero normalmente no requiere re-procesamiento.
    }






}
