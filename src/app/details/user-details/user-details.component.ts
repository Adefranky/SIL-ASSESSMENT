import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [

  ]
})
export class UserDetailsComponent implements OnInit {
  user: any;
  albums: any[] = [];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: DetailsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the user ID from the URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch user details
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error(err);
      },
    });

    // Fetch user albums
    this.userService.getUserAlbums(this.userId).subscribe({
      next: (albums) => {
        this.albums = albums;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
