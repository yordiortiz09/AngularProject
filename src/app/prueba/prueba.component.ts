import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  persona ={
    nombre: '',
    correo:'',
    contrasena:''

  }

  procesar()
  {
    console.log(this.persona)
  }

}
