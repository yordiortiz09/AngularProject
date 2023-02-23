import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { LoginComponent } from './componentes/login/login.component';
import { AuthService } from './services/auth.service';
import { RolesComponent } from './componentes/admins/roles/roles.component';
import { UsersComponent } from './componentes/admins/users/users.component';
import { SeeUsersComponent } from './componentes/admins/see-users/see-users.component';
import { CodigoVerificacionComponent } from './componentes/codigo-verificacion/codigo-verificacion.component';
import { TokenInterceptorService } from './interceptores/token-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './componentes/unauthorized/unauthorized.component';
import { EditUserDialogComponent } from './componentes/edit-user-dialog/edit-user-dialog.component';
import { CreateComponent } from './componentes/chefs/create/create.component';
import { EditComponent } from './componentes/chefs/edit/edit.component';
import { SeeChefsComponent } from './componentes/chefs/see-chefs/see-chefs.component';






@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    NavBarComponent,
    LoginComponent,
    RolesComponent,
    UsersComponent,
    SeeUsersComponent,
    CodigoVerificacionComponent,
    UnauthorizedComponent,
    EditUserDialogComponent,
    CreateComponent,
    EditComponent,
    SeeChefsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule,
    MatDialogModule
 
  ],
  providers: [{provide: AuthService}, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
