import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/authentication/login']);
    });
  }

  // Register Method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registered Successfully');
      this.router.navigate(['authentication/login']);
      this.sendVerificationEmail();
    }, err => {
      alert(err.message);
      this.router.navigate(['authentication/signin']);
    });
  }

  // Sign Out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['authentication/login']);
    }, err => {
      alert(err.message);
    });
  }

  // Forgot Password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['authentication/verify-email']);
    }, () => {
      console.log('something went wrong');
    });
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Check if token exists in local storage
  }

  // Email Verification
  sendVerificationEmail() {
    return this.fireauth.currentUser.then(user => {
      return user?.sendEmailVerification();
    });
  }

  // Signin With Google
  signInWithGoogle() {
    return this.fireauth
      .signInWithPopup(new GoogleAuthProvider())
      .then(result => {
        console.log('Google login successful:', result);
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        console.error('Google login error:', error);
      });
  }
}
