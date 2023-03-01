import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ingredientes } from 'src/app/Interfaces/ingredientes';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-edit-ingredientes',
  templateUrl: './edit-ingredientes.component.html',
  styleUrls: ['./edit-ingredientes.component.css']
})
export class EditIngredientesComponent {
  ingrediente: ingredientes [] = [];
  ingredienteForm: FormGroup;
  id: number = 0;
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router, private ingredienteService: IngredienteService, private route: ActivatedRoute) {
    this.ingredienteForm = this.fb.group({
      'ingredientes':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'unidades': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]], 
  })
}

  get ingredientes(){ return this.ingredienteForm.get('ingredientes') as FormControl}
  get unidades(){ return this.ingredienteForm.get('unidades') as FormControl}

  ngOnInit(): void {
    this.route.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
    this.getIngredientes();
  }
  getIngredientes(){
    this.ingredienteService.mostrarIngrediente(this.id).subscribe((ingrediente)=> {this.ingredienteForm.patchValue(ingrediente);
    });
  }
  onSubmit(ingrediente: ingredientes): void {
    this.ingredienteService.updateIngrediente(ingrediente, this.id).subscribe(
      response => {
        alert('Los datos se actualizaron correctamente.'); 
        this.router.navigate(['ingredientes-info']);
      },
      error => {
        console.log(error);
        const message = error.status === 404 ? 'Ingrediente no encontrado.' : 'Se produjo un error al actualizar el chef.';
        this.router.navigate(['ingredientes-info'], { queryParams: { showMessage: true, message } }); 
      }
    );
  }
  
}

