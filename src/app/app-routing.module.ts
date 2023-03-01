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
import { CreateIngredientesComponent } from './componentes/ingredientes/create-ingredientes/create-ingredientes.component';
import { SeeIngredientesComponent } from './componentes/ingredientes/see-ingredientes/see-ingredientes.component';
import { EditIngredientesComponent } from './componentes/ingredientes/edit-ingredientes/edit-ingredientes.component';
import { CreatePlatosComponent } from './componentes/tiposPlatos/create-platos/create-platos.component';
import { SeePlatosComponent } from './componentes/tiposPlatos/see-platos/see-platos.component';
import { EditPlatosComponent } from './componentes/tiposPlatos/edit-platos/edit-platos.component'; 


const routes: Routes = [
  
  { path: 'registrarse', component: FormularioComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'verify', component: CodigoVerificacionComponent},
  { path: 'see-users', component: SeeUsersComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1'] }},
  { path: 'unauthorized', component: UnauthorizedComponent } ,


  //Chef
  { path:'chef-create', component: CreateComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1', '2'] }},
  {path:'chefs-info', component: SeeChefsComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1', '2','3'] }},
  {path: 'chef-edit/:id', component: EditComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1', '2'] }},

  //Ingredientes
  {path: 'ingredientes-create', component: CreateIngredientesComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1','2'] }},
  {path: 'ingredientes-info', component: SeeIngredientesComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1','2','3'] }},
  {path: 'ingredientes-edit/:id', component: EditIngredientesComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1', '2'] }},

  //Platos
  {path: 'platos-create', component: CreatePlatosComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1','2'] }},
  {path: 'platos-info', component: SeePlatosComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1','2','3'] }},
  {path: 'platos-edit/:id', component: EditPlatosComponent, canActivate: [AuthGuard, RolGuard], data: { allowedRoles: ['1','2'] }},
  
  // { path: 'registrarse', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

