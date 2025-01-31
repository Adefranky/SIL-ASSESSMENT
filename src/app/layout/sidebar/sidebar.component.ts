import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarVisible = true;
  isHidden1 = true;
  isHidden3 = true;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


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
