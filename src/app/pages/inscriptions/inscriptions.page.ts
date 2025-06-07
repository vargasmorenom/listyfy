import { getTestBed } from '@angular/core/testing';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DynamicFormService } from 'src/app/services/dynamicFormService';
import { inscription } from '../../configs/inscription';
import { InscriptionService } from '../../services/inscription.service';
import { CountrysService } from 'src/app/services/countrys.service';


import { IonContent,IonItem, IonInput, IonButton, IonIcon,IonCheckbox,IonInputPasswordToggle, IonList, IonText, IonCard } from '@ionic/angular/standalone';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.page.html',
  styleUrls: ['./inscriptions.page.scss'],
  standalone: true,
  imports: [IonCard, IonText,IonContent,IonItem, IonInput, IonButton,
            IonIcon, FormsModule, ReactiveFormsModule,IonCheckbox,
            IonInputPasswordToggle, IonList],

})
export class InscriptionsPage implements OnInit {

  backgroundClasses: string[] = ['background-1', 'background-2', 'background-3'];
  currentBackgroundClass: string = this.backgroundClasses[0];
  currentIndex: number = 0;

  public formCreate:any;
  public form:FormGroup;
  private url:string;
  public logo:string;
  public codtelefono!:string;

  countries: any[] = [];
  filtered: any[] = [];
  searchText: string = '';

  constructor(private countrys: CountrysService,
              private router: Router,
              public formUl: DynamicFormService,
              public messToast:ToastrService,
              public register: InscriptionService) {

    this.formCreate = inscription;
    this.url = environment.servicio[0].key;
    this.form = this.formUl.createForm(this.formCreate);
    this.logo = environment.servicio[0].logo;
    this.startBackgroundRotation();

  }


  onSearchChange(event: any) {
    const query = event.detail.value.toLowerCase();
    this.filtered = this.countries.filter(country =>
      country.nameES.toLowerCase().includes(query) ||
      country.nameEN.toLowerCase().includes(query)
    );
  }

  selectCountry(country: any) {
    this.searchText = country.nameES;
    this.filtered = []; // Oculta resultados
    this.codtelefono = country.phoneCode;
  }

  ngOnInit() {
    this.countrys.getCountries().subscribe(data=>{
      this.countries = data;
    })

    setTimeout(() => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('readonly','true'); // Temporal
        setTimeout(() => input.removeAttribute('readonly'), 100);
      });
    });
  }

  startBackgroundRotation(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundClasses.length;
      this.currentBackgroundClass = this.backgroundClasses[this.currentIndex];
    }, 10000);
  }

  encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, this.url).toString();
  }

  enviar(){

    const data = {
      "username": this.form.value.username,
      "phoneCountry": this.form.value.pais,
      "phoneNumber": this.form.value.telefono,
      "phoneCodCountry": this.codtelefono,
      "email": this.form.value.email,
      "password": this.encrypt(this.form.value.password),
      "terms": this.form.value.checkdatos
  };

    if(this.form.value.checkdatos === true){
      this.register.increptionUser(data).subscribe(
        datos => {
          console.log(datos);
         if(datos.status == 201){
          console.log(11);
          this.messToast.success('se envio un correo de verificacion a ' + this.form.value.email);
          setTimeout(() => {
       //    this.router.navigate(['/login'])
         }, 2000);
         }else{
          console.log(10);
          this.messToast.warning('Error', datos.body.message);
         }
        }
      )
    }else{
      this.messToast.warning('el campo Termino y condiciones debe ser aceptado');
    }
    }

}
