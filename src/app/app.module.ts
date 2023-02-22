import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { LoginComponent } from './componentes/login/login.component';
import { AuthService } from './services/auth.service';
import { RolesComponent } from './componentes/admins/roles/roles.component';
import { UsersComponent } from './componentes/admins/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    NavBarComponent,
    LoginComponent,
    RolesComponent,
    UsersComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    // RouterModule.forRoot([
    //   {path: 'formulario', component: FormularioComponent},
    // ])
    
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
