import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-user',
  templateUrl: './side-bar-user.component.html',
  styleUrl: './side-bar-user.component.css',
})
export class SideBarUserComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout;
    this.router.navigateByUrl('');
  }
}
