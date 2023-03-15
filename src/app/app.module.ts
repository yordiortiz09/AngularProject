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
import { SeeUsersComponent } from './componentes/admins/see-users/see-users.component';
import { CodigoVerificacionComponent } from './componentes/codigo-verificacion/codigo-verificacion.component';
import { TokenInterceptorService } from './interceptores/token-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './componentes/unauthorized/unauthorized.component';
import { EditUserDialogComponent } from './componentes/edit-user-dialog/edit-user-dialog.component';
import { CreateComponent } from './componentes/chefs/create/create.component';
import { EditComponent } from './componentes/chefs/edit/edit.component';
import { SeeChefsComponent } from './componentes/chefs/see-chefs/see-chefs.component';
import { SeeIngredientesComponent } from './componentes/ingredientes/see-ingredientes/see-ingredientes.component';
import { CreateIngredientesComponent } from './componentes/ingredientes/create-ingredientes/create-ingredientes.component';
import { EditIngredientesComponent } from './componentes/ingredientes/edit-ingredientes/edit-ingredientes.component';
import { SeePlatosComponent } from './componentes/tiposPlatos/see-platos/see-platos.component';
import { CreatePlatosComponent } from './componentes/tiposPlatos/create-platos/create-platos.component';
import { EditPlatosComponent } from './componentes/tiposPlatos/edit-platos/edit-platos.component';
import { CreateRecetaComponent } from './componentes/receta/create-receta/create-receta.component';
import { EditRecetaComponent } from './componentes/receta/edit-receta/edit-receta.component';
import { SeeRecetaComponent } from './componentes/receta/see-receta/see-receta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateConductorComponent } from './componentes/conductor/create-conductor/create-conductor.component';
import { EditConductorComponent } from './componentes/conductor/edit-conductor/edit-conductor.component';
import { SeeConductoresComponent } from './componentes/conductor/see-conductores/see-conductores.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    NavBarComponent,
    LoginComponent,
    SeeUsersComponent,
    CodigoVerificacionComponent,
    UnauthorizedComponent,
    EditUserDialogComponent,
    CreateComponent,
    EditComponent,
    SeeChefsComponent,
    SeeIngredientesComponent,
    CreateIngredientesComponent,
    EditIngredientesComponent,
    SeePlatosComponent,
    CreatePlatosComponent,
    EditPlatosComponent,
    CreateRecetaComponent,
    EditRecetaComponent,
    SeeRecetaComponent,
    CreateConductorComponent,
    EditConductorComponent,
    SeeConductoresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule,
    MatDialogModule,
    MatSnackBarModule, 
    BrowserAnimationsModule
 
  ],
  providers: [{provide: AuthService}, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

