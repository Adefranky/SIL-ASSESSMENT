import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { DetailsService } from '../details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let detailsService: jasmine.SpyObj<DetailsService>;
  let router: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const detailsServiceSpy = jasmine.createSpyObj('DetailsService', ['getUser', 'getUserAlbums']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'), // Mock userId
        },
      },
    } as any;

    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DetailsService, useValue: detailsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    detailsService = TestBed.inject(DetailsService) as jasmine.SpyObj<DetailsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Default mock values
    detailsService.getUser.and.returnValue(of({ id: 1, name: 'John Doe' }));
    detailsService.getUserAlbums.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123456789', website: 'johndoe.com' };
    detailsService.getUser.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(detailsService.getUser).toHaveBeenCalledOnceWith(1);
    expect(component.user).toEqual(mockUser);
  });

  it('should handle error when fetching user details', () => {
    detailsService.getUser.and.returnValue(throwError(() => new Error('User fetch failed')));
    const consoleSpy = spyOn(console, 'error'); // Spy on console.error to capture error

    fixture.detectChanges();

    expect(detailsService.getUser).toHaveBeenCalledOnceWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error)); // Ensure the error is logged to the console
  });

  it('should fetch user albums on init', () => {
    const mockAlbums = [
      { id: 1, title: 'Album 1', userId: 1 },
      { id: 2, title: 'Album 2', userId: 1 },
    ];
    detailsService.getUserAlbums.and.returnValue(of(mockAlbums));

    fixture.detectChanges();

    expect(detailsService.getUserAlbums).toHaveBeenCalledOnceWith(1);
    expect(component.albums).toEqual(mockAlbums);
  });

  it('should handle error when fetching user albums', () => {
    detailsService.getUserAlbums.and.returnValue(throwError(() => new Error('Albums fetch failed')));
    const consoleSpy = spyOn(console, 'error'); // Spy on console.error to capture error

    fixture.detectChanges();

    expect(detailsService.getUserAlbums).toHaveBeenCalledOnceWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error)); // Ensure the error is logged to the console
  });

  it('should navigate to the dashboard when goToDashboard is called', () => {
    component.goToDashboard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should render user details and albums in the template', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123456789', website: 'johndoe.com' };
    const mockAlbums = [
      { id: 1, title: 'Album 1', userId: 1 },
      { id: 2, title: 'Album 2', userId: 1 },
    ];
    detailsService.getUser.and.returnValue(of(mockUser));
    detailsService.getUserAlbums.and.returnValue(of(mockAlbums));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h2').textContent).toContain(mockUser.name);
    expect(compiled.querySelector('p strong').textContent).toContain('Email:');
    expect(compiled.querySelectorAll('ul li').length).toBe(mockAlbums.length);
    expect(compiled.querySelector('ul li strong').textContent).toContain(mockAlbums[0].title);
  });
});
