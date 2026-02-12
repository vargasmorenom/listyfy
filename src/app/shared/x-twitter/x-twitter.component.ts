import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteContentComponent } from '../delete-content/delete-content.component';


@Component({
  selector: 'app-x-twitter',
  templateUrl: './x-twitter.component.html',
  styleUrls: ['./x-twitter.component.scss'],
  standalone: true,
  imports: [ DeleteContentComponent],
})
export class XTwitterComponent implements OnInit {
  @Input() contenido!: any;
  @Input() idpost!: any;

  constructor(public messToast: ToastrService) {}

  ngOnInit() {}

  borrarXtw() {}
}
