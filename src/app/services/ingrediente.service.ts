import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ingredientes } from '../Interfaces/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  message: string = '';

  constructor(private http:HttpClient) { }

  
  getIngredientes(): Observable<ingredientes[]> 
  {
    return this.http.get<ingredientes[]>('http://192.168.123.110:8000/api/ingredientes/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updateIngrediente(ingrediente: ingredientes, id :number): Observable<ingredientes> {
    return this.http.put<ingredientes>(`http://192.168.123.110:8000/api/ingredienteyordi/update/`+ id, ingrediente)
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
  return this.http.get<ingredientes>('http://192.168.123.110:8000/api/ingredienteyordi/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
eliminarIngrediente(id: number)
{
  return this.http.delete<ingredientes>('http://192.168.123.110:8000/api/ingredienteyordi/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
  

}
