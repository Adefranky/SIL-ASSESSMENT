import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DetailsService } from './details.service';

describe('DetailsService', () => {
  let service: DetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailsService],
    });

    service = TestBed.inject(DetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests remain
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user details', () => {
    const userId = 1;
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

    service.getUser(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch user albums', () => {
    const userId = 1;
    const mockAlbums = [
      { id: 1, title: 'Album 1', userId: 1 },
      { id: 2, title: 'Album 2', userId: 1 },
    ];

    service.getUserAlbums(userId).subscribe((albums) => {
      expect(albums.length).toBe(2);
      expect(albums).toEqual(mockAlbums);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${userId}/albums`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbums);
  });

  it('should handle error when fetching user details', () => {
    const userId = 1;
    const errorMessage = 'Failed to fetch user details';

    service.getUser(userId).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${userId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when fetching user albums', () => {
    const userId = 1;
    const errorMessage = 'Failed to fetch user albums';

    service.getUserAlbums(userId).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${userId}/albums`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
