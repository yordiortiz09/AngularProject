import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'registrarse', component: FormularioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
