import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailsComponent } from '../../photo/photo-details/photo-details.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  users: any[] = [];
  loading = true;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsersWithAlbums().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    );
  }

  // View user details
  viewUser(user: any): void {
    this.router.navigate(['albums/albums', user.id]); // Navigate to a user details page
  }

  // Edit user details
  // editUser(user: any): void {
  //   this.router.navigate(['photo/photo', user.id]); // Navigate to an edit form
  // }

  // Open Photo Details in Dialog
  editUser(user: any): void {
    this.dialog.open(PhotoDetailsComponent, {
      width: '600px',
      height: '500px',
      data: { userId: user.id }
    });
  }

  // Edit user details
  userDetails(user: any): void {
    this.router.navigate(['details/user-details', user.id]); // Navigate to an edit form
  }
}
