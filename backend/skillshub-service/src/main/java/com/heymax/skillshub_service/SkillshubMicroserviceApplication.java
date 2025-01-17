package com.heymax.skillshub_service;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.heymax.skillshub_service.entity.Lesson;
import com.heymax.skillshub_service.entity.LessonState;
import com.heymax.skillshub_service.service.LessonService;

@SpringBootApplication
public class SkillshubMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillshubMicroserviceApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(LessonService lessonService) {
        return args -> {
            // Create some sample lessons
            Lesson lesson1 = new Lesson();
            lesson1.setInstructorId(1L);
            lesson1.setMaxCapacity(5);
            lesson1.setSkillTaught("Data Analytics with Pandas");
            LocalDateTime startTime1 = LocalDateTime.now().plusMinutes(15);
            lesson1.setDateTime(startTime1);
            lesson1.setEndDateTime(startTime1.plusHours(2));  // 12:00
            lesson1.setIsOnline(true);
            lesson1.setStudentIds(Arrays.asList(2L, 3L));
            lesson1.setState(LessonState.FUTURE);

            Lesson lesson2 = new Lesson();
            lesson2.setInstructorId(2L);
            lesson2.setMaxCapacity(2);
            lesson2.setSkillTaught("Gym Basic Exercises");
            LocalDateTime startTime2 = LocalDateTime.now().plusDays(2)
                .withHour(14).withMinute(30).withSecond(0).withNano(0);  // 14:30
            lesson2.setDateTime(startTime2);
            lesson2.setEndDateTime(startTime2.plusHours(2));  // 16:30
            lesson2.setIsOnline(false);
            lesson2.setLocation("Choa Chu Kang ActiveSG Gym");
            lesson2.setStudentIds(Arrays.asList(1L, 3L));
            lesson2.setState(LessonState.FUTURE);

            Lesson lesson3 = new Lesson();
            lesson3.setInstructorId(3L);
            lesson3.setMaxCapacity(4);
            lesson3.setSkillTaught("Online Cook Along");
            LocalDateTime startTime3 = LocalDateTime.now().plusDays(3)
                .withHour(18).withMinute(0).withSecond(0).withNano(0);  // 18:00
            lesson3.setDateTime(startTime3);
            lesson3.setEndDateTime(startTime3.plusHours(4));  // 22:00
            lesson3.setIsOnline(true);
            lesson3.setStudentIds(Arrays.asList(1L));
            lesson3.setState(LessonState.FUTURE);

            // Save the lessons
            lessonService.createLesson(lesson1);
            lessonService.createLesson(lesson2);
            lessonService.createLesson(lesson3);
        };
    }
}
