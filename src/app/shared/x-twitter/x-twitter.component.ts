
import { Component, OnInit, Input } from '@angular/core';
import { IonButton,IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-x-twitter',
  templateUrl: './x-twitter.component.html',
  styleUrls: ['./x-twitter.component.scss'],
  standalone:true,
  imports:[IonButton,IonIcon]
})
export class XTwitterComponent  implements OnInit {
  @Input() idconten!:String;
  @Input() iduser!:String;


  constructor() {

   }

  ngOnInit() {}

  borrarXtw(){}

}
