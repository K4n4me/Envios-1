import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CookieService]
})
export class AppComponent implements OnInit {

  formulario!: FormGroup;
  private formBuilder = inject(FormBuilder);
  click: boolean = false;


  ngOnInit(): void {
    this.builderForm();
  }

  constructor(private cookieService: CookieService) {}

  builderForm(){
    this.formulario = this.formBuilder.group({
      nEnvio: ['', {validators:[Validators.required]}],
      nomEnvio: ['', {validators: [Validators.required]}],
      calleEnvio: ['', {validators: [Validators.required]}],
      entreEnvio: ['', {validators: [Validators.required]}],
      colEnvio: ['', {validators: [Validators.required]}],
      nRecibe: ['', {validators: [Validators.required]}],
      nomRecibe: ['', {validators: [Validators.required]}],
      domRecibe: ['', {validators: [Validators.required]}],
      entreRecibe: ['', {validators: [Validators.required]}],
      colRecibe: ['', {validators: [Validators.required]}],
    });
  }

  soloNumeros(event: KeyboardEvent)
  {
    const charCode = event.which ? event.which : event.keyCode;
    if(charCode < 48 || charCode > 57)
    {
      event.preventDefault();
    }
  }

  permitirNumerosDecimalDosDigitos(event: KeyboardEvent) {
    const inputChar = event.key;
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    if (!/[\d.]/.test(inputChar)) {
      event.preventDefault();
      return;
    }
  
    if (inputChar === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }
  
    const partes = value.split('.');
    if (partes.length === 2 && partes[1].length >= 2 && input.selectionStart! > value.indexOf('.')) {
      event.preventDefault();
    }
  }

  guardarEnCookie(){
    this.click = true;

    const formValues = this.formulario.value;

    const datosEnvio = {
      nomEnvio: formValues.nomEnvio,
      calleEnvio: formValues.calleEnvio,
      entreEnvio: formValues.entreEnvio,
      colEnvio: formValues.colEnvio
    }

    const datosRecibe = {
      nomRecibe: formValues.nomRecibe,
      domRecibe: formValues.domRecibe,
      entreRecibe: formValues.entreRecibe,
      colRecibe: formValues.colRecibe
    }

    this.cookieService.set(formValues.nEnvio, JSON.stringify(datosEnvio), 1000);
    this.cookieService.set(formValues.nRecibe, JSON.stringify(datosRecibe), 1000);
    
    this.click = false;
  }

  cargarCookieEnvio(){
    const nEnvio = this.formulario.get('nEnvio')?.value;

    if(nEnvio && this.cookieService.check(nEnvio)){
      const datos = JSON.parse(this.cookieService.get(nEnvio));
      this.formulario.patchValue({
        nomEnvio: datos.nomEnvio,
        calleEnvio: datos.calleEnvio,
        entreEnvio: datos.entreEnvio,
        colEnvio: datos.colEnvio
      });
    }
  }

  cargarCookieRecibe(){
    const nRecibe = this.formulario.get('nRecibe')?.value;

    if(nRecibe && this.cookieService.check(nRecibe)){
      const datos = JSON.parse(this.cookieService.get(nRecibe));
      this.formulario.patchValue({
        nomRecibe: datos.nomRecibe,
        domRecibe: datos.domRecibe,
        entreRecibe: datos.entreRecibe,
        colRecibe: datos.colRecibe
      });
    }
  }
}
