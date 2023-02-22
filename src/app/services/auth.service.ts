import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/registro';
  private apiUrl2 = 'http://127.0.0.1:8000/api/user';
  private apiUrl3 = 'http://127.0.0.1:8000/api';
  private token: string | null = null;
  private rol_id: number | null = null;
  isValid(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  verifyToken(token: string) {
    return this.http.get<boolean>(`${this.apiUrl3}/verifyToken`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

  login(user: User)
  {
      return this.http.post<User>(this.apiUrl, user)
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