import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) { }

  getUsersWithAlbums(): Observable<any[]> {
    return forkJoin({
      users: this.http.get<any[]>(this.usersUrl).pipe(catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })),
      albums: this.http.get<any[]>(this.albumsUrl).pipe(catchError(error => {
        console.error('Error fetching albums:', error);
        return of([]);
      })),
    }).pipe(
      map(({ users, albums }) => {
        return users.map((user) => ({
          ...user,
          albumCount: albums.filter((album) => album.userId === user.id).length,
        }));
      })
    );
  }
}
