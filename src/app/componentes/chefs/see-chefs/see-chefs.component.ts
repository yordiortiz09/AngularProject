import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-see-chefs',
  templateUrl: './see-chefs.component.html',
  styleUrls: ['./see-chefs.component.css']
})
export class SeeChefsComponent {
  chefs : Chef[] = [];

  constructor(private chefService: ChefService,private route:Router)  {}
  ngOnInit() {
    this.getChefs();
  }
  
  getChefs() {
    this.chefService.getChefs().subscribe((chefs)=> 
      this.chefs = chefs);
  }
   editarChef(id: number)
   {
    this.route.navigate(['chef-edit',id])
   }
   
   eliminarChef(id: number, nombre : string): void {
    if (confirm(`¿Está seguro que desea eliminar al chef, ${nombre}?`)) {
      this.chefService.eliminarChef(id).subscribe(
        () => {
          this.chefs = this.chefs.filter((chef) => chef.id !== id);
        },
        (error) => console.error(error)
      );
    }
  }

}
