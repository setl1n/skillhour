package com.heymax.user_service.controller;

import com.heymax.user_service.dto.LoginRequest;
import com.heymax.user_service.dto.LoginResponse;
import com.heymax.user_service.entity.User;
import com.heymax.user_service.service.UserService;
import com.heymax.user_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${service.admin-key}")
    private String adminKey;

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

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PostMapping("/users/{userId}/enroll")
    public ResponseEntity<Map<String, String>> enrollInLesson(@PathVariable Long userId, @RequestParam Long lessonId, @RequestParam int cost) {
        userService.enrollInLesson(userId, lessonId, cost);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Enrollment successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{userId}/timecreds")
    public ResponseEntity<User> updateTimeCredits(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> request,
            @RequestHeader("Admin-Key") String providedAdminKey) {
        
        if (!adminKey.equals(providedAdminKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        User updatedUser = userService.addTimeCredits(userId, request.get("amount"));
        return ResponseEntity.ok(updatedUser);
    }
}
