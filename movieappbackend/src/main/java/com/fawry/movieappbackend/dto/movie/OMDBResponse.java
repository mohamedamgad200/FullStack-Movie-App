package com.fawry.movieappbackend.dto.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OMDBResponse {
    @JsonProperty("search")
    private List<MovieOMDBAPI> movieOMDBAPIS;
    private int totalResults;
}
