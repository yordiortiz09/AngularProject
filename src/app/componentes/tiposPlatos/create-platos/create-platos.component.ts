import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platos } from 'src/app/Interfaces/tiposPlato.interface';

@Component({
  selector: 'app-create-platos',
  templateUrl: './create-platos.component.html',
  styleUrls: ['./create-platos.component.css']
})
export class CreatePlatosComponent {
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router){

  }
  formu = this.fb.group({
    'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'descripcion': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]], 
  });
  get nombre(){ return this.formu.get('nombre') as FormControl}
  get descripcion(){ return this.formu.get('descripcion') as FormControl}

  crearPlato() {
   
    const url = 'http://192.168.123.110:8000/api/tipo_platoyordi';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('nombre', this.formu.value.nombre!);
    body.set('descripcion', this.formu.value.descripcion!);
  


    this.http.post<Platos>(url, body.toString(), { headers }).subscribe(
      response => {
        if (response && response.status && response.status >= 400 ) {
          alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/platos-info']);
        }
      },
    
    );

}

}
