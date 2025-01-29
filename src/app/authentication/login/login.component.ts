import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log('Logging in:', { email, password });

    this.auth.login(email, password);
  }
  async signInWithGoogle() {
    try {
      await this.auth.signInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

}
