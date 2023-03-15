import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';
import { GlobalVariablesService } from './global-variables.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userRole: number=0;
  
 
  private token: string | null = null;
  private role: string | null = null;
  
  isValid(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  constructor(private http: HttpClient, private globalVariable: GlobalVariablesService, private router : Router) {}
  
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  verifyToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.globalVariable.API_URL2}/verifyToken`;
  
    return this.http.get<boolean>(url, { headers }).pipe(
      tap(
        (response) => {},
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
  
  async getUserRole() {
    try {
      const response: any = await this.http.get(this.globalVariable.API_URL2 +'/role').toPromise();
      return response.rol_id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  getStatus() {
    try {
      return this.http.get(this.globalVariable.API_URL2+'/status').toPromise();
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol_id');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }
  deleteUser(id: number)
  {
    return this.http.delete(this.globalVariable.API_URL2 + '/user/delete' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  info(id: number)
  {
    return this.http.get<User>(this.globalVariable.API_URL2 +'/user' + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  login(user: User)
  {

      return this.http.post<User>(this.globalVariable.API_URL2 + '/login' , user) 
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
      
  }
  getUsers(): Observable<User[]> 
  {
    return this.http.get<User[]>(this.globalVariable.API_URL2 + '/users')
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  updateUserRoleAndStatus(userId: number, roleId: number, status: boolean): Observable<User> {
    const body = { rol_id: roleId, status: status };
    const url = `${this.globalVariable.API_URL2 + '/user/update'}/${userId}`;
    return this.http.put<User>(url, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert('Error: ' + error.error.message);
          }
          return throwError(error);
        })
      );
  }
  getStatuss(): Observable<User> {
    return this.http.get<User>(`${this.globalVariable.API_URL2}/getStatus`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse)
  {
    if (error.status === 0) {
     
      console.error('Ha ocurrido un error:', error.error);
    } else {
     
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Vuelva a intentar más tarde.'));
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
}