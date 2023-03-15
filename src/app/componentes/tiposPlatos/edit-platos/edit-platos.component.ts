import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Platos } from 'src/app/Interfaces/tiposPlato.interface';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-edit-platos',
  templateUrl: './edit-platos.component.html',
  styleUrls: ['./edit-platos.component.css']
})
export class EditPlatosComponent {
  platos: Platos [] = [];
  id: number = 0;
  formu : FormGroup;

  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private platosService:PlatoService){
    this.formu = this.fb.group({
      'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'descripcion': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]], 
  })
  }
  
  get nombre(){ return this.formu.get('nombre') as FormControl}
  get descripcion(){ return this.formu.get('descripcion') as FormControl}

  ngOnInit(): void {
    this.route.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
    this.getPlatos();
  }
  getPlatos(){
    this.platosService.mostrarPlato(this.id).subscribe((platos)=> {this.formu.patchValue(platos);
    });
  }
  onSubmit(platos: Platos): void {
    this.platosService.updatePlatos(platos, this.id).subscribe(
      response => {
        alert('Los datos se actualizaron correctamente.'); 
        this.router.navigate(['platos-info']);
      },
      error => {
        console.log(error);
        const message = error.status === 404 ? 'Ingrediente no encontrado.' : 'Se produjo un error al actualizar el chef.';
        this.router.navigate(['platos-info'], { queryParams: { showMessage: true, message } }); 
      }
    );
  }
  


}
