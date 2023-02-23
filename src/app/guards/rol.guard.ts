import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rol_id = localStorage.getItem('rol_id');
    const allowedRoles = route.data['allowedRoles'];
    if (allowedRoles.includes(rol_id)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

}