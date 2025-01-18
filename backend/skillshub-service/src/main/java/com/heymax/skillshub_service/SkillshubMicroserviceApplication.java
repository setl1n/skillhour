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
            lesson1.setState(LessonState.UPCOMING);

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
            lesson2.setState(LessonState.UPCOMING);

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
            lesson3.setState(LessonState.UPCOMING);

            // Additional Data Analytics lessons
            Lesson lesson1b = new Lesson();
            lesson1b.setInstructorId(1L);
            lesson1b.setMaxCapacity(5);
            lesson1b.setSkillTaught("Data Visualization with Python");
            LocalDateTime startTime1b = startTime1.plusDays(7);
            lesson1b.setDateTime(startTime1b);
            lesson1b.setEndDateTime(startTime1b.plusHours(2));
            lesson1b.setIsOnline(true);
            lesson1b.setStudentIds(Arrays.asList(2L));
            lesson1b.setState(LessonState.UPCOMING);

            Lesson lesson1c = new Lesson();
            lesson1c.setInstructorId(1L);
            lesson1c.setMaxCapacity(5);
            lesson1c.setSkillTaught("SQL for Data Analysis");
            LocalDateTime startTime1c = startTime1.plusDays(14);
            lesson1c.setDateTime(startTime1c);
            lesson1c.setEndDateTime(startTime1c.plusHours(2));
            lesson1c.setIsOnline(true);
            lesson1c.setStudentIds(Arrays.asList(3L));
            lesson1c.setState(LessonState.UPCOMING);

            // Additional Fitness lessons
            Lesson lesson2b = new Lesson();
            lesson2b.setInstructorId(2L);
            lesson2b.setMaxCapacity(3);
            lesson2b.setSkillTaught("Advanced HIIT Training");
            LocalDateTime startTime2b = startTime2.plusDays(7);
            lesson2b.setDateTime(startTime2b);
            lesson2b.setEndDateTime(startTime2b.plusHours(1));
            lesson2b.setIsOnline(false);
            lesson2b.setLocation("Choa Chu Kang ActiveSG Gym");
            lesson2b.setStudentIds(Arrays.asList(1L));
            lesson2b.setState(LessonState.UPCOMING);

            Lesson lesson2c = new Lesson();
            lesson2c.setInstructorId(2L);
            lesson2c.setMaxCapacity(4);
            lesson2c.setSkillTaught("Strength Training Basics");
            LocalDateTime startTime2c = startTime2.plusDays(14);
            lesson2c.setDateTime(startTime2c);
            lesson2c.setEndDateTime(startTime2c.plusHours(2));
            lesson2c.setIsOnline(false);
            lesson2c.setLocation("Choa Chu Kang ActiveSG Gym");
            lesson2c.setStudentIds(Arrays.asList(3L));
            lesson2c.setState(LessonState.UPCOMING);

            // Additional Cooking lessons
            Lesson lesson3b = new Lesson();
            lesson3b.setInstructorId(3L);
            lesson3b.setMaxCapacity(5);
            lesson3b.setSkillTaught("Asian Cuisine Basics");
            LocalDateTime startTime3b = startTime3.plusDays(7);
            lesson3b.setDateTime(startTime3b);
            lesson3b.setEndDateTime(startTime3b.plusHours(3));
            lesson3b.setIsOnline(true);
            lesson3b.setStudentIds(Arrays.asList(2L));
            lesson3b.setState(LessonState.UPCOMING);

            Lesson lesson3c = new Lesson();
            lesson3c.setInstructorId(3L);
            lesson3c.setMaxCapacity(4);
            lesson3c.setSkillTaught("Dessert Making Workshop");
            LocalDateTime startTime3c = startTime3.plusDays(14);
            lesson3c.setDateTime(startTime3c);
            lesson3c.setEndDateTime(startTime3c.plusHours(3));
            lesson3c.setIsOnline(true);
            lesson3c.setStudentIds(Arrays.asList(1L));
            lesson3c.setState(LessonState.UPCOMING);

            // Save all lessons
            Lesson saved1 = lessonService.createLesson(lesson1);
            Lesson saved1b = lessonService.createLesson(lesson1b);
            Lesson saved1c = lessonService.createLesson(lesson1c);
            Lesson saved2 = lessonService.createLesson(lesson2);
            Lesson saved2b = lessonService.createLesson(lesson2b);
            Lesson saved2c = lessonService.createLesson(lesson2c);
            Lesson saved3 = lessonService.createLesson(lesson3);
            Lesson saved3b = lessonService.createLesson(lesson3b);
            Lesson saved3c = lessonService.createLesson(lesson3c);
        };
    }
}
