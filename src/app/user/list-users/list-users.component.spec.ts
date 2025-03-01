import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Import the User interface
interface User {
  id: number;
  name: string;
  email: string;
  albumCount?: number;
}

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let userServiceMock: Partial<UserService>;
  let routerMock: Partial<Router>;
  let dialogMock: Partial<MatDialog>;

  beforeEach(async () => {
    userServiceMock = {
      getUsersWithAlbums: jasmine.createSpy('getUsersWithAlbums').and.returnValue(of([
        { id: 1, name: 'John Doe', email: 'john@example.com', albumCount: 3 }
      ]))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    dialogMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userServiceMock.getUsersWithAlbums).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should navigate to user details on viewUser()', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
    component.viewUser(user);
    expect(routerMock.navigate).toHaveBeenCalledWith(['albums/albums', user.id]);
  });

  it('should navigate to dashboard on goToDashboard()', () => {
    component.goToDashboard();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should open edit dialog on editUser()', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
    component.editUser(user);
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should navigate to user details on userDetails()', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
    component.userDetails(user);
    expect(routerMock.navigate).toHaveBeenCalledWith(['details/user-details', user.id]);
  });
});