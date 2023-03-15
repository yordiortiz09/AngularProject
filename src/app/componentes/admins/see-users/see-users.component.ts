import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user.interface';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditUserDialogComponent } from 'src/app/componentes/edit-user-dialog/edit-user-dialog.component';


@Component({
  selector: 'app-see-users',
   templateUrl: './see-users.component.html',
  styleUrls: ['./see-users.component.css']
})
export class SeeUsersComponent {
  id: number = 0;
  users: User[] = [];
  isDialogOpen = false;
  statusFilter: string = '';

  
  

  constructor(private authService: AuthService,private sharedService: SharedServiceService,private router:Router, private http: HttpClient, private matDialog: MatDialog) { }
  
    
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  filterUsers() {
    if (this.statusFilter === '') {
      this.loadUsers();
    } else {
      this.authService.getUsers().subscribe((users) => {
        this.users = users.filter(user => user.status.toString() === this.statusFilter);
      });
    }
  }
  

  openEditDialog(user: User) {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
  
      const dialogRef = this.matDialog.open(EditUserDialogComponent, {
        data: { user: user },
        width: '450px',
        height: '250px'
      });
  
      dialogRef.afterClosed().subscribe((result: User) => {
        this.isDialogOpen = false;
  
        if (result) {
          // Actualizar los datos del usuario
          Object.assign(user, result);
        }
      });
    }
  }
  onDelete(id: number, rol_id: number)
  {
    if(rol_id == 1)
    {
      alert("No puedes eliminar un administrador");
    }

    else
    {
      if(confirm("¿Estás seguro de que quieres eliminar este usuario?"))
      {
        this.authService.deleteUser(id).subscribe(data => {
          location.reload();
        });
      }
    }
}



}


