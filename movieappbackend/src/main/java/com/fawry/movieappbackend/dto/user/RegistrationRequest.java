package com.fawry.movieappbackend.dto.user;

import com.fawry.movieappbackend.entity.role.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    @NotBlank(message = "email should not be empty")
    private String email;
    @NotBlank(message = "password should not be empty")
    private String password;
    @NotNull(message = "Role cannot be null")
    private Role role;
}
