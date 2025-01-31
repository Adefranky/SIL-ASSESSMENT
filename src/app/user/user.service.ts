
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface UserWithAlbumCount extends User {
  albumCount: number;
}

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

  getUsersWithAlbums(): Observable<UserWithAlbumCount[]> {
    return forkJoin({
      users: this.http.get<User[]>(this.usersUrl).pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      ),
      albums: this.http.get<Album[]>(this.albumsUrl).pipe(
        catchError(error => {
          console.error('Error fetching albums:', error);
          return of([]);
        })
      ),
    }).pipe(
      map(({ users, albums }) => {
        return users.map((user): UserWithAlbumCount => ({
          ...user,
          albumCount: albums.filter((album) => album.userId === user.id).length,
        }));
      })
    );
  }
}