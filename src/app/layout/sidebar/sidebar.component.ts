import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarVisible = true; // Controls visibility of the sidebar
  isHidden1 = true; // Controls visibility of the first collapsible section
  isHidden3 = true; // Controls visibility of the second collapsible section

  toggleMenu(menu: string) {
    if (menu === 'isHidden1') {
      this.isHidden1 = !this.isHidden1;
    } else if (menu === 'isHidden3') {
      this.isHidden3 = !this.isHidden3;
    }
  }

  // Additional methods like 'signOut()' can be defined as needed
}
