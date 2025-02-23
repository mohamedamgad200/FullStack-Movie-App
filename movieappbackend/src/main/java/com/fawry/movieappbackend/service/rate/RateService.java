package com.fawry.movieappbackend.service.rate;

import com.fawry.movieappbackend.dto.rate.RateRequest;
import com.fawry.movieappbackend.entity.Rate;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface RateService {
    ResponseEntity<Map<String,String>> addRate(RateRequest rateRequest);
}
