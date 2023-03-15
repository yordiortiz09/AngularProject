import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../Interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { GlobalVariablesService } from '../services/global-variables.service';

@Injectable({
  providedIn: 'root',
})
export class StatusGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private variables: GlobalVariablesService,
    private snackBar: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<User>(this.variables.API_URL2 + '/status', { headers })
      .pipe(
        map((user) => {
          if (user.status == true) {
            return true;
          } else {
            this.snackBar.open(
              'Usuario deshabilitado. Contacte al administrador',
              'Cerrar',
              {
                  duration: 3000,
              }
          );
          setTimeout(() => {
              this.router.navigate(['/login']);
          }, 3000);
            localStorage.removeItem('token');
           return false;
          }
        })
      );
  }
}
