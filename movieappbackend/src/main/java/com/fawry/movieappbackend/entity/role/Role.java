package com.fawry.movieappbackend.entity.role;

import com.fawry.movieappbackend.entity.permisstions.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import static com.fawry.movieappbackend.entity.permisstions.Permission.*;
@RequiredArgsConstructor
public enum Role {
    USER(Set.of(
            USER_RATE,
            USER_READ
    )),
    ADMIN(Set.of(
            ADMIN_CREATE,
            ADMIN_DELETE,
            ADMIN_UPDATE,
            ADMIN_READ
    ));
    @Getter
    private final Set<Permission>permissions;
    public List<SimpleGrantedAuthority> getAuthorities()
    {
        List<SimpleGrantedAuthority> authorities =
                new ArrayList<>(getPermissions()
                .stream()
                .map(permission ->
                        new SimpleGrantedAuthority(permission.getPermission()))
                .toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
