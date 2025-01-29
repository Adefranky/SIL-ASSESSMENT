import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sidebarToggleEmitter: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatMenuModule, MatIconModule, MatButtonModule],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sidebarToggleEmitter = spyOn(component.sidebarToggle, 'emit');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sidebarToggle event when toggleSidebar is called', () => {
    component.toggleSidebar();
    expect(sidebarToggleEmitter).toHaveBeenCalled();
  });

  it('should handle file selection correctly in onFileSelected', () => {
    const event = {
      target: {
        files: [new File([''], 'test-image.jpg', { type: 'image/jpeg' })],
      },
    } as any;

    const consoleSpy = spyOn(console, 'log');
    component.onFileSelected(event);

    expect(consoleSpy).toHaveBeenCalledWith('File selected:', event.target.files[0]);
  });

  it('should display profile image when profileImageUrl is set', () => {
    const testImageUrl = 'assets/profile.jpg';
    component.profileImageUrl = testImageUrl;
    fixture.detectChanges();

    const profileImage = fixture.debugElement.query(By.css('.profile-img'));
    expect(profileImage).toBeTruthy();
    expect(profileImage.nativeElement.src).toContain(testImageUrl);
  });

  it('should not display profile image when profileImageUrl is null', () => {
    component.profileImageUrl = null;
    fixture.detectChanges();

    const profileImage = fixture.debugElement.query(By.css('.profile-img'));
    expect(profileImage).toBeFalsy();
  });

  it('should display user information from the form fields', () => {
    component.userForm.setValue({
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      userContact: '123-456-7890',
      userAddress: '123 Main St',
    });
    fixture.detectChanges();

    const userName = fixture.debugElement.query(By.css('.user-name')).nativeElement;
    const userEmail = fixture.debugElement.query(By.css('.user-email')).nativeElement;
    const userContact = fixture.debugElement.query(By.css('.user-contact')).nativeElement;
    const userAddress = fixture.debugElement.query(By.css('.user-address')).nativeElement;

    expect(userName.textContent.trim()).toBe('John Doe');
    expect(userEmail.textContent.trim()).toBe('john.doe@example.com');
    expect(userContact.textContent.trim()).toBe('123-456-7890');
    expect(userAddress.textContent.trim()).toBe('123 Main St');
  });
});
