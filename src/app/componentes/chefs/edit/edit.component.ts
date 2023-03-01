import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  chefForm: FormGroup;
  id: number = 0;
  chef: Chef [] = [];
  
  
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router,private chefService: ChefService, private route: ActivatedRoute) {
    this.chefForm = this.fb.group({
      'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'ap_paterno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
      'ap_materno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
      'nacionalidad': ['',[Validators.required]],
      'edad': ['',[Validators.required, Validators.minLength(2)]],
  })
}

get nombre(){ return this.chefForm.get('nombre') as FormControl}
get ap_paterno(){ return this.chefForm.get('ap_paterno') as FormControl}
get ap_materno(){return this.chefForm.get('ap_materno') as FormControl}
get nacionalidad(){return this.chefForm.get('nacionalidad') as FormControl}
get edad(){return this.chefForm.get('edad') as FormControl}

ngOnInit(): void {
  this.route.params.pipe(catchError(error => of({ id: null }))).subscribe(params => {this.id = params['id']});
  this.getChef();
}
getChef(){
  this.chefService.mostrarChef(this.id).subscribe((chef)=> {this.chefForm.patchValue(chef);
  });
}

onSubmit(chef: Chef): void {
  this.chefService.updateChef(chef, this.id).subscribe(
    response => {
      alert('Los datos se actualizaron correctamente.'); 
      this.router.navigate(['chefs-info']);
    },
    error => {
      console.log(error);
      const message = error.status === 404 ? 'Chef no encontrado.' : 'Se produjo un error al actualizar el chef.';
      this.router.navigate(['chefs-info'], { queryParams: { showMessage: true, message } }); 
    }
  );
}


}














//   get nombre(){ return this.chefForm.get('nombre') as FormControl}
//   get ap_paterno(){ return this.chefForm.get('ap_paterno') as FormControl}
//   get ap_materno(){return this.chefForm.get('ap_materno') as FormControl}
//   get nacionalidad(){return this.chefForm.get('nacionalidad') as FormControl}
//   get edad(){return this.chefForm.get('edad') as FormControl}

  

// onSubmit(): void {
//   const formData = this.chefForm.value;
//   const updatedChef: Chef = {
//     id: this.chef.id,
//     status: this.chef.status,
//     ...formData,
//   };
  
  
// }

 
 


