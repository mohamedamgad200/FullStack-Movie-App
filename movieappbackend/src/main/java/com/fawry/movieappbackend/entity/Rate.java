package com.fawry.movieappbackend.entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="rate", uniqueConstraints = @UniqueConstraint(columnNames = {"movie_id", "user_id"}))
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rate_id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name="rate_value")
    private Integer rateValue;

}
