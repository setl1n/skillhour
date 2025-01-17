package com.heymax.user_service.controller;

import com.heymax.user_service.dto.LoginRequest;
import com.heymax.user_service.dto.LoginResponse;
import com.heymax.user_service.entity.User;
import com.heymax.user_service.service.UserService;
import com.heymax.user_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/auth/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticate(loginRequest));
    }

    @GetMapping("/users/{userId}/reviews")
    public ResponseEntity<?> getUserReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserReviews(userId));
    }
}
