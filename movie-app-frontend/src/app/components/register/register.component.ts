import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.email!,
          this.registerForm.value.password!,
          'USER'
        )
        .subscribe(
          () => {
            this.showToast('Account created successfully!', 'success');
            this.router.navigate(['/']);
          },
          (error) => {
            this.showToast('Failed to register user.', 'error');
            console.error(error);
          }
        );
    } else {
      this.showToast('Please fill in all fields.', 'warning');
    }
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
