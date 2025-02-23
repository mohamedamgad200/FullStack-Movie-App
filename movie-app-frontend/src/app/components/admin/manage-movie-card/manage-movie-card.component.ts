import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Movie } from '../../../models/movie';
import { MoviesService } from '../../../services/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-movie-card',
  templateUrl: './manage-movie-card.component.html',
  styleUrl: './manage-movie-card.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ManageMovieCardComponent {
  constructor(
    private movieService: MoviesService,
    private snackBar: MatSnackBar
  ) {}
  @Input() movie!: Movie;
  @Input() isSelected: boolean = false;
  @Output() selectionChange = new EventEmitter<number>();

  toggleSelection(movieId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectionChange.emit(isChecked ? movieId : -movieId);
  }
  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(
      (result) => {
        console.log(result);
        this.showToast('Movie Removed successfully!', 'success');
      },
      (error) => {
        console.log(error);
        this.showToast('Failed to remove movie.', 'error');
      }
    );
  }
  deleteBatched() {}
  showToast(message: string, type: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [type === 'success' ? 'success-snackbar' : 'error-snackbar'],
    });
  }
}
