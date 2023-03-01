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
import { UnauthorizedComponent } from './componentes/unauthorized/unauthorized.component';
import { CreateComponent } from '../app/componentes/chefs/create/create.component';
import { SeeChefsComponent } from './componentes/chefs/see-chefs/see-chefs.component';
import { EditComponent } from './componentes/chefs/edit/edit.component';


const routes: Routes = [
  
  { path: 'registrarse', component: FormularioComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'verify', component: CodigoVerificacionComponent},
  { path: 'see-users', component: SeeUsersComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1'] }},
  { path: 'unauthorized', component: UnauthorizedComponent } ,
  { path:'chef-create', component: CreateComponent},
  {path:'chefs-info', component: SeeChefsComponent},
  {path: 'chef-edit/:id', component: EditComponent}
 
  
  // { path: 'registrarse', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

