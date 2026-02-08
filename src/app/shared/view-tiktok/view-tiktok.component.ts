import { Component, OnInit, AfterViewInit,Renderer2 } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ScriptLoaderService } from 'src/app/services/scriptloader.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IonButton,
  IonItem,
  IonInput,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-view-tiktok',
  templateUrl: './view-tiktok.component.html',
  styleUrls: ['./view-tiktok.component.scss'],
  imports: [IonButton, IonItem, IonButtons, IonInput, IonContent, IonHeader, IonToolbar, IonTitle],
  standalone: true,
})
export class ViewTiktokComponent implements OnInit, AfterViewInit {
  public id: any;
  public title: String = 'Ver Contenido TikTok';
  tiktokId! : string;
  tiktokUrl! : string;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private scriptLoader: ScriptLoaderService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
    
  ) {}

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.tiktokId = this.id.id;
    this.tiktokUrl = `https://www.tiktok.com/@ambos.dos.noticia/video/${this.tiktokId}`;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private reprocesarEmbeds() {
    // Borrar script previo si existe
    const oldScript = document.getElementById('tiktok-embed-script');
    if (oldScript) {
      oldScript.remove();
    }

    // Crear nuevo script para que TikTok procese el blockquote
    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }


    ngAfterViewInit() {
    this.loadTikTokScript();
    this.reprocesarEmbeds();
  }
  

  loadTikTokScript() {
    // Crear el script principal
    const script = this.renderer.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    
    // Crear el contenedor del embed
    const blockquote = this.renderer.createElement('blockquote');
    blockquote.className = 'tiktok-embed';
    blockquote.setAttribute('cite', 'https://www.tiktok.com/@javipicornell/video/7604096946852203798');
    blockquote.setAttribute('data-video-id', '7604096946852203798');
    
    // Agregar al DOM
    const container = document.querySelector('#tiktokContainer');
    this.renderer.appendChild(container, blockquote);
    this.renderer.appendChild(document.body, script);
  }

    videoId = '7604096946852203798';
  username = 'javipicornell';
  


  getSafeTikTokUrl(): SafeResourceUrl {
    const url = `https://www.tiktok.com/embed/v2/${this.videoId}`;
    // Alternativa: `https://www.tiktok.com/@${this.username}/video/${this.videoId}?embed=1`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
