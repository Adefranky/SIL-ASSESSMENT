import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['forgotPassword']);

    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email is entered correctly', () => {
    const emailControl = component.forgotPasswordForm.controls['email'];

    emailControl.setValue('test@example.com');

    expect(emailControl.valid).toBeTrue();
  });

  it('should show an error if email is invalid and submit is clicked', () => {
    const emailControl = component.forgotPasswordForm.controls['email'];
    emailControl.setValue('');
    const consoleSpy = spyOn(console, 'log');

    component.submitRequest();

    expect(consoleSpy).toHaveBeenCalledWith('Invalid email input');
  });

  it('should call forgotPassword method of AuthService when the form is valid', () => {
    const emailControl = component.forgotPasswordForm.controls['email'];
    emailControl.setValue('test@example.com');

    component.submitRequest();

    expect(authServiceSpy.forgotPassword).toHaveBeenCalledWith('test@example.com');
  });

  it('should not call forgotPassword method of AuthService when the form is invalid', () => {
    const emailControl = component.forgotPasswordForm.controls['email'];
    emailControl.setValue('');

    component.submitRequest();

    expect(authServiceSpy.forgotPassword).not.toHaveBeenCalled();
  });
});
