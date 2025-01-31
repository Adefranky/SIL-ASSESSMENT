import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  deviceType = 'Web';
  title = 'photoApp';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(() => {
      if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
        this.deviceType = 'Mobile';
      } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
        this.deviceType = 'Tablet';
      } else {
        this.deviceType = 'Web';
      }
      console.log(`Device Type: ${this.deviceType}`);
    });
  }
}
