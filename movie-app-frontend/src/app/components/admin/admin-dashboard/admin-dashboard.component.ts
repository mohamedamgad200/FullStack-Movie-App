import { Component, OnInit } from '@angular/core';
import { OmdbMovie } from '../../../models/omdb-movie';
import { MoviesService } from '../../../services/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  searchQuery: string = '';
  omdbMovies: OmdbMovie[] = [];
  batchedList: any[] = [];
  searchPerformed: boolean = false;

  constructor(
    private movieService: MoviesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchMovies('funny');
  }

  searchMovies(query?: string): void {
    const title = query || this.searchQuery.trim();
    if (!title) {
      this.showToast('Please enter a movie title to search.', 'error');
      return;
    }

    this.movieService.getMoviesFromOmdb(title).subscribe(
      (result) => {
        console.log(result);
        this.showToast('Movies fetch successfully!', 'success');
        this.omdbMovies = result.Search || [];
        this.searchPerformed = true;
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.showToast('Failed to fetch movies.', 'error');
      }
    );
  }

  addMovie(movie: OmdbMovie): void {
    this.movieService.getMoviesFromOmdbBYID(movie.imdbID).subscribe(
      (result) => {
        console.log(result);
        this.movieService.addMovie(result).subscribe(
          (result) => {
            console.log(result);
            this.showToast('Movies added successfully!', 'success');
          },
          (error) => {
            console.log(error);
            this.showToast('Failed to add movies.', 'error');
          }
        );
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
      panelClass: [type === 'success' ? 'success-snackbar' : 'error-snackbar'],
    });
  }
  addBatch(movie: OmdbMovie) {
    this.movieService.getMoviesFromOmdbBYID(movie.imdbID).subscribe(
      (result) => {
        console.log(result);
        this.batchedList.push({
          title: result.Title,
          description: result.Plot,
          genre: result.Genre,
          director: result.Director,
          year: result.Year,
          poster: result.Poster,
        });
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.showToast('Failed to fetch movies.', 'error');
      }
    );
  }
  applyBatched() {
    this.movieService.addMoviesBatched(this.batchedList).subscribe(
      (result) => {
        console.log(result);
        this.showToast('Movies batch successfully!', 'success');
      },
      (error) => {
        console.log(error);
        this.showToast('Failed to  movie batch.', 'error');
      }
    );
  }
  deleteBatched() {
    this.batchedList.pop();
  }
}
