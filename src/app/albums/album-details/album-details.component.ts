import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  album: any;
  photos: any[] = [];
  albumId!: number;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
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

  photoLoadError(event: any) {
    event.target.src = 'assets/default-image.png';
  }

}
