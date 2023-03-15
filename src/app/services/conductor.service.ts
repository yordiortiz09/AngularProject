import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { HttpClient } from '@angular/common/http';
import { Conductores } from '../Interfaces/conductor.interface';


@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  message : String = '';

  constructor(private http:HttpClient,private globalVariable: GlobalVariablesService) { }


  getConductores(): Observable<Conductores[]>
  {
    return this.http.get<Conductores[]>(this.globalVariable.API_CONDUCTOR +'/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }))
  }

  updateConductor(conductor:Conductores , id :number): Observable<Conductores> {
    return this.http.put<Conductores>(this.globalVariable.API_CONDUCTOR + `/update/`+ id, conductor)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarConductor(id: number)
{
  return this.http.get<Conductores>(this.globalVariable.API_CONDUCTOR+'/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
eliminarConductor(id: number)
{
  return this.http.delete<Conductores>(this.globalVariable.API_CONDUCTOR+'/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
}
