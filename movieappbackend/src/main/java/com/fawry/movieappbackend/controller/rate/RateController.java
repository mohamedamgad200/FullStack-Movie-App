package com.fawry.movieappbackend.controller.rate;

import com.fawry.movieappbackend.dto.rate.RateRequest;
import com.fawry.movieappbackend.service.rate.RateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rate")
@RequiredArgsConstructor
public class RateController {
    private final RateService rateService;
    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addRate(@Valid @RequestBody RateRequest rateRequest) {
     return rateService.addRate(rateRequest);
    }
}
