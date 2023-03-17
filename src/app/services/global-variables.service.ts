import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  constructor(private http: HttpClient, private appRef: ApplicationRef) {}
  public API_URL = 'http://127.0.0.1:3333/api';
  public API_CHEF='http://127.0.0.1:3333/chef';
  public API_PLATO='http://127.0.0.1:3333/plato';
  public API_INGREDIENTE='http://127.0.0.1:3333/ingrediente';
  public API_RECETA='http://127.0.0.1:3333/receta'
  public API_CONDUCTOR='http://127.0.0.1:3333/conductor'


  public API_URL2 = 'http://127.0.0.1:3333'
  

 
}
