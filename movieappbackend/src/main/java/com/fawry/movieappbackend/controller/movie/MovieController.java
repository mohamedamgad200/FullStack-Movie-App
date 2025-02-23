package com.fawry.movieappbackend.controller.movie;

import com.fawry.movieappbackend.dto.movie.MovieOMDBAPI;
import com.fawry.movieappbackend.dto.movie.MovieRequest;
import com.fawry.movieappbackend.dto.movie.MovieResponse;
import com.fawry.movieappbackend.dto.movie.OMDBResponse;
import com.fawry.movieappbackend.entity.Movie;
import com.fawry.movieappbackend.service.movie.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MovieResponse> addMovie(@Valid @RequestBody MovieRequest movieRequest) {
        return movieService.addMovie(movieRequest);
    }
    @PostMapping("/addBatched")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MovieResponse>> addMovies(
            @Valid @RequestBody List<MovieRequest> moviesRequest) {
        return movieService.addMovies(moviesRequest);
    }

    @GetMapping("/omdb")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> getAllMovie(@RequestParam String title) {
        return movieService.getMovies(title);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteMovie(@PathVariable int id) {
        return movieService.deleteMovie(id);
    }
    @DeleteMapping("/deleteBatched")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteAllMovies(@Valid @RequestBody Map<String, List<Integer>> request) {
        List<Integer> movieIds = request.get("movieIds");

        if (movieIds == null || movieIds.isEmpty()) {
            throw new IllegalArgumentException("No movie IDs provided for deletion.");
        }
        return movieService.deleteAllMovies(movieIds);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MovieResponse> updateMovie(@PathVariable int id, @RequestBody MovieRequest movieRequest) {
        return movieService.updateMovie(id, movieRequest);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<MovieResponse>> getAllMovie() {

        return movieService.getAllMovies();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovieById(@PathVariable int id) {
        return movieService.getMovieById(id);
    }

    @GetMapping("/getAllPaginatedMovies")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Page<MovieResponse>> getAllPaginatedMovies(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {

        return new ResponseEntity<>(movieService.getAllMoviesByPagination(page, size), HttpStatus.OK);

    }
    @GetMapping("/getBytitle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MovieResponse>> getMovieByTitle(@RequestParam String title) {
        return movieService.findMoviesByTitle(title);
    }
}
