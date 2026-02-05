import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { ScriptLoaderService } from 'src/app/services/scriptloader.service';
import { IonButton, IonItem, IonInput, IonHeader,IonButtons, 
IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-view-tiktok',
  templateUrl: './view-tiktok.component.html',
  styleUrls: ['./view-tiktok.component.scss'],
  imports: [IonButton, IonItem,IonButtons, IonInput,
            IonContent,IonHeader,IonToolbar,IonTitle],
  standalone: true

})
export class ViewTiktokComponent  implements OnInit {
  public id: any;
  public title: String = "Ver Contenido TikTok";
  constructor( private navParams: NavParams, private modalCtrl: ModalController,private scriptLoader: ScriptLoaderService,) { }

  ngOnInit() { 
     this.id = this.navParams.get('id'); 
  }

  close() {
  this.modalCtrl.dismiss();
    }


  ngAfterViewInit() {
    this.reprocesarEmbeds();
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
 

}
