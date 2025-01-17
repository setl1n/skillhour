package com.heymax.skillshub_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heymax.skillshub_service.entity.Lesson;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByInstructorId(Long instructorId);
    List<Lesson> findByStudentIdsContaining(Long studentId);
}
