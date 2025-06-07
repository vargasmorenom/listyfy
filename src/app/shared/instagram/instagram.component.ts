import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent  implements OnInit {

  @Input() idconten!:String;

  constructor() { }

  ngOnInit() {}

}
