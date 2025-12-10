package com.identity_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle "User Already Exists" and other RuntimeExceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", ex.getMessage());
        // We return 400 (Bad Request) or 409 (Conflict) instead of 500
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // 2. Handle Login Failures (Wrong Password/Email)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", "Invalid username or password!"); 
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    // 3. Catch-all for unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", "Something went wrong: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}