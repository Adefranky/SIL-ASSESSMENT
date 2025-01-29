import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signInWithGoogle']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when filled with correct data', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should show an error if form is invalid and submit is clicked', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    spyOn(window, 'alert');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields correctly.');
  });

  it('should call login method of AuthService on valid form submission', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should not call login if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should toggle password visibility when the button is clicked', () => {
    expect(component.hidePassword).toBeTrue();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.hidePassword).toBeFalse();
  });

  it('should call signInWithGoogle when the Google login button is clicked', () => {
    authServiceSpy.signInWithGoogle.and.returnValue(Promise.resolve());

    const googleButton = fixture.nativeElement.querySelector('.google-button');
    googleButton.click();

    expect(authServiceSpy.signInWithGoogle).toHaveBeenCalled();
  });

  it('should navigate to dashboard after successful Google login', async () => {
    authServiceSpy.signInWithGoogle.and.returnValue(Promise.resolve());

    await component.signInWithGoogle();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle Google login error', async () => {
    // Arrange: Simulate the Google login rejection
    const errorMessage = 'Google login failed';
    authServiceSpy.signInWithGoogle.and.returnValue(Promise.reject(errorMessage));

    // Spy on console.error
    const consoleErrorSpy = spyOn(console, 'error');

    // Act: Call the function and wait for the rejection to be handled
    await component.signInWithGoogle();

    // Assert: Ensure the error is logged correctly
    expect(consoleErrorSpy).toHaveBeenCalledWith('Google login error:', errorMessage);
  });


});
