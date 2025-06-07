import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tiktok',
  templateUrl: './tiktok.component.html',
  styleUrls: ['./tiktok.component.scss'],
})
export class TiktokComponent  implements OnInit {
  @Input() idconten!:String;
  constructor() { }

  ngOnInit() {}

}
