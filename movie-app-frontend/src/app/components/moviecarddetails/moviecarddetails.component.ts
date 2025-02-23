import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../rate-dialog/rate-dialog.component';
import { RateService } from '../../services/rate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-moviecarddetails',
  templateUrl: './moviecarddetails.component.html',
  styleUrl: './moviecarddetails.component.css',
})
export class MoviecarddetailsComponent implements OnInit {
  movie!: Movie;
  constructor(
    private router: Router,
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private rateService: RateService,
    private snackBar: MatSnackBar
  ) {}
  id = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.movieService.getMovieById(this.id).subscribe(
      (result) => {
        this.movie = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  openRateDialog(): void {
    const dialogRef = this.dialog.open(RateDialogComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        console.log(`User rated the movie: ${result}`);
        this.rateService.addRate(this.movie.id, result).subscribe(
          (result) => {
            console.log(result);
            this.showToast('Movies Rated successfully!', 'success');
          },
          (error) => {
            console.log(error);
            this.showToast('Failed to rate movies.', 'error');
          }
        );
      } else {
        console.log('Rating was canceled.');
      }
    });
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
