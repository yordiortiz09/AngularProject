import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public API_URL = 'http://192.168.114.177:3333/api';
  public API_CHEF='http://192.168.114.177:3333/chef';
  public API_PLATO='http://192.168.114.177:3333/plato';
  public API_INGREDIENTE='http://192.168.114.177:3333/ingrediente';
  public API_RECETA='http://192.168.114.177:3333/receta'
  public API_CONDUCTOR='http://192.168.114.177:3333/conductor'


  public API_URL2 = 'http://192.168.114.177:3333'
  

 
}
