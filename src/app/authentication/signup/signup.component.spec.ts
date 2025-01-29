import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when filled correctly', () => {
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password123');
    expect(component.signupForm.valid).toBeTrue();
  });

  it('should display an error message when form is invalid and submit is clicked', () => {
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');

    spyOn(window, 'alert');
    component.postData();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields correctly.');
  });

  it('should call register method of AuthService on valid form submission', () => {
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password123');
    component.postData();
    expect(authServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should toggle password visibility on button click', () => {
    expect(component.hidePassword).toBeTrue();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.hidePassword).toBeFalse();
  });

  it('should not call register if form is invalid', () => {
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');

    component.postData();

    expect(authServiceSpy.register).not.toHaveBeenCalled();
  });
});
