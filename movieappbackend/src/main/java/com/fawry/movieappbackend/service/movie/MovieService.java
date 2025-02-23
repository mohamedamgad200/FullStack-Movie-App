package com.fawry.movieappbackend.service.movie;

import com.fawry.movieappbackend.dto.movie.MovieOMDBAPI;
import com.fawry.movieappbackend.dto.movie.MovieRequest;
import com.fawry.movieappbackend.dto.movie.MovieResponse;
import com.fawry.movieappbackend.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface MovieService {
    public ResponseEntity<MovieResponse> addMovie(MovieRequest movieRequest);
    public ResponseEntity<MovieResponse> updateMovie(int id,MovieRequest movieRequest);
    public ResponseEntity<Map<String, String>> deleteMovie(int id);
    public ResponseEntity<Map<String,String>>deleteAllMovies(List<Integer> movieIds);
    public ResponseEntity<List<MovieResponse>>addMovies(List<MovieRequest>moviesRequested);
    public ResponseEntity<List<MovieResponse>>getAllMovies();
    public ResponseEntity<MovieResponse> getMovieById(int id);
    public ResponseEntity<Object> getMovies(String title);
    public ResponseEntity<List<MovieResponse>>findMoviesByTitle(String title);
    public Page<MovieResponse> getAllMoviesByPagination(int page, int size);
}
