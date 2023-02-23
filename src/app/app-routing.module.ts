import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './componentes/login/login.component';
import { CodigoVerificacionComponent } from './componentes/codigo-verificacion/codigo-verificacion.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { SeeUsersComponent } from './componentes/admins/see-users/see-users.component';
import { LoginGuard } from './guards/login.guard';
import { RolGuard } from './guards/rol.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  
  { path: 'registrarse', component: FormularioComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'verify', component: CodigoVerificacionComponent},
  { path: 'see-users', component: SeeUsersComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1'] }},
  { path: 'unauthorized', component: UnauthorizedComponent } 
 
  
  // { path: 'registrarse', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

