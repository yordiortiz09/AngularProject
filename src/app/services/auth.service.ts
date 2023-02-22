import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/registro';
  private apiUrl2 = 'http://127.0.0.1:8000/api/user';
  private token: string | null = null;
  private rol_id: number | null = null;

  constructor(private http: HttpClient) { }


  login(user: User)
  {
      return this.http.post<User>(this.apiUrl, user)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  
  logout(): void {
    this.token = null;
    this.rol_id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  info(id: number)
  {
    return this.http.get<User>(this.apiUrl2 + '/' + id)
    .pipe(
      retry(3),
      catchError(this.handleError)
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