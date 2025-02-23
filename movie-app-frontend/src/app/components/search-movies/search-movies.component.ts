import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css',
})
export class SearchMoviesComponent {
  searchQuery: string = '';
  movies: Movie[] = [];
  searchPerformed: boolean = false;
  constructor(
    private movieService: MoviesService,
    private snackBar: MatSnackBar
  ) {}
  searchMovies(query?: string): void {
    const title = query || this.searchQuery.trim();
    if (!title) {
      this.showToast('Please enter a movie title to search.', 'error');
      return;
    }

    this.movieService.getMoviesByTitle(title).subscribe(
      (result) => {
        console.log(result);
        this.showToast('Movies fetch successfully!', 'success');
        this.movies = result || [];
        this.searchPerformed = true;
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.showToast('Failed to fetch movies.', 'error');
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
