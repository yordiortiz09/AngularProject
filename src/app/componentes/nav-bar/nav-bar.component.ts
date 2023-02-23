import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {
constructor (private router: Router, private authService:AuthService) { }
  logOut(){
    if (confirm ('¿Desea cerrar sesión?')){
      this.authService.logout();
      this.router.navigate(['/login']);
    } else{
      return console.error('No se pudo cerrar sesión');
      
        
    }
   
  }
  isSessionActive() 
  {
    return !!localStorage.getItem('token');
  }  
}
 
