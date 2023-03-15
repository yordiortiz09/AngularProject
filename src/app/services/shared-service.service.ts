import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }
  id: number = 0;
 

  setId(id: number): void {
    this.id = id;
  }

  getId(){
    return this.id;
  }
}
