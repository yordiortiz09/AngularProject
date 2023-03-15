import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/Interfaces/receta.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-see-receta',
  templateUrl: './see-receta.component.html',
  styleUrls: ['./see-receta.component.css']
})
export class SeeRecetaComponent {
  
  recetas: Receta[] = [];
  userRole: number = 0;

  constructor(private recetasService: RecetaService, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getRecetas();
    this.authService.getUserRole().then(userRole => {
      this.userRole = userRole;
    });
  }

  isAdmin() {
    return this.userRole === 1;
  }

  isUser() {
    return this.userRole === 2;
  }

  isGuest() {
    return this.userRole === 3;
  }

  getRecetas() {
    console.log(this.recetasService)
    this.recetasService.getRecetas().subscribe(
      (recetas) => {
        this.recetas = recetas;
       
      },
      (error) => {
        console.log(error);
      }
    );
  }


    editarReceta(id: number)
   {
    this.route.navigate(['recetas-edit',id])
   }
   eliminarReceta(id: number): void {
    if (confirm(`¿Está seguro que desea eliminar esta receta?`)) {
      this.recetasService.eliminarReceta(id).subscribe(
        () => {
          this.recetas = this.recetas.filter((recetas) => recetas.id !== id);
        },
        (error) => console.error(error)
      );
    }
  }
}
