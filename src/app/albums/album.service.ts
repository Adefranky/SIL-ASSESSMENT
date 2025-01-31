import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoUpdateResponse {
  id: number;
  title: string;
  [key: string]: unknown;
}


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }


  // Fetch album details
  getAlbum(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${albumId}`);
  }

  // Fetch photos for an album
  getAlbumPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/albums/${albumId}/photos`);
  }

  // Fetch a single photo by ID
  getPhoto(photoId: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/${photoId}`);
  }

  // Update photo title using PATCH request
  updatePhotoTitle(photoId: number, newTitle: string): Observable<PhotoUpdateResponse> {
    return this.http.patch<PhotoUpdateResponse>(
      `${this.apiUrl}/photos/${photoId}`,
      { title: newTitle }
    );
  }
}