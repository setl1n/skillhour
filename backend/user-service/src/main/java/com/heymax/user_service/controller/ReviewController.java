package com.heymax.user_service.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heymax.user_service.entity.StudentReview;
import com.heymax.user_service.entity.TeacherReview;
import com.heymax.user_service.repository.StudentReviewRepository;
import com.heymax.user_service.repository.TeacherReviewRepository;
import com.heymax.user_service.repository.UserRepository;
import com.heymax.user_service.security.JwtUtil;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private TeacherReviewRepository teacherReviewRepository;

    @Autowired
    private StudentReviewRepository studentReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/teacher/{userId}")
    public ResponseEntity<TeacherReview> createTeacherReview(@PathVariable Long userId, 
                                               @RequestBody TeacherReview review,
                                               @RequestHeader("Authorization") String authHeader) {
        Long givenBy = jwtUtil.getUserIdFromToken(jwtUtil.getTokenFromHeader(authHeader));
        review.setGivenBy(givenBy);
        review.setUser(userRepository.findById(userId).orElseThrow());
        TeacherReview savedReview = teacherReviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @PostMapping("/student/{userId}")
    public ResponseEntity<StudentReview> createStudentReview(@PathVariable Long userId, 
                                              @RequestBody StudentReview review,
                                              @RequestHeader("Authorization") String authHeader) {
        Long givenBy = jwtUtil.getUserIdFromToken(jwtUtil.getTokenFromHeader(authHeader));
        review.setGivenBy(givenBy);
        review.setUser(userRepository.findById(userId).orElseThrow());
        StudentReview savedReview = studentReviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }
}
