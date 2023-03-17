import { Component, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Conductores } from 'src/app/Interfaces/conductor.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-see-conductores',
  templateUrl: './see-conductores.component.html',
  styleUrls: ['./see-conductores.component.css']
})
export class SeeConductoresComponent implements OnDestroy {
  conductores : Conductores[]=[]
  userRole : number =0
  intervalo: number = 10000;
  inter: any;

  constructor(
    private conductorService : ConductorService,
    private route : Router,
    private authService: AuthService
  ){}
  ngOnInit() {
    this.getConductores();
    this.authService.getUserRole().then(userRole => {
      this.userRole = userRole;
    });
    this.inter =
    setInterval(() => {
      this.getConductores();
    }, this.intervalo);

  }
 
  isAdmin(){return this.userRole === 1;}
  isUser(){return this.userRole === 2;}
  isGuest(){return this.userRole === 3;}
  
  getConductores() {
    this.conductorService.getConductores().subscribe((conductores)=> 
      this.conductores = conductores);
  }
  editarConductor(id: number)
  {
   this.route.navigate(['conductores-edit',id])
  }
  eliminarConductor(id: number): void {
    if (confirm(`¿Está seguro que desea eliminar este conductor?`)) {
      this.conductorService.eliminarConductor(id).subscribe(
        () => {
          this.conductores = this.conductores.filter((conductores) => conductores.id !== id);
        },
        (error) => console.error(error)
      );
    }
  }
  ngOnDestroy(){
    clearInterval(this.inter);

    
  }
  
}
