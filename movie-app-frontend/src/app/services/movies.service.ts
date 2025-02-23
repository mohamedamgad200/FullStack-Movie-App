import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginatedMovies } from '../models/paginatedmovies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.API_URL + '/movie/all');
  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(environment.API_URL + `/movie/${id}`);
  }
  getMoviesByTitle(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      environment.API_URL + `/movie/getBytitle?title=${title}`
    );
  }
  getMoviesFromOmdb(title: String): Observable<any> {
    return this.http.get<any>(
      `https://www.omdbapi.com/?apikey=87ea7367&s=${title}`
    );
  }
  getMoviesFromOmdbBYID(id: String): Observable<any> {
    return this.http.get<any>(
      `https://www.omdbapi.com/?apikey=87ea7367&i=${id}`
    );
  }
  addMovie(movie: any) {
    return this.http.post(environment.API_URL + '/movie/add', {
      title: movie.Title,
      description: movie.Plot,
      genre: movie.Genre,
      director: movie.Director,
      year: movie.Year,
      poster: movie.Poster,
    });
  }
  deleteMovie(id: number) {
    return this.http.delete(environment.API_URL + `/movie/delete/${id}`);
  }
  addMoviesBatched(moviesList: any[]) {
    return this.http.post(
      environment.API_URL + '/movie/addBatched',
      moviesList
    );
  }
  deleteMoviesBatch(selectedMovieIds: number[]) {
    return this.http.delete(environment.API_URL + '/movie/deleteBatched', {
      body: { movieIds: selectedMovieIds },
    });
  }
  getMoviesPaginated(page: number, size: number): Observable<PaginatedMovies> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PaginatedMovies>(
      `${environment.API_URL}/movie/getAllPaginatedMovies`,
      { params }
    );
  }
}
