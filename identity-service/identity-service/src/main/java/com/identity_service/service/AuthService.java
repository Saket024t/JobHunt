package com.identity_service.service;

import com.identity_service.entity.UserCredential;
import com.identity_service.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String saveUser(UserCredential credential) {
        // 1. CHECK: Does this email already exist?
        Optional<UserCredential> existingUser = repository.findByEmail(credential.getEmail());

        if (existingUser.isPresent()) {
            // Stop the process here and throw an error
            throw new RuntimeException("User already exists with email: " + credential.getEmail());
        }

        // 2. If not, proceed with encryption and saving
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "User added to the system";
    }
    public String generateToken(String email) {
        // 1. Fetch the user from DB to get ID and Role
        UserCredential user = repository.findByEmail(email).get();

        // 2. Add extra info to the token
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole().name());

        // 3. Generate Token
        return jwtService.generateToken(email, claims);
    }
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}