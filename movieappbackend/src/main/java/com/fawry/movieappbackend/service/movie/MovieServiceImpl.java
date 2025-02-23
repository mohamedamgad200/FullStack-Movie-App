package com.fawry.movieappbackend.service.movie;

import com.fawry.movieappbackend.dto.movie.MovieOMDBAPI;
import com.fawry.movieappbackend.dto.movie.MovieRequest;
import com.fawry.movieappbackend.dto.movie.MovieResponse;
import com.fawry.movieappbackend.dto.movie.OMDBResponse;
import com.fawry.movieappbackend.entity.Movie;
import com.fawry.movieappbackend.exception.NotFoundException;
import com.fawry.movieappbackend.mapper.movie.MovieMapper;
import com.fawry.movieappbackend.repository.movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate;
    @Value("${omdb.api.key}")
    private String API_KEY;
    @Value("${omdb.api.url}")
    private String API_URL;
    @Override
    public ResponseEntity<MovieResponse> addMovie(MovieRequest movierequest) {
        Movie movie = MovieMapper.toMovie(movierequest);
        Movie savedMovie = movieRepository.save(movie);
        return new ResponseEntity<>(MovieMapper.toMovieResponse(savedMovie), HttpStatus.CREATED);
    }
    @Override
    public ResponseEntity<MovieResponse> getMovieById(int id) {
        movieRepository.findById(id).orElseThrow(()->new NotFoundException("Movie not found"));
        return new ResponseEntity<>(MovieMapper.toMovieResponse(movieRepository.findById(id).get()), HttpStatus.OK);
    }
    @Override
    public ResponseEntity<MovieResponse> updateMovie(int id,MovieRequest movieRequest) {
        Movie movieFounded = movieRepository.findById(id).orElseThrow(()->new NotFoundException("Movie not found"));
        Movie movie = MovieMapper.toMovie(movieRequest);
        if (movieRequest.getDirector() != null) {
            movieFounded.setDirector(movieRequest.getDirector());
        }
        if (movieRequest.getPoster() != null) {
            movieFounded.setPoster(movieRequest.getPoster());
        }
        if (movieRequest.getTitle() != null) {
            movieFounded.setTitle(movieRequest.getTitle());
        }
        if (movieRequest.getYear() != null) {
            movieFounded.setYear(movieRequest.getYear());
        }
        if (movieRequest.getGenre() != null) {
            movieFounded.setGenre(movieRequest.getGenre());
        }
        if (movieRequest.getDescription() != null) {
            movieFounded.setDescription(movieRequest.getDescription());
        }
        Movie updatedMovie=movieRepository.save(movieFounded);
        return new ResponseEntity<>(MovieMapper.toMovieResponse(updatedMovie), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<String, String>> deleteMovie(int id) {
        movieRepository.findById(id).orElseThrow(()->new NotFoundException("Movie not found"));
        movieRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Movie Deleted Successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<String, String>> deleteAllMovies(List<Integer> movieIds) {
        if(movieIds!=null || movieIds.isEmpty()){
            movieRepository.deleteAllById(movieIds);
        }
        else
        {
            throw new IllegalArgumentException("No movie IDs provided for deletion.");
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Movie List Deleted Successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MovieResponse>> addMovies(List<MovieRequest> moviesRequested) {
        List<Movie>movies=moviesRequested.stream().map(MovieMapper::toMovie).toList();
        List<Movie>savedMovies=movieRepository.saveAll(movies);
        List<MovieResponse>moviesResponse=savedMovies.stream().map(MovieMapper::toMovieResponse).toList();
        return new ResponseEntity<>(moviesResponse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<MovieResponse>>getAllMovies() {
        List<Movie> movies = movieRepository.findAll();

        List<MovieResponse> movieResponses =
                movies.stream().map(MovieMapper::toMovieResponse).collect(Collectors.toList());
        return new ResponseEntity<>(movieResponses,HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Object> getMovies(String title) {
        String url = String.format("%s/?s=%s&apikey=%s", API_URL, title, API_KEY);
        return restTemplate.getForEntity(url, Object.class);
    }

    @Override
    public ResponseEntity<List<MovieResponse>> findMoviesByTitle(String title) {
        List <Movie>movies = movieRepository.findByTitleContainingIgnoreCase(title);
        List<MovieResponse>responses = movies.stream().map(MovieMapper::toMovieResponse).toList();
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @Override
    public Page<MovieResponse> getAllMoviesByPagination(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
        Page<Movie> movies= movieRepository.findAll(pageable);
        List<MovieResponse> movieRetrievals = movies.getContent().stream()
                .map(MovieMapper::toMovieResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(movieRetrievals, pageable, movies.getTotalElements());
    }
}
