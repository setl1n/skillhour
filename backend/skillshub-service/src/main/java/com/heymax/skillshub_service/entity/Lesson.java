package com.heymax.skillshub_service.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long instructorId;

    @Column(nullable = false)
    private Integer maxCapacity;

    @Column(nullable = false)
    private String skillTaught;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @Column(nullable = false)
    private Boolean isOnline;

    private String location;

    @ElementCollection
    @CollectionTable(name = "lesson_students", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "student_id")
    private List<Long> studentIds;

    @ElementCollection
    @CollectionTable(name = "lesson_reviewed_users", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "user_id")
    private List<Long> reviewedStudents = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "lesson_teacher_reviews", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "student_reviewer_id")
    private List<Long> teacherReviewers = new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LessonState state = LessonState.FUTURE;
}
