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


  // getJugadores(): Observable<Chef[]> 
  // {
  //   return this.http.get<Chef[]>('http://127.0.0.1:8000/api/chef')
  //   .pipe(
  //     retry(3),
  //     catchError(this.handleError)
  //   );
  // }
 
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
  updateChef(chef: Chef): Observable<Chef> {
    return this.http.put<Chef>(`http://chef/updateyordi/'${chef.id}`, chef)
    .pipe(
      catchError(error => {
        this.message='Ocurrio un error';
        return throwError(error)
      }
      )
    )
}
}