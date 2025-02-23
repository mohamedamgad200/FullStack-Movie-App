import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private foemBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  loginForm = this.foemBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  login() {
    let value = this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('email', result.email);
        localStorage.setItem('role', result.role);
        localStorage.setItem('id', result.id);
        if (result.role === 'ADMIN') {
          this.showToast('Account logged successfully!', 'success');
          this.router.navigateByUrl('/dashboard');
        } else if (result.role === 'USER') {
          this.showToast('Account logged successfully!', 'success');
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        this.showToast('Failed to logged user.', 'error');
        console.error(error);
      }
    );
  }
  showToast(message: string, type: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}
