import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { LoginComponent } from './componentes/login/login.component';
import { CodigoVerificacionComponent } from './componentes/codigo-verificacion/codigo-verificacion.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';

const routes: Routes = [
  { path: 'registrarse', component: FormularioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'verify', component: CodigoVerificacionComponent},
  
  // { path: 'registrarse', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

