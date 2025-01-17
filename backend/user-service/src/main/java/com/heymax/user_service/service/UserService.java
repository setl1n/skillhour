package com.heymax.user_service.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.heymax.user_service.dto.LoginRequest;
import com.heymax.user_service.dto.LoginResponse;
import com.heymax.user_service.entity.User;
import com.heymax.user_service.repository.UserRepository;
import com.heymax.user_service.security.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return LoginResponse.builder()
                .id(user.getId().toString())
                .name(user.getUsername())
                .email(user.getEmail())
                .token(token)
                .timeCred(user.getTimeCred())
                .build();
    }

    public User getCurrentUser(String token) {
        String email = jwtUtil.getUsernameFromToken(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Map<String, Object> getUserReviews(Long userId) {
        Map<String, Object> reviews = new HashMap<>();
        reviews.put("teacherReviews", userRepository.findTeacherReviewsByUserId(userId));
        reviews.put("studentReviews", userRepository.findStudentReviewsByUserId(userId));
        return reviews;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
