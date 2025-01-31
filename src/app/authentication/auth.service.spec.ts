import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';

describe('AuthService', () => {
  let service: AuthService;
  let fireAuthSpy: jasmine.SpyObj<AngularFireAuth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const fireAuthMock = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'createUserWithEmailAndPassword',
      'signOut',
      'sendPasswordResetEmail',
      'currentUser',
      'signInWithPopup',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: fireAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
    fireAuthSpy = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should navigate to dashboard on successful login', async () => {
      fireAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.resolve({} as firebase.auth.UserCredential));

      await service.login('test@example.com', 'password');

      expect(localStorage.getItem('token')).toBe('true');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
    });

    it('should navigate to login on login failure', async () => {
      fireAuthSpy.signInWithEmailAndPassword.and.returnValue(
        Promise.reject(new Error('Login failed'))
      );

      try {
        await service.login('test@example.com', 'wrongpassword');
      } catch {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/authentication/login']);
      }
    });
  });

  describe('register', () => {
    it('should navigate to login and send verification email on successful registration', async () => {
      fireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({} as firebase.auth.UserCredential));
      spyOn(service, 'sendVerificationEmail').and.returnValue(Promise.resolve());

      await service.register('test@example.com', 'password');

      expect(routerSpy.navigate).toHaveBeenCalledWith(['authentication/login']);
      expect(service.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should navigate to signin on registration failure', async () => {
      fireAuthSpy.createUserWithEmailAndPassword.and.returnValue(
        Promise.reject(new Error('Registration failed'))
      );

      try {
        await service.register('test@example.com', 'password');
      } catch {
        expect(routerSpy.navigate).toHaveBeenCalledWith(['authentication/signin']);
      }
    });
  });

  describe('logout', () => {
    it('should remove token and navigate to login on logout', async () => {
      fireAuthSpy.signOut.and.returnValue(Promise.resolve());

      await service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['authentication/login']);
    });

    it('should display an alert on logout failure', async () => {
      spyOn(window, 'alert');
      fireAuthSpy.signOut.and.returnValue(Promise.reject(new Error('Logout failed')));

      try {
        await service.logout();
      } catch {
        expect(window.alert).toHaveBeenCalledWith('Logout failed');
      }
    });
  });

  describe('forgotPassword', () => {
    it('should navigate to verify-email on successful password reset', async () => {
      fireAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.resolve());

      await service.forgotPassword('test@example.com');

      expect(routerSpy.navigate).toHaveBeenCalledWith(['authentication/verify-email']);
    });

    it('should log an error on password reset failure', async () => {
      spyOn(console, 'log');
      fireAuthSpy.sendPasswordResetEmail.and.returnValue(
        Promise.reject(new Error('Password reset failed'))
      );

      try {
        await service.forgotPassword('test@example.com');
      } catch {
        expect(console.log).toHaveBeenCalledWith('something went wrong');
      }
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token exists in localStorage', () => {
      localStorage.setItem('token', 'true');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if token does not exist in localStorage', () => {
      localStorage.removeItem('token');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification email to the user', async () => {
      const mockUser = { sendEmailVerification: jasmine.createSpy() } as unknown as firebase.User;
      fireAuthSpy.currentUser = Promise.resolve(mockUser);

      await service.sendVerificationEmail();

      expect(mockUser.sendEmailVerification).toHaveBeenCalled();
    });
  });

  describe('signInWithGoogle', () => {
    it('should log in with Google and navigate to dashboard', async () => {
      fireAuthSpy.signInWithPopup.and.returnValue(Promise.resolve({} as firebase.auth.UserCredential));

      await service.signInWithGoogle();

      expect(localStorage.getItem('token')).toBe('true');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
    });

    it('should log an error on Google login failure', async () => {
      spyOn(console, 'error');
      fireAuthSpy.signInWithPopup.and.returnValue(
        Promise.reject(new Error('Google login failed'))
      );

      try {
        await service.signInWithGoogle();
      } catch {
        expect(console.error).toHaveBeenCalledWith('Google login error:', new Error('Google login failed'));
      }
    });
  });
});