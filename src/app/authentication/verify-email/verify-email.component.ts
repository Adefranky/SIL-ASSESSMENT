import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {

  message = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }



  sendVerificationEmail() {
    this.isLoading = true;
    this.auth.sendVerificationEmail().then(() => {
      this.message = 'Link has been sent to your email. Kindly login to verify your email.';
      this.isLoading = false;
    }).catch(error => {
      this.message = 'Failed to send verification email. Try again later.';
      this.isLoading = false;
      console.error(error);
    });
  }
}
