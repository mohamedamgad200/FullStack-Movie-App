package com.fawry.movieappbackend.dto.rate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RateRequest {
    @Min(1)
    @Max(5)
    private int rate;
    private int userId;
    private int movieId;
}
