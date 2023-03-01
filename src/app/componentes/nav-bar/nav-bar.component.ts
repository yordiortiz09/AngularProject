import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent   implements OnInit{
  isAdmin: boolean = false;
  isEditor: boolean=  false;
  isViewer: boolean= false;

  
constructor (private router: Router, private authService:AuthService) { }
  logOut(){
    if (confirm ('¿Desea cerrar sesión?')){
      this.authService.logout();
      this.router.navigate(['/login']);
      location.reload();
    } else{
      return console.error('No se pudo cerrar sesión');
      
        
    }
   
  }
  
    ngOnInit() {
      const role = localStorage.getItem('rol_id');
      this.isAdmin = Number(role) == 1;
      this.isEditor = Number(role) == 2;
      this.isViewer = Number(role) == 3;
  }
  isSessionActive() 
  {
    return !!localStorage.getItem('token');
  }  
getUser(){ 
  this.router.navigate(['/see-users']);
}
  
}
 
