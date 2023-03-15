import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userRole: number = 0;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  logOut() {
    if (confirm('¿Desea cerrar sesión?')) {
      this.authService.logout();

      this.router.navigate(['/login']);
      this.changeDetectorRef.detectChanges();
    } else {
      return console.error('No se pudo cerrar sesión');
    }
  }
  ngOnInit() {
    this.isLoading = true;
    this.authService.getUserRole().then((userRole) => {
      this.userRole = userRole;
      this.isLoading = false;
      this.changeDetectorRef.detectChanges();
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

  isSessionActive() {
    return !!localStorage.getItem('token');
  }
  getUser() {
    this.router.navigate(['/see-users']);
  }
}
