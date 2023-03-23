import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Subject, throwError } from 'rxjs';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChefService } from 'src/app/services/chef.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-see-chefs',
  templateUrl: './see-chefs.component.html',
  styleUrls: ['./see-chefs.component.css'],
})
export class SeeChefsComponent implements OnDestroy {
  chefs: Chef[] = [];
  eventSource: EventSource = new EventSource(
    'http://192.168.114.208:3333/chef/stream'
  );
  userRole: number = 0;

  constructor(
    private chefService: ChefService,
    private route: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private globalVatiables: GlobalVariablesService
  ) {}
  ngOnInit() {
    this.getChefs();

    this.authService.getUserRole().then((userRole) => {
      this.userRole = userRole;
    });
    this.eventSource.addEventListener('Chef', (event) => {
      console.log('Evento Chef recibido');
      const updatedChef = JSON.parse(event.data);
      const index = this.chefs.findIndex((chef) => chef.id === updatedChef.id);
      if (index > -1) {
        this.chefs[index] = updatedChef;
      } else {
        this.chefs.push(updatedChef);
      }
    });
    this.eventSource.addEventListener('Delete', (event) => {
      console.log('Evento Chef recibido:');
      const chef = JSON.parse(event.data);
      console.log('Chef eliminado:', chef.id);
      this.chefs = this.chefs.filter((c) => c.id !== chef.id);
      this.cd.detectChanges();
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

  getChefs() {
    this.chefService.getChefs().subscribe((chefs) => (this.chefs = chefs));
    this.cd.markForCheck();
  }
  editarChef(id: number) {
    this.route.navigate(['chef-edit', id]);
    this.cd.markForCheck();
  }
  eliminarChef(id: number, nombre: string): void {
    if (confirm(`¿Está seguro que desea eliminar al chef, ${nombre}?`)) {
      this.chefService.eliminarChef(id).subscribe(
        () => {
          this.chefs = this.chefs.filter((chef) => chef.id !== id);
          this.cd.markForCheck();
        },
        (error) => console.error(error)
      );
    }
  }

  ngOnDestroy() {
    this.eventSource.close();
  }
}
