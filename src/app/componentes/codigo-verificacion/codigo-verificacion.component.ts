import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.component.html',
  styleUrls: ['./codigo-verificacion.component.css']
})
export class CodigoVerificacionComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  )
  {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]]
    });
  }
  get codigo() {
    return this.form.get('codigo') as FormControl;
  }
  onSubmit() {
    const url = 'http://127.0.0.1:8000/api/telefonoregistr';

    this.http.post<any>(url, { codigo: this.codigo.value }).subscribe(
      response => {
        if (response && response.status && response.status >= 400) {
          alert(`Se produjo un error: ${response.error()};
          }`);
        } else {
          
          alert('Se ha verificado el código');
          
          this.router.navigate(['/login']); 
        }
      },
      
    );
  }
}
