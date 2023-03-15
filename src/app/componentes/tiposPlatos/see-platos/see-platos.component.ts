import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platos } from 'src/app/Interfaces/tiposPlato.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-see-platos',
  templateUrl: './see-platos.component.html',
  styleUrls: ['./see-platos.component.css']
})
export class SeePlatosComponent {
  platos : Platos[] = [];
  userRole: number = 0;

  constructor(private platosService: PlatoService,private route:Router, private authService:AuthService)  {}
  ngOnInit() {
    this.getPlatos();
    this.authService.getUserRole().then(userRole => {
      this.userRole = userRole;
    });
  }
  isAdmin(){return this.userRole === 1;}
  isUser(){return this.userRole === 2;}
  isGuest(){return this.userRole === 3;}

  getPlatos() {
    this.platosService.getPlatos().subscribe((platos)=> 
      this.platos = platos);
  }

  editarPlatos(id: number)
  {
   this.route.navigate(['platos-edit',id])
  }

  eliminarPlatos(id: number): void {
    if (confirm(`¿Está seguro que desea eliminar este plato?`)) {
      this.platosService.eliminarPlato(id).subscribe(
        () => {
          this.platos = this.platos.filter((platos) => platos.id !== id);
        },
        (error) => console.error(error)
      );
    }
  }
}
