import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: any;

  constructor(private fireauth: AngularFireAuth, private router: Router) { }
  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/authentication/login']);
    })
  }
  // Register Method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registered Successfully');
      this.router.navigate(['authentication/login'])

    }, err => {
      alert(err.message);
      this.router.navigate(['authentication/signin']);
    }
    )

  }
  // Sign Out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['authentication/login']);
    }, err => {
      alert(err.message);
    })
  }
}
