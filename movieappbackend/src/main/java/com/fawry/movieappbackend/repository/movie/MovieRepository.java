package com.fawry.movieappbackend.repository.movie;

import com.fawry.movieappbackend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    void deleteAllById(Iterable<? extends Integer> movieIds);
}
