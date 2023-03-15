import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-create-ingredientes',
  templateUrl: './create-ingredientes.component.html',
  styleUrls: ['./create-ingredientes.component.css']
})
export class CreateIngredientesComponent {
  constructor (
    private fb:FormBuilder,
     private http: HttpClient,
      private router: Router,
      private globalVariable: GlobalVariablesService
      ){

  }
  formu = this.fb.group({
    'ingredientes':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'unidades': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]], 
  });
  get ingredientes(){ return this.formu.get('ingredientes') as FormControl}
  get unidades(){ return this.formu.get('unidades') as FormControl}


  crearIngredientes() {
   
    const url = 'http://192.168.123.110:8000/api/ingredienteyordi';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('ingredientes', this.formu.value.ingredientes!);
    body.set('unidades', this.formu.value.unidades!);
  


    this.http.post<ingredientes>(this.globalVariable.API_INGREDIENTE + '/create', body.toString(), { headers }).subscribe(
      response => {
        if (response && response.status && response.status >= 400 ) {
          alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/ingredientes-info']);
        }
      },
    
    );

}
}
