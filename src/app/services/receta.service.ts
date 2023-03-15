import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Receta } from '../Interfaces/receta.interface';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  message: string = '';

  constructor(private http:HttpClient, private globalVariable:GlobalVariablesService) { }

  getRecetas(): Observable<Receta[]>
  {
    return this.http.get<Receta[]>(this.globalVariable.API_RECETA +'/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }))
  }
  updateRecetas(receta: Receta, id :number): Observable<Receta> {
    return this.http.put<Receta>(this.globalVariable.API_RECETA +`/update`+ id, receta)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }))
}
mostrarReceta(id: number)
{
  return this.http.get<Receta>(this.globalVariable.API_RECETA +'/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    }))
}
eliminarReceta(id: number)
{
  return this.http.delete<Receta>(this.globalVariable.API_RECETA +'/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    }
    ))
}
}
