import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/user.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  estado?:User;  
  id: number = 0;

  showError: boolean = false;
  public apiFailed: boolean = false;

  constructor(private fb: FormBuilder,private authService: AuthService,private sharedService: SharedServiceService,private router:Router,private route: ActivatedRoute) 
  { 
  
    this.form= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  get password(){ return this.form.get('password') as FormControl}
  get email(){ return this.form.get('email') as FormControl}
  
    onSubmit(values: User)
    {  
      this.authService.login(values).subscribe((response:any) =>
      {
        if (response.user.status === 0) {
          alert('El usuario está desactivado. No se puede iniciar sesión.');
          return;
        }
        localStorage.setItem('id',response.user.id);
        localStorage.setItem('name',response.user.name);
        localStorage.setItem('rol_id',response.user.rol_id);
        localStorage.setItem('token',response.token);
        this.authService.info(response.user.id).subscribe(user =>
        { console.log(user);
         
        });
        if(response.user.rol_id == 1){
        this.sharedService.setId(response.user.rol_id);  
        this.router.navigate(['/see-users']);
        }
        else if(response.user.rol_id == 2){
          this.sharedService.setId(response.user.rol_id);  
          this.router.navigate(['chefs-info']);
        }
        else if(response.user.rol_id == 3){
          this.sharedService.setId(response.user.rol_id); 
          this.router.navigate(['chefs-info']);
        
          
        }
      },
      error => {
        console.log(error); 
        this.showError = true; 
        this.apiFailed = true;
      });
    }
   
  
  }

  
  

