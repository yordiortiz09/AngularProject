import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup,ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router){

  }

  formu = this.fb.group({
    'name':['', [Validators.required, Validators.minLength(3)]],
    'email': ['', [Validators.required, Validators.email]], 
    'password':['',[Validators.required, Validators.minLength(5)]],
    'telefono':['',[Validators.required, Validators.minLength(10)]],
    'confirmPassword': ['', [Validators.required, this.matchValues('password')]]
  }, {validator:this.passwordsMatchValidator});

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formGroup = control.parent;
      if (formGroup) {
        const matchFrom = formGroup.get(matchTo);
        if (matchFrom && control.value !== matchFrom.value) {
          return { 'mismatch': true };
        }
      }
      return null;
    };
    
  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password?.value == '' || confirmPassword?.value === '') {
      confirmPassword?.setErrors(null);
      return null;
    }
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  get name(){ return this.formu.get('name') as FormControl}
  get email(){ return this.formu.get('email') as FormControl}
  get password(){return this.formu.get('password') as FormControl}
  get telefono(){return this.formu.get('telefono') as FormControl}
  get confirmPassword(){return this.formu.get('confirmPassword') as FormControl}


  // formExample = new FormGroup({
  //   'name': new FormControl('', Validators.required),
  //   'email': new FormControl('', [Validators.required, Validators.email]),
  //   'password':  new FormControl('',Validators.required)
  
  // });
  
  
  procesar()
  {
    console.log(this.formu.value.email)
  }
  registrarUsuario() {
   
    const url = 'http://127.0.0.1:8000/api/user/regis';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('name', this.formu.value.name!);
    body.set('email', this.formu.value.email!);
    body.set('password', this.formu.value.password!);
    body.set('telefono', this.formu.value.telefono!);

    this.http.post<User>(url, body.toString(), { headers }).subscribe(
     response => {
      if (response && response.status && response.status === true) {
        alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/verify']);
        }
      },
      error => {
        alert(`Se produjo un error: ${error}`);
      }
    );

  // name= new FormControl('', Validators.required);
  // email=  new FormControl('', [Validators.required, Validators.email]);
  // password=  new FormControl('',[Validators.required]);
 
 }
}
