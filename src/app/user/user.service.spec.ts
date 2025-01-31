import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ];

  const mockAlbums = [
    { userId: 1, id: 1, title: 'Album 1' },
    { userId: 1, id: 2, title: 'Album 2' },
    { userId: 2, id: 3, title: 'Album 3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users with album counts', () => {
    service.getUsersWithAlbums().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].albumCount).toBe(2);
      expect(data[1].albumCount).toBe(1);
    });

    const usersRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(usersRequest.request.method).toBe('GET');
    usersRequest.flush(mockUsers);

    const albumsRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums');
    expect(albumsRequest.request.method).toBe('GET');
    albumsRequest.flush(mockAlbums);
  });
  it('should handle errors gracefully', () => {
    const consoleSpy = spyOn(console, 'error');

    service.getUsersWithAlbums().subscribe({
      next: (data) => {
        expect(data).toEqual([]);
        expect(consoleSpy).toHaveBeenCalled();
      },
      error: () => fail('Expected an empty array, but got an error'),
    });

    const usersRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    usersRequest.error(new ErrorEvent('Network error'));

    const albumsRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums');
    albumsRequest.error(new ErrorEvent('Network error'));
  });

});
