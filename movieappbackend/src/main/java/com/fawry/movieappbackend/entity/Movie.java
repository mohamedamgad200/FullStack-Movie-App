package com.fawry.movieappbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="movie_id")
    private Integer id;
    @Column(name="title", nullable=false)
    private String title;
    @Column(name = "description",nullable=false)
    private String description;
    @Column(name = "genre")
    private String genre;
    @Column(name = "director")
    private String director;
    @Column(name = "year")
    private String year;
    @Column(name = "poster",nullable=false)
    private String poster;
    @OneToMany(mappedBy = "movie")
    List<Rate>rates;
}
