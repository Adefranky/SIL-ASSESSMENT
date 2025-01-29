import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlbumDetailsComponent } from './album-details.component';
import { AlbumService } from '../album.service';

describe('AlbumDetailsComponent', () => {
  let component: AlbumDetailsComponent;
  let fixture: ComponentFixture<AlbumDetailsComponent>;
  let mockAlbumService: jasmine.SpyObj<AlbumService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockAlbumService = jasmine.createSpyObj('AlbumService', ['getAlbum', 'getAlbumPhotos']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Provide default return values to avoid undefined errors
    mockAlbumService.getAlbum.and.returnValue(of({ id: 1, title: 'Test Album', userId: 1 }));
    mockAlbumService.getAlbumPhotos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [AlbumDetailsComponent],
      providers: [
        { provide: AlbumService, useValue: mockAlbumService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should fetch album details on init', () => {
    const mockAlbum = { id: 1, title: 'Test Album', userId: 1 };
    mockAlbumService.getAlbum.and.returnValue(of(mockAlbum));
    mockAlbumService.getAlbumPhotos.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.album).toEqual(mockAlbum);
    expect(mockAlbumService.getAlbum).toHaveBeenCalledWith(1);
  });

  it('should handle error when fetching album details', () => {
    mockAlbumService.getAlbum.and.returnValue(throwError(() => new Error('Fetch error')));
    spyOn(console, 'error');

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error fetching album:', jasmine.any(Error));
  });
});
