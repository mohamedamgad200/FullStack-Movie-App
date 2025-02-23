package com.fawry.movieappbackend.service.rate;

import com.fawry.movieappbackend.dto.rate.RateRequest;
import com.fawry.movieappbackend.entity.Movie;
import com.fawry.movieappbackend.entity.Rate;
import com.fawry.movieappbackend.entity.User;
import com.fawry.movieappbackend.exception.NotFoundException;
import com.fawry.movieappbackend.repository.movie.MovieRepository;
import com.fawry.movieappbackend.repository.rate.ReteRepository;
import com.fawry.movieappbackend.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RateServiceImpl implements RateService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final ReteRepository rateRepository;
    @Override
    public ResponseEntity<Map<String, String>> addRate(RateRequest rateRequest) {
        Movie movie = movieRepository.findById(rateRequest.getMovieId()).orElseThrow(
                ()-> new NotFoundException("Movie Not Found"));
        User user=userRepository.findById(rateRequest.getUserId())
                .orElseThrow(()->new NotFoundException("User Not Found"));
        Map<String, String> response = new HashMap<>();
        if (rateRepository.existsByMovieIdAndUserId(movie.getId(), user.getId())) {
            response.put("message", "User already rated this movie.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        Rate rate = Rate.builder()
                .movie(movie)
                .user(user)
                .rateValue(rateRequest.getRate())
                .build();

        rateRepository.save(rate);
        response.put("message", "Rating added successfully.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
