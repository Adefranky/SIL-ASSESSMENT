import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Create a stub component to simulate the routed component
@Component({
  selector: 'app-mock',
  template: `<h1>Hello, {{ title }}</h1>`
})
class MockComponent {
  title = 'photoApp';
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'mock', component: MockComponent },
        ])
      ],
      declarations: [
        AppComponent,
        MockComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'photoApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('photoApp');
  });

  it('should render title from the routed component', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigate(['mock']);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, photoApp');
  });
});
