import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedMovies } from '../../models/paginatedmovies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  totalElements = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

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
}
