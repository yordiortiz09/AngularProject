import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Chef } from 'src/app/Interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';

@Component({
  selector: 'app-see-chefs',
  templateUrl: './see-chefs.component.html',
  styleUrls: ['./see-chefs.component.css']
})
export class SeeChefsComponent {
  chefs : Chef[] = [];

  constructor(private chefService: ChefService, router:Router)  {}
  ngOnInit() {
    this.getChefs();
  }
  
  getChefs() {
    this.chefService.getChefs().subscribe((chefs)=> 
      this.chefs = chefs);
  }

}
