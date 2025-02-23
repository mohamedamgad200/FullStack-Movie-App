package com.fawry.movieappbackend.controller.authentication;

import com.fawry.movieappbackend.dto.user.LoginRequest;
import com.fawry.movieappbackend.dto.user.LoginResponse;
import com.fawry.movieappbackend.dto.user.RegistrationRequest;
import com.fawry.movieappbackend.dto.user.RegistrationResponse;
import com.fawry.movieappbackend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest registrationRequest)
    {
       return userService.register(registrationRequest);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest)
    {
        return userService.login(loginRequest);
    }
}
