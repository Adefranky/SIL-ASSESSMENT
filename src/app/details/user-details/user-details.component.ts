import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  user: any;
  albums: any[] = [];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: DetailsService
  ) { }

  ngOnInit(): void {
    // Get the user ID from the URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch user details
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
    });

    // Fetch user albums
    this.userService.getUserAlbums(this.userId).subscribe(albums => {
      this.albums = albums;
    });
  }
}
