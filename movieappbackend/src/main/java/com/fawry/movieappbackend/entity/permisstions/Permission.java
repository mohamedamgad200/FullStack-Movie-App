package com.fawry.movieappbackend.entity.permisstions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("movie:read"),
    ADMIN_UPDATE("movie:update"),
    ADMIN_DELETE("movie:delete"),
    ADMIN_CREATE("movie:create"),
    USER_RATE("movie:rate"),
    USER_READ("movie:read");

    @Getter
    private final String permission;
}
