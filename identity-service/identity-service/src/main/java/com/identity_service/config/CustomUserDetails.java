package com.identity_service.config;

import com.identity_service.entity.UserCredential;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public CustomUserDetails(UserCredential userCredential) {
        this.email = userCredential.getEmail(); // Use email as identifier
        this.password = userCredential.getPassword();
        String roleName = (userCredential.getRole() != null) ? userCredential.getRole().name() : "EMPLOYEE";
        this.authorities = List.of(new SimpleGrantedAuthority("ROLE_" + roleName));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // Return email when Spring asks for username
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}