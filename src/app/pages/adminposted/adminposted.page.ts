import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MenubajoComponent } from 'src/app/shared/menubajo/menubajo.component';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { posted } from '../../configs/posted';
import { SessionComponent } from './../../shared/session/session.component';
import { PostedsService } from 'src/app/services/posteds.service';
import { StorageService } from 'src/app/services/storage.service';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonSelect,
  IonLabel,
  IonSelectOption,
  IonTextarea,
  IonRadio,
  IonRadioGroup,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-adminposted',
  templateUrl: './adminposted.page.html',
  styleUrls: ['./adminposted.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonIcon,
    FormsModule,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    SessionComponent,
    MenubajoComponent,
    IonRadioGroup,
    IonRadio,
    IonList,
  ],
})
export class AdminpostedPage implements OnInit {
  public formCreate: any;
  public form: FormGroup;
  private url!: string;
  public logo: string;
  public fileData: any;
  public imagenCarga: any;

  constructor(
    public router: Router,
    public formUl: DynamicFormService,
    public messToast: ToastrService,
    public adminPosted: PostedsService,
    private storage: StorageService
  ) {
    this.formCreate = posted;
    // this.url = environment.servicio[0].key;
    this.form = this.formUl.createForm(this.formCreate);
    this.logo = environment.servicio[0].logosmall;
  }

  ngOnInit() {}

  dataStorage() {
    if (this.storage.exists('usuario')) {
      const user = this.storage.get('usuario');
      return this.storage.get(user.id);
    }
  }

  onfile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        this.fileData = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          this.imagenCarga = reader.result;
        };
      }
    }
  }

  resetForm() {
    this.form.reset();
  }

  enviar() {
    const profile = this.dataStorage();

    const dataForm = new FormData();

    dataForm.append('name', this.form.value.name);
    dataForm.append('description', this.form.value.description);
    dataForm.append('typePost', this.form.value.typePost);
    dataForm.append('tags', this.form.value.tags);
    dataForm.append('access', this.form.value.access);
    dataForm.append('profileId', profile._id);
    dataForm.append('chanelName', profile.chanelName);
    dataForm.append('profilepic', profile.profilePic[0].small);
    dataForm.append('postedBy', profile.userBy);

    if (this.fileData) {
      dataForm.append('imagen', this.fileData);
    }

    this.adminPosted.createPosted(dataForm).subscribe((data: any) => {
      if (data.status === 200) {
        this.messToast.success(data.body.message, 'Success');
        this.form.reset();
        this.imagenCarga = '';
        setTimeout(() => {
          this.router.navigate(['/newlist']);
        }, 1000);
      } else {
        this.messToast.error(data.body.message, 'Error');
      }
    });
  }
}
