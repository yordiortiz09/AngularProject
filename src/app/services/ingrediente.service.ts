import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ingredientes } from '../Interfaces/ingredientes';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  message: string = '';

  constructor(private http:HttpClient,private globalVariable: GlobalVariablesService) { }

  
  getIngredientes(): Observable<ingredientes[]> 
  {
    return this.http.get<ingredientes[]>(this.globalVariable.API_INGREDIENTE +'/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updateIngrediente(ingrediente: ingredientes, id :number): Observable<ingredientes> {
    return this.http.put<ingredientes>(this.globalVariable.API_INGREDIENTE + `/update/`+ id, ingrediente)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarIngrediente(id: number)
{
  return this.http.get<ingredientes>(this.globalVariable.API_INGREDIENTE+'/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
eliminarIngrediente(id: number)
{
  return this.http.delete<ingredientes>(this.globalVariable.API_INGREDIENTE+'/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
  

}
