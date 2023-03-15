import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conductores } from 'src/app/Interfaces/conductor.interface';
import { ConductorService } from 'src/app/services/conductor.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-conductor',
  templateUrl: './edit-conductor.component.html',
  styleUrls: ['./edit-conductor.component.css']
})
export class EditConductorComponent {
  conductores : Conductores [] = []
  conductorForm : FormGroup;
  id : number = 0;

  constructor(
  private fb:FormBuilder,
  private http: HttpClient,
  private router : Router,
  private conductorService: ConductorService,
  private route : ActivatedRoute){
  
    this.conductorForm = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      ap_paterno: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      ap_materno: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      edad: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
    }) 
  }
  get nombre() {
    return this.conductorForm.get('nombre') as FormControl;
  }
  get ap_paterno() {
    return this.conductorForm.get('ap_paterno') as FormControl;
  }
  get ap_materno() {
    return this.conductorForm.get('ap_materno') as FormControl;
  }
  get edad() {
    return this.conductorForm.get('edad') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
    this.getConductores();
  }
  getConductores(){
    this.conductorService.mostrarConductor(this.id).subscribe((ingrediente)=> {this.conductorForm.patchValue(ingrediente);
    });
  }
  onSubmit(conductor: Conductores): void {
    this.conductorService.updateConductor(conductor, this.id).subscribe(
      response => {
        alert('Los datos se actualizaron correctamente.'); 
        this.router.navigate(['conductores-info']);
      },
      error => {
        console.log(error);
        const message = error.status === 404 ? 'Conductor no encontrado.' : 'Se produjo un error al actualizar el conductor.';
        this.router.navigate(['conductores-info'], { queryParams: { showMessage: true, message } }); 
      }
    );
  }

}
