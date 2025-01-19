import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }


  // Fetch album details
  getAlbum(albumId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/albums/${albumId}`);
  }

  // Fetch photos for an album
  getAlbumPhotos(albumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/albums/${albumId}/photos`);
  }
  // Fetch a single photo by ID
  getPhoto(photoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/photos/${photoId}`);
  }

  // Update photo title using PATCH request
  updatePhotoTitle(photoId: number, newTitle: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/photos/${photoId}`, { title: newTitle });
  }

}
