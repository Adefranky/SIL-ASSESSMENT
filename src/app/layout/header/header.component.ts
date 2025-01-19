import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Define properties
  profileImageUrl: string | null = null;
  businessForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the businessForm with form controls
    this.businessForm = this.fb.group({
      businessName: [''],
      businessEmail: [''],
      contact: [''],
      businessAddress: ['']
    });
  }

  // Method to toggle sidebar (example)
  toggleSidebar(): void {
    console.log('Sidebar toggled');
  }

  // Method to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      // Handle the file (e.g., upload or display it)
      console.log(file);
    }
  }

  // Methods to handle mouse enter and leave events (hover effect)
  onMouseEnter(): void {
    console.log('Mouse entered header');
  }

  onMouseLeave(): void {
    console.log('Mouse left header');
  }
}
