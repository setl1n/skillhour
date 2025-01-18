package com.heymax.skillshub_service.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heymax.skillshub_service.entity.Lesson;
import com.heymax.skillshub_service.entity.LessonState;
import com.heymax.skillshub_service.service.LessonService;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @PostMapping
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
        System.out.println("Controller received.");
        return ResponseEntity.ok(lessonService.createLesson(lesson));
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Lesson>> getLessonsByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(lessonService.getLessonsByInstructor(instructorId));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Lesson>> getLessonsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(lessonService.getLessonsByStudent(studentId));
    }

    @PostMapping("/{lessonId}/enroll/{studentId}")
    public ResponseEntity<Lesson> enrollStudent(@PathVariable Long lessonId, @PathVariable Long studentId) {
        return ResponseEntity.ok(lessonService.enrollStudent(lessonId, studentId));
    }

    @PostMapping("/{lessonId}/state/{state}")
    public ResponseEntity<Lesson> updateLessonState(
            @PathVariable Long lessonId,
            @PathVariable LessonState state) {
        return ResponseEntity.ok(lessonService.updateLessonState(lessonId, state));
    }

    @PostMapping("/{lessonId}/reviewed/student/{studentId}")
    public ResponseEntity<Lesson> markStudentAsReviewed(
            @PathVariable Long lessonId,
            @PathVariable Long studentId) {
        return ResponseEntity.ok(lessonService.markStudentAsReviewed(lessonId, studentId));
    }

    @PostMapping("/{lessonId}/reviewed/teacher/{studentReviewerId}")
    public ResponseEntity<Lesson> markTeacherAsReviewed(
            @PathVariable Long lessonId,
            @PathVariable Long studentReviewerId) {
        return ResponseEntity.ok(lessonService.markTeacherAsReviewed(lessonId, studentReviewerId));
    }

    @PostMapping("/{lessonId}/check-reviews")
    public ResponseEntity<Map<String, Object>> checkAllStudentsReviewed(@PathVariable Long lessonId) {
        Map<String, Object> result = lessonService.checkAndRewardAllStudentsReviewed(lessonId);
        
        HttpStatus status = switch((String) result.get("status")) {
            case "already_rewarded" -> HttpStatus.OK;
            case "rewarded" -> HttpStatus.OK;
            case "pending" -> HttpStatus.ACCEPTED;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
        
        return ResponseEntity.status(status).body(result);
    }
}
