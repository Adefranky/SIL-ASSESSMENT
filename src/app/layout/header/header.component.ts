import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() sidebarToggle = new EventEmitter<void>();

  profileImageUrl: string | null = null;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userName: [''],
      userEmail: [''],
      userContact: [''],
      userAddress: ['']
    });
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      console.log('File selected:', file);
    }
  }
}
