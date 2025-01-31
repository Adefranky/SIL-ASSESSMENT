import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../authentication/auth.service';
import { MatIconModule } from '@angular/material/icon';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Mock the AuthService using jasmine.SpyObj to get type safety
    authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule],
      declarations: [SidebarComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility for isHidden1', () => {
    expect(component.isHidden1).toBeTrue();
    component.toggleMenu('isHidden1');
    expect(component.isHidden1).toBeFalse();
    component.toggleMenu('isHidden1');
    expect(component.isHidden1).toBeTrue();
  });

  it('should toggle menu visibility for isHidden3', () => {
    expect(component.isHidden3).toBeTrue();
    component.toggleMenu('isHidden3');
    expect(component.isHidden3).toBeFalse();
    component.toggleMenu('isHidden3');
    expect(component.isHidden3).toBeTrue();
  });

  it('should call logout on AuthService when logout is triggered', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
