import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-see-ingredientes',
  templateUrl: './see-ingredientes.component.html',
  styleUrls: ['./see-ingredientes.component.css']
})
export class SeeIngredientesComponent {
  ingredientes : ingredientes[] = [];
  userRole: number = 0;

  constructor(private ingredienteService: IngredienteService,private route:Router, private authService: AuthService)  {}
  ngOnInit() {
    this.getIngredientes();
    this.authService.getUserRole().then(userRole => {
      this.userRole = userRole;
    });
  }
  isAdmin(){return this.userRole === 1;}
  isUser(){return this.userRole === 2;}
  isGuest(){return this.userRole === 3;}
  
  getIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((ingredientes)=> 
      this.ingredientes = ingredientes);
  }
  editarIngrediente(id: number)
  {
   this.route.navigate(['ingredientes-edit',id])
  }

  eliminarIngrediente(id: number): void {
    if (confirm(`¿Está seguro que desea eliminar este ingrediente?`)) {
      this.ingredienteService.eliminarIngrediente(id).subscribe(
        () => {
          this.ingredientes = this.ingredientes.filter((ingredientes) => ingredientes.id !== id);
        },
        (error) => console.error(error)
      );
    }
  }
}
