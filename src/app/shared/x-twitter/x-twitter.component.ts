import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteContentComponent } from '../delete-content/delete-content.component';
import { IonButton, IonIcon, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-x-twitter',
  templateUrl: './x-twitter.component.html',
  styleUrls: ['./x-twitter.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonPopover, IonList, IonItem, DeleteContentComponent],
})
export class XTwitterComponent implements OnInit {
  @Input() contenido!: any;
  @Input() idpost!: any;

  constructor(public messToast: ToastrService) {}

  ngOnInit() {}

  borrarXtw() {}
}
