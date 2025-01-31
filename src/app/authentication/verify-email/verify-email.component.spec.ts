import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerifyEmailComponent } from './verify-email.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['sendVerificationEmail']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [VerifyEmailComponent],
      imports: [MatCardModule, MatIconModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendVerificationEmail and update message on success', fakeAsync(() => {
    authServiceSpy.sendVerificationEmail.and.returnValue(Promise.resolve());

    component.sendVerificationEmail();
    tick(); // Simulates passage of time for async operations
    fixture.detectChanges();

    expect(component.message).toBe('Link has been sent to your email. Kindly login to verify your email.');
    expect(component.isLoading).toBeFalse();
  }));

  it('should call sendVerificationEmail and update message on failure', fakeAsync(() => {
    authServiceSpy.sendVerificationEmail.and.returnValue(Promise.reject(new Error('Error')));

    component.sendVerificationEmail();
    tick(); // Simulates passage of time for async operations
    fixture.detectChanges();

    expect(component.message).toBe('Failed to send verification email. Try again later.');
    expect(component.isLoading).toBeFalse();
  }));

  it('should disable the button and show "Sending..." text when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Sending...');
  });

  it('should enable the button and show "Resend Verification Email" text when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalse();
    expect(button.textContent).toContain('Resend Verification Email');
  });
});
