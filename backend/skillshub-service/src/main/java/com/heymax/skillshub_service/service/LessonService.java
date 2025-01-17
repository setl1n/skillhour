package com.heymax.skillshub_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heymax.skillshub_service.entity.Lesson;
import com.heymax.skillshub_service.repository.LessonRepository;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;

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
}
