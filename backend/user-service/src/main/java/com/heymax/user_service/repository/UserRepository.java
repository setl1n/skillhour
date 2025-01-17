package com.heymax.user_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.heymax.user_service.entity.StudentReview;
import com.heymax.user_service.entity.TeacherReview;
import com.heymax.user_service.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findByEmail(String email);
    
    @Query("SELECT tr FROM TeacherReview tr WHERE tr.user.id = :userId")
    List<TeacherReview> findTeacherReviewsByUserId(Long userId);
    
    @Query("SELECT sr FROM StudentReview sr WHERE sr.user.id = :userId")
    List<StudentReview> findStudentReviewsByUserId(Long userId);
}
