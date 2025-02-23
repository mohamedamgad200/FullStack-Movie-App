package com.fawry.movieappbackend.service.user;

import com.fawry.movieappbackend.dto.user.LoginRequest;
import com.fawry.movieappbackend.dto.user.LoginResponse;
import com.fawry.movieappbackend.dto.user.RegistrationRequest;
import com.fawry.movieappbackend.dto.user.RegistrationResponse;
import org.springframework.http.ResponseEntity;


public interface UserService {
    public ResponseEntity<RegistrationResponse> register(RegistrationRequest registrationRequest);
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest);

}
