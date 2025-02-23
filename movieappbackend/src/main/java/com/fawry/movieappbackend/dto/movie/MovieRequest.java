package com.fawry.movieappbackend.dto.movie;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieRequest {
    @NotBlank(message = "title can not be null or empty")
    private String title;
    private String description;
    private String genre;
    private String director;
    private String year;
    private String poster;
}
