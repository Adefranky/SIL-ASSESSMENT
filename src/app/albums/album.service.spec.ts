import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlbumService } from './album.service';

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
}

describe('AlbumService', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    service = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch album details', () => {
    const albumId = 1;
    const mockAlbum: Album = {
      id: 1,
      title: 'Test Album',
      userId: 1
    };

    service.getAlbum(albumId).subscribe((album) => {
      expect(album).toEqual(mockAlbum);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbum);
  });

  it('should fetch photos for an album', () => {
    const albumId = 1;
    const mockPhotos: Photo[] = [
      {
        id: 1,
        title: 'Photo 1',
        albumId: 1,
        url: 'http://example.com/photo1.jpg',
        thumbnailUrl: 'http://example.com/photo1-thumb.jpg'
      },
      {
        id: 2,
        title: 'Photo 2',
        albumId: 1,
        url: 'http://example.com/photo2.jpg',
        thumbnailUrl: 'http://example.com/photo2-thumb.jpg'
      }
    ];

    service.getAlbumPhotos(albumId).subscribe((photos) => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });

  it('should fetch a single photo by ID', () => {
    const photoId = 1;
    const mockPhoto: Photo = {
      id: 1,
      title: 'Test Photo',
      albumId: 1,
      url: 'http://example.com/photo.jpg',
      thumbnailUrl: 'http://example.com/photo-thumb.jpg'
    };

    service.getPhoto(photoId).subscribe((photo) => {
      expect(photo).toEqual(mockPhoto);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhoto);
  });

  it('should update photo title using PATCH', () => {
    const photoId = 1;
    const newTitle = 'Updated Title';
    const mockResponse: PhotoUpdateResponse = {
      id: 1,
      title: newTitle
    };

    service.updatePhotoTitle(photoId, newTitle).subscribe((response) => {
      // expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ title: newTitle });
    // req.flush(mockResponse);
  });
});