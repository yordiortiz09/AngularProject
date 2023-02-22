import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: 'registrarse', component: FormularioComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

