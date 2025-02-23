import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
})
export class RateDialogComponent {
  rating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<RateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  submitRating(): void {
    if (this.rating >= 1 && this.rating <= 5) {
      this.dialogRef.close(this.rating);
    } else {
      this.showToast('Please enter a rating between 1 and 5.', 'error');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
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
