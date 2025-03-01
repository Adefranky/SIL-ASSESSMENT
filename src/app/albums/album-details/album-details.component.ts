
export interface Album {
  userId: number;
  id: number;
  title: string;
}


export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  album: Album | null = null;
  photos: Photo[] = [];
  albumId!: number;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Get the album ID from the URL
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch album details
    this.albumService.getAlbum(this.albumId).subscribe({
      next: (album) => {
        console.log('Album Data:', album);
        this.album = album;
      },
      error: (err) => console.error('Error fetching album:', err)
    });

    // Fetch album photos
    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (photos) => {
        console.log('Photos Data:', photos);
        this.photos = photos;
      },
      error: (err) => console.error('Error fetching photos:', err)
    });
  }

  photoLoadError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-image.png';
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Navigate to dashboard or previous route
  }
}