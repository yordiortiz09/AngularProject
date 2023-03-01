import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-see-ingredientes',
  templateUrl: './see-ingredientes.component.html',
  styleUrls: ['./see-ingredientes.component.css']
})
export class SeeIngredientesComponent {
  ingredientes : ingredientes[] = [];

  constructor(private ingredienteService: IngredienteService,private route:Router)  {}
  ngOnInit() {
    this.getIngredientes();
  }
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
