package com.fawry.movieappbackend.dto.user;

import com.fawry.movieappbackend.entity.role.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private Integer id;
    private String email;
    private String token;
    private Role role;
}
