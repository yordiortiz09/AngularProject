import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chef } from 'src/app/Interfaces/chef.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router){

  }
  formu = this.fb.group({
    'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'ap_paterno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'ap_materno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'nacionalidad':['',[Validators.required]],
    'edad':['',[Validators.required, Validators.minLength(2)]],
  });

  get nombre(){ return this.formu.get('nombre') as FormControl}
  get ap_paterno(){ return this.formu.get('ap_paterno') as FormControl}
  get ap_materno(){return this.formu.get('ap_materno') as FormControl}
  get nacionalidad(){return this.formu.get('nacionalidad') as FormControl}
  get edad(){return this.formu.get('edad') as FormControl}

  registrarChef() {
   
    const url = 'http://127.0.0.1:8000/api/chefyordi';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('nombre', this.formu.value.nombre!);
    body.set('ap_paterno', this.formu.value.ap_paterno!);
    body.set('ap_materno', this.formu.value.ap_materno!);
    body.set('nacionalidad', this.formu.value.nacionalidad!); 
    body.set('edad', this.formu.value.edad!);


    this.http.post<Chef>(url, body.toString(), { headers }).subscribe(
      response => {
        if (response && response.status && response.status >= 400 ) {
          alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/chefs-info']);
        }
      },
     // error => alert(error)
    );

  // name= new FormControl('', Validators.required);
  // email=  new FormControl('', [Validators.required, Validators.email]);
  // password=  new FormControl('',[Validators.required]);
 
 }
}
