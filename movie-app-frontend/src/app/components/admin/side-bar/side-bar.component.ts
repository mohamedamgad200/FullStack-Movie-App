import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout;
    this.router.navigateByUrl('');
  }
}
