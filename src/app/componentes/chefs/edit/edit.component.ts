import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor (private fb:FormBuilder, private http: HttpClient, private router: Router,private chefService: ChefService){

  }
  formu = this.fb.group({
    'nombre':['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    'ap_paterno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'ap_materno': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], 
    'nacionalidad':['',[Validators.required]],
    'edad':['',[Validators.required, Validators.minLength(2)]],
  });
  get nombre(){ return this.formu.get('nombre') as FormControl}
  get ap_paterno(){ return this.formu.get('ap_paterno') as FormControl}
  get ap_materno(){return this.formu.get('ap_materno') as FormControl}
  get nacionalidad(){return this.formu.get('nacionalidad') as FormControl}
  get edad(){return this.formu.get('edad') as FormControl}

  
  Chef(chef: Chef) 
  {
    this.chefService.updateChef(chef).subscribe((chef)=>
    {
      console.log(chef);
      this.router.navigate(['/chefs-info']);
    }
    );
  }

}
