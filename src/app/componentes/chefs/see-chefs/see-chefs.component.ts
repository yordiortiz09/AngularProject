import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subject, throwError } from 'rxjs';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-see-chefs',
  templateUrl: './see-chefs.component.html',
  styleUrls: ['./see-chefs.component.css'],
})
export class SeeChefsComponent implements OnDestroy  {
  chefs: Chef[] = [];
  eventSource: EventSource = new EventSource(
    'http://127.0.0.1:3333/api/chefs/stream'
  );
  userRole: number = 0;
 

  constructor(
    private chefService: ChefService,
    private route: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getChefs();
    this.authService.getUserRole().then((userRole) => {
      this.userRole = userRole;
    });
    this.eventSource.addEventListener('newChef', (event) => {
      console.log('Evento newChef recibido:', event);
      const chef = JSON.parse(event.data);
      this.chefs.push(chef)
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.eventSource.close();
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
        },
        (error) => console.error(error)
      );
    }
  }
}
