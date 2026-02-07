import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { Router } from '@angular/router';
import { imagen } from './../../configs/imagen';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-editprofileimageform',
  templateUrl: './editprofileimageform.component.html',
  styleUrls: ['./editprofileimageform.component.scss'],
  imports: [
    IonHeader,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonButtons,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class EditprofileimageformComponent implements OnInit {
  title: string = '';
  public formImg: FormGroup = new FormGroup({});
  public form!: FormGroup;
  public formCreateImg: any;
  public fileData: any;
  public imagenCarga: any;
  public perfilId: any;

  constructor(
    public formUl: DynamicFormService,
    private navParams: NavParams,
    private navCtrl: NavController,
    public messToast: ToastrService,
    private modalCtrl: ModalController,
    private perfil: ProfileService,
    private storage: StorageService,
    private routes: Router
  ) {
    this.formCreateImg = imagen;
    const id = this.navParams.get('id');
    this.perfilId = id.userBy;
    this.formImg = this.formUl.createForm(this.formCreateImg, id);
  }

  ngOnInit() {}

  close(id: any) {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('perfil', {
      queryParams: { id: id },
    });
  }

  onfile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        this.fileData = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imagenCarga = reader.result;
        };
      }
    }
  }

  enviarImagen() {
    const dataForm = new FormData();
    const user = this.storage.get('usuario');

    dataForm.append('userBy', user.id);
    dataForm.append('usuario', user.user);

    if (this.fileData) {
      dataForm.append('imagen', this.fileData);
    }
    if (this.fileData) {
      this.perfil.updateImage(dataForm).subscribe((data: any) => {
        if (data) {
          this.messToast.success(data.message);
          this.storage.set(user.id, data.perfilCreate.perfilUpdated);
          this.routes.navigate(['/perfil']);
        }
      });
    }
  }
}
