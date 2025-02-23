package com.fawry.movieappbackend.mapper.movie;

import com.fawry.movieappbackend.dto.movie.MovieRequest;
import com.fawry.movieappbackend.dto.movie.MovieResponse;
import com.fawry.movieappbackend.entity.Movie;

public class MovieMapper {
    public static Movie toMovie(MovieRequest movieRequest) {
        return Movie.builder()
                .title(movieRequest.getTitle())
                .description(movieRequest.getDescription())
                .genre(movieRequest.getGenre())
                .director(movieRequest.getDirector())
                .year(movieRequest.getYear())
                .poster(movieRequest.getPoster())
                .build();
    }
    public static MovieResponse toMovieResponse(Movie movie) {
        return MovieResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .description(movie.getDescription())
                .genre(movie.getGenre())
                .director(movie.getDirector())
                .year(movie.getYear())
                .poster(movie.getPoster())
                .build();
    }
}
