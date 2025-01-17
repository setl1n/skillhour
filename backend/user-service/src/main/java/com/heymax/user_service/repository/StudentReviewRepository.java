package com.heymax.user_service.repository;

import com.heymax.user_service.entity.StudentReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentReviewRepository extends JpaRepository<StudentReview, Long> {
}
