import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conductores } from 'src/app/Interfaces/conductor.interface';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-create-conductor',
  templateUrl: './create-conductor.component.html',
  styleUrls: ['./create-conductor.component.css'],
})
export class CreateConductorComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private globalVariable: GlobalVariablesService
  ) {}

  formu = this.fb.group({
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
  });
  get nombre() {
    return this.formu.get('nombre') as FormControl;
  }
  get ap_paterno() {
    return this.formu.get('ap_paterno') as FormControl;
  }
  get ap_materno() {
    return this.formu.get('ap_materno') as FormControl;
  }
  get edad() {
    return this.formu.get('edad') as FormControl;
  }

  crearConductor() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('nombre', this.formu.value.nombre!);
    body.set('ap_paterno', this.formu.value.ap_paterno!);
    body.set('ap_materno', this.formu.value.ap_materno!);
    body.set('edad', this.formu.value.edad!);

    this.http
      .post<Conductores>(
        this.globalVariable.API_CONDUCTOR + '/create',
        body.toString(),
        { headers }
      )
      .subscribe((response) => {
        if (response && response.status && response.status >= 400) {
          alert(`Se produjo un error: ${response.status}`);
        } else {
          alert('Los datos se enviaron correctamente');
          this.formu.reset();
          this.router.navigate(['/conductores-info']);
        }
      });
  }
}
