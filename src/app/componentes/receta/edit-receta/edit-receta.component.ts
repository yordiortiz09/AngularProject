import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from 'src/app/Interfaces/receta.interface';
import { catchError, of } from 'rxjs';
import { RecetaService } from 'src/app/services/receta.service';
import { ChefService } from 'src/app/services/chef.service';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { PlatoService } from 'src/app/services/plato.service';
import { Platos } from 'src/app/Interfaces/tiposPlato.interface';

@Component({
  selector: 'app-edit-receta',
  templateUrl: './edit-receta.component.html',
  styleUrls: ['./edit-receta.component.css']
})
export class EditRecetaComponent implements OnInit  {
  recetas: Receta [] = [];
  id: number = 0;
  formu : FormGroup;

  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private recetaService:RecetaService,
    private chefService: ChefService, @Inject(ChefService) public chefs: Chef  []=[],
    private ingredienteService: IngredienteService, @Inject(IngredienteService) public ingredientes: ingredientes[]=[], 
    private tipo_platoService: PlatoService,   @Inject(PlatoService) public tipo_platos: Platos[]=[]
   ){
    this.formu = this.fb.group({
      'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'duracion': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'preparacion': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'chef':['',[Validators.required]],
    'ingrediente':['',[Validators.required]],
    'tipo_plato':['',[Validators.required]]
  })
 
  }
  get nombre(){ return this.formu.get('nombre') as FormControl}
  get duracion(){ return this.formu.get('duracion') as FormControl}
  get preparacion(){return this.formu.get('preparacion') as FormControl}
  get chef(){return this.formu.get('chef') as FormControl}
  get ingrediente(){return this.formu.get('ingrediente') as FormControl}
  get tipo_plato(){return this.formu.get('tipo_plato') as FormControl}

  ngOnInit(): void {
    this.route.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
    this.getReceta();
    this.getChefs();
    this.getIngredientes();
    this.getTipoPlato();
  }
  getReceta(){
    this.recetaService.mostrarReceta(this.id).subscribe((recetas)=> {this.formu.patchValue(recetas);
    });
  }
  onSubmit(recetas: Receta): void {
    this.recetaService.updateRecetas(recetas, this.id).subscribe(
      response => {
        alert('Los datos se actualizaron correctamente.'); 
        this.router.navigate(['recetas-info']);
      },
      error => {
        console.log(error);
        const message = error.status === 404 ? 'Ingrediente no encontrado.' : 'Se produjo un error al actualizar el chef.';
        this.router.navigate(['recetas-info'], { queryParams: { showMessage: true, message } }); 
      }
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
