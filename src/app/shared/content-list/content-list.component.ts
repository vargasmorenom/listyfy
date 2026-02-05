import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { IonIcon,IonGrid,IonRow,IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
  standalone:true,
  imports:[IonIcon,IonGrid,IonRow,IonCol]
})
export class ContentListComponent  implements OnInit {

  @Input() entityNames: Array<any> = [];

  constructor(public navCtrl: NavController,private router: Router) {
    addIcons({heartOutline,heart});

  }

  ngOnInit() {}

  seeContent(id:string){

    this.router.navigate(['adminlist'], {
        queryParams: { id: id },
        queryParamsHandling: 'merge', // Mantiene otros queryParams existentes
        replaceUrl: true // Reemplaza la URL actual en el historial
    });
  }

  perfil(user:string){
  
    this.navCtrl.navigateForward('perfil', {
      queryParams: { id: user }
    });
  }

}
