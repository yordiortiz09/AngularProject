import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-see-users',
  templateUrl: './see-users.component.html',
  styleUrls: ['./see-users.component.css']
})
export class SeeUsersComponent {
  id: number = 0;
  users: User[] = [];

  constructor(private userService: UsersService,private sharedService: SharedServiceService,private router:Router)
  {
    
  }

}
