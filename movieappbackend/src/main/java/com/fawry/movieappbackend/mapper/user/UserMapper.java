package com.fawry.movieappbackend.mapper.user;

import com.fawry.movieappbackend.dto.user.LoginResponse;
import com.fawry.movieappbackend.entity.User;

public class UserMapper {
    public static LoginResponse toUserDto(User user, String token)
    {
        return LoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .token(token)
                .role(user.getRole())
                .build();
    }
}
