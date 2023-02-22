import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: AuthService, private router: Router) { }

  canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }
    return this.apiService.verifyToken(token).toPromise().then((response) => {
      if (response) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}

