package com.fawry.movieappbackend.repository.rate;

import com.fawry.movieappbackend.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReteRepository extends JpaRepository<Rate, Integer> {
    boolean existsByMovieIdAndUserId(Integer userId, Integer MovieId);
}
