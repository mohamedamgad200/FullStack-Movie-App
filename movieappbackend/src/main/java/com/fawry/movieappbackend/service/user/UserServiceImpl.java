package com.fawry.movieappbackend.service.user;
import com.fawry.movieappbackend.dto.user.LoginRequest;
import com.fawry.movieappbackend.dto.user.LoginResponse;
import com.fawry.movieappbackend.dto.user.RegistrationRequest;
import com.fawry.movieappbackend.dto.user.RegistrationResponse;
import com.fawry.movieappbackend.entity.User;
import com.fawry.movieappbackend.repository.user.UserRepository;
import com.fawry.movieappbackend.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public ResponseEntity<RegistrationResponse> register(
            RegistrationRequest registrationRequest) {
        User user = User
                .builder()
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .role(registrationRequest.getRole())
                .build();
        userRepository.save(user);
        return new ResponseEntity<>(RegistrationResponse.
                builder()
                .message("User Created Successfly")
                .build(), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()));
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        String jwt = jwtService.generateToken(user);
        return new ResponseEntity<>(LoginResponse
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .token(jwt)
                .role(user.getRole())
                .build(), HttpStatus.OK);
    }
}
