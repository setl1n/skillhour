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

    @Autowired
    private SkillshubService skillshubService;

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
                .username(user.getUsername())
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

    public void enrollInLesson(Long userId, Long lessonId, int cost) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getTimeCred() < cost) {
            throw new RuntimeException("Insufficient time credits");
        }

        // Deduct time credits
        user.setTimeCred(user.getTimeCred() - cost);
        userRepository.save(user);

        try {
            // Call to skillshub microservice to enroll the student
            skillshubService.enrollStudent(lessonId, userId);
        } catch (Exception e) {
            // If enrollment fails, rollback the time credits deduction
            user.setTimeCred(user.getTimeCred() + cost);
            userRepository.save(user);
            throw new RuntimeException("Enrollment failed: " + e.getMessage());
        }
    }
}
