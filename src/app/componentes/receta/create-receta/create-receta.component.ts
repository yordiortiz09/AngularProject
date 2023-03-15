import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { Receta } from 'src/app/Interfaces/receta.interface';
import { Platos } from 'src/app/Interfaces/tiposPlato.interface';
import { ChefService } from 'src/app/services/chef.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-create-receta',
  templateUrl: './create-receta.component.html',
  styleUrls: ['./create-receta.component.css']
})
export class CreateRecetaComponent implements OnInit{
  constructor (
     private fb:FormBuilder,
     private http: HttpClient,
     private router: Router,
     private globalVariable: GlobalVariablesService,
     private chefService: ChefService,
     @Inject(ChefService) public chefs: Chef[]=[],
     private ingredienteService: IngredienteService,
      @Inject(IngredienteService) public ingredientes: ingredientes[]=[],
     private tipo_platoService: PlatoService,
     @Inject(PlatoService) public tipo_platos: Platos[]=[]
     ) {}
  ngOnInit(): void {
    this.getChefs();
    this.getIngredientes();
    this.getTipoPlato();
  }
  formu = this.fb.group({
    'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'duracion': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'preparacion': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]], 
    'chef':['',[Validators.required]],
    'ingrediente':['',[Validators.required]],
    'tipo_plato':['',[Validators.required]]
  });
  get nombre(){ return this.formu.get('nombre') as FormControl}
  get duracion(){ return this.formu.get('duracion') as FormControl}
  get preparacion(){return this.formu.get('preparacion') as FormControl}
  get chef(){return this.formu.get('chef') as FormControl}
  get ingrediente(){return this.formu.get('ingrediente') as FormControl}
  get tipo_plato(){return this.formu.get('tipo_plato') as FormControl}

  registrarReceta() {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('nombre', this.formu.value.nombre!);
    body.set('duracion', this.formu.value.duracion!);
    body.set('preparacion', this.formu.value.preparacion!);
    body.set('chef', this.formu.value.chef!); 
    body.set('ingrediente', this.formu.value.ingrediente!);
    body.set('tipo_plato', this.formu.value.tipo_plato!);


    this.http.post<Receta>(this.globalVariable.API_RECETA + '/create', body.toString(), { headers }).subscribe(
      response => {
        if (response && response.status && response.status >= 400 ) {
          alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/recetas-info']);
        }
      },
    
    );
 }
 getChefs() 
 {
   this.chefService.getChefs().subscribe(data => this.chefs = data);
 }
 getIngredientes()
 {
   this.ingredienteService.getIngredientes().subscribe(data => this.ingredientes = data);
 }
 getTipoPlato()
 {
this.tipo_platoService.getPlatos().subscribe(data => this.tipo_platos = data);
 }
}
