import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatRadioModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
  
    // Permitir números y un solo punto
    if (!/[\d.]/.test(inputChar)) {
      event.preventDefault();
      return;
    }
  
    // Solo un punto decimal permitido
    if (inputChar === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }
  
    // Validar que no haya más de 2 dígitos después del punto
    const partes = value.split('.');
    if (partes.length === 2 && partes[1].length >= 2 && input.selectionStart! > value.indexOf('.')) {
      event.preventDefault();
    }
  }
}
