import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarVisible = true; // Controls visibility of the sidebar
  isHidden1 = true; // Controls visibility of the first collapsible section
  isHidden3 = true; // Controls visibility of the second collapsible section
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  toggleMenu(menu: string) {
    if (menu === 'isHidden1') {
      this.isHidden1 = !this.isHidden1;
    } else if (menu === 'isHidden3') {
      this.isHidden3 = !this.isHidden3;
    }
  }

  logout() {
    this.auth.logout();
  }
}
