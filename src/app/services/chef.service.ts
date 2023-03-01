import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Chef } from '../Interfaces/chef.interface';

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  message: string = '';
  

  constructor(private http:HttpClient) { }


  getChefs(): Observable<Chef[]> 
  {
    return this.http.get<Chef[]>('http://127.0.0.1:8000/api/chef/infoyordi')
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      })
      
    )
  }
  updateChef(chef: Chef, id :number): Observable<Chef> {
    return this.http.put<Chef>(`http://127.0.0.1:8000/api/chef/updateyordi/`+ id, chef)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
mostrarChef(id: number)
{
  return this.http.get<Chef>('http://127.0.0.1:8000/api/chef/infoyordi' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}

eliminarChef(id: number)
{
  return this.http.delete<Chef>('http://127.0.0.1:8000/api/chef/deleteyordi' + '/' + id)
  .pipe(
    catchError(error => {
      this.message='Ocurrio un error';
      return throwError(error)
    })
  )
}

}