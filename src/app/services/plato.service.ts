import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Platos } from '../Interfaces/tiposPlato.interface';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  message: string = '';

  constructor(private http:HttpClient) { }

  getPlatos(): Observable<Platos[]> 
  {
    return this.http.get<Platos[]>('http://192.168.123.110:8000/api/tipo_platoyoerdi/info')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updatePlatos(plato: Platos, id :number): Observable<Platos> {
    return this.http.put<Platos>(`http://192.168.123.110:8000/api/tipo_platoyordi/update/`+ id, plato)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarPlato(id: number)
{
  return this.http.get<Platos>('http://192.168.123.110:8000/api/tipo_platoyordi/info' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
eliminarPlato(id: number)
{
  return this.http.delete<Platos>('http://192.168.123.110:8000/api/tipo_platoyordi/delete' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}
}
