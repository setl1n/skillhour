package com.heymax.skillshub_service.service;

import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.heymax.skillshub_service.entity.Lesson;
import com.heymax.skillshub_service.entity.LessonState;
import com.heymax.skillshub_service.repository.LessonRepository;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${service.admin-key}")
    private String adminKey;

    @Value("${service.user-service-url}")
    private String userServiceUrl;

    public Lesson createLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Lesson getLessonById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }

    public List<Lesson> getLessonsByInstructor(Long instructorId) {
        return lessonRepository.findByInstructorId(instructorId);
    }

    public List<Lesson> getLessonsByStudent(Long studentId) {
        return lessonRepository.findByStudentIdsContaining(studentId);
    }

    public Lesson enrollStudent(Long lessonId, Long studentId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        if (lesson.getStudentIds().size() >= lesson.getMaxCapacity()) {
            throw new RuntimeException("Lesson is at full capacity");
        }
        lesson.getStudentIds().add(studentId);
        return lessonRepository.save(lesson);
    }

    public Lesson updateLessonState(Long lessonId, LessonState newState) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        lesson.setState(newState);
        return lessonRepository.save(lesson);
    }

    public Lesson markStudentAsReviewed(Long lessonId, Long studentId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
                
        if (!lesson.getStudentIds().contains(studentId)) {
            throw new RuntimeException("Cannot review a student who is not enrolled in this lesson");
        }
        
        if (!lesson.getReviewedStudents().contains(studentId)) {
            lesson.getReviewedStudents().add(studentId);
            return lessonRepository.save(lesson);
        }
        return lesson;
    }

    public Lesson markTeacherAsReviewed(Long lessonId, Long studentReviewerId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
                
        if (!lesson.getStudentIds().contains(studentReviewerId)) {
            throw new RuntimeException("Only enrolled students can review the teacher");
        }
        
        if (!lesson.getTeacherReviewers().contains(studentReviewerId)) {
            lesson.getTeacherReviewers().add(studentReviewerId);
            return lessonRepository.save(lesson);
        }
        return lesson;
    }

    public Map<String, Object> checkAndRewardAllStudentsReviewed(Long lessonId) {
        Map<String, Object> result = new HashMap<>();
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        if (lesson.getInstructorRewarded()) {
            result.put("status", "already_rewarded");
            result.put("message", "Instructor has already been rewarded for this lesson");
            return result;
        }

        if (lesson.getState() != LessonState.ENDED) {
            throw new RuntimeException("Cannot process reviews for uncompleted lesson");
        }

        Set<Long> enrolledStudents = new HashSet<>(lesson.getStudentIds());
        Set<Long> reviewedStudents = new HashSet<>(lesson.getReviewedStudents());

        if (enrolledStudents.equals(reviewedStudents)) {
            long hours = ChronoUnit.HOURS.between(lesson.getDateTime(), lesson.getEndDateTime());
            int rewardAmount = (int) (lesson.getStudentIds().size() * hours);

            String url = userServiceUrl + "/api/users/" + lesson.getInstructorId() + "/timecreds";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Admin-Key", adminKey);
            
            Map<String, Integer> requestBody = new HashMap<>();
            requestBody.put("amount", rewardAmount);

            HttpEntity<Map<String, Integer>> request = new HttpEntity<>(requestBody, headers);
            
            try {
                restTemplate.postForEntity(url, request, Void.class);
                lesson.setInstructorRewarded(true);
                lessonRepository.save(lesson);
                result.put("status", "rewarded");
                result.put("message", "Instructor successfully rewarded");
                result.put("amount", rewardAmount);
                return result;
            } catch (Exception e) {
                throw new RuntimeException("Failed to update instructor time credits: " + e.getMessage());
            }
        }
        
        result.put("status", "pending");
        result.put("message", "Not all students have been reviewed yet");
        result.put("reviewedCount", reviewedStudents.size());
        result.put("totalStudents", enrolledStudents.size());
        return result;
    }
}
