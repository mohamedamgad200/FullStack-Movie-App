import { Component } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedMovies } from '../../../models/paginatedmovies';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent {
  movies: Movie[] = [];
  selectedMovieIds: number[] = [];
  totalElements = 0;
  pageSize = 5;
  currentPage = 0;
  // ngOnInit(): void {
  //   this.movieService.getMovies().subscribe(
  //     (result) => (this.movies = result),
  //     (error) => alert('error')
  //   );
  // }
  ngOnInit(): void {
    this.loadMovies();
  }
  constructor(
    private movieService: MoviesService,
    private snackBar: MatSnackBar
  ) {}
  loadMovies() {
    this.movieService
      .getMoviesPaginated(this.currentPage, this.pageSize)
      .subscribe(
        (response: PaginatedMovies) => {
          this.movies = response.content;
          this.totalElements = response.totalElements;
        },
        () => alert('Failed to load movies.')
      );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies();
  }
  showToast(message: string, type: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
  onSelectionChange(movieId: number) {
    if (movieId > 0) {
      if (!this.selectedMovieIds.includes(movieId)) {
        this.selectedMovieIds.push(movieId);
      }
    } else {
      const idToRemove = Math.abs(movieId);
      this.selectedMovieIds = this.selectedMovieIds.filter(
        (id) => id !== idToRemove
      );
    }
  }
  deleteSelectedMovies() {
    if (this.selectedMovieIds.length === 0) return;

    if (
      confirm(
        `Are you sure you want to delete ${this.selectedMovieIds.length} movies?`
      )
    ) {
      this.movieService.deleteMoviesBatch(this.selectedMovieIds).subscribe(
        () => {
          this.movies = this.movies.filter(
            (m) => !this.selectedMovieIds.includes(m.id)
          );
          this.selectedMovieIds = [];
          this.showToast('Selected movies deleted successfully.', 'success');
        },
        () => this.showToast('Failed to delete selected movies.', 'error')
      );
    }
  }
}
