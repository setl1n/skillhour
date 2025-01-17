package com.heymax.user_service;

import com.heymax.user_service.entity.StudentReview;
import com.heymax.user_service.entity.TeacherReview;
import com.heymax.user_service.entity.User;
import com.heymax.user_service.repository.StudentReviewRepository;
import com.heymax.user_service.repository.TeacherReviewRepository;
import com.heymax.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class UsersMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UsersMicroserviceApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository,
                         TeacherReviewRepository teacherReviewRepository,
                         StudentReviewRepository studentReviewRepository,
                         PasswordEncoder passwordEncoder) {
        return args -> {
            // Create users
            User user1 = new User();
            user1.setUsername("Jane Smith");
            user1.setEmail("jane@example.com");
            user1.setPassword(passwordEncoder.encode("password"));
            user1.setTimeCred(10);
            userRepository.save(user1);

            User user2 = new User();
            user2.setUsername("John Doe");
            user2.setEmail("john@example.com");
            user2.setPassword(passwordEncoder.encode("password"));
            user2.setTimeCred(10);
            userRepository.save(user2);

            User user3 = new User();
            user3.setUsername("Bob Wilson");
            user3.setEmail("bob@example.com");
            user3.setPassword(passwordEncoder.encode("password"));
            user3.setTimeCred(10);
            userRepository.save(user3);

            // Teacher Reviews for User 1
            teacherReviewRepository.save(createTeacherReview(user1, user2.getId(), 5, 5, 4, "Excellent Java instructor, very patient"));
            teacherReviewRepository.save(createTeacherReview(user1, user3.getId(), 4, 5, 4, "Great at explaining complex concepts"));
            teacherReviewRepository.save(createTeacherReview(user1, user2.getId(), 5, 5, 5, "Best programming mentor I've had"));

            // Teacher Reviews for User 2
            teacherReviewRepository.save(createTeacherReview(user2, user1.getId(), 5, 5, 5, "Amazing basketball coach, great motivation"));
            teacherReviewRepository.save(createTeacherReview(user2, user3.getId(), 4, 4, 5, "Excellent at breaking down techniques"));
            teacherReviewRepository.save(createTeacherReview(user2, user1.getId(), 5, 5, 4, "Really helps improve game strategy"));

            // Teacher Reviews for User 3
            teacherReviewRepository.save(createTeacherReview(user3, user1.getId(), 5, 4, 5, "Fantastic yoga instructor"));
            teacherReviewRepository.save(createTeacherReview(user3, user2.getId(), 4, 5, 4, "Very attentive to form"));
            teacherReviewRepository.save(createTeacherReview(user3, user1.getId(), 5, 5, 5, "Great at customizing poses for beginners"));

            // Student Reviews for User 1
            studentReviewRepository.save(createStudentReview(user1, user2.getId(), 4, 5, 4, "Quick learner in Python"));
            studentReviewRepository.save(createStudentReview(user1, user3.getId(), 5, 5, 5, "Great at pair programming"));
            studentReviewRepository.save(createStudentReview(user1, user2.getId(), 4, 4, 5, "Always helps others understand"));

            // Student Reviews for User 2
            studentReviewRepository.save(createStudentReview(user2, user1.getId(), 5, 5, 5, "Natural leader in team sports"));
            studentReviewRepository.save(createStudentReview(user2, user3.getId(), 4, 5, 4, "Great team player"));
            studentReviewRepository.save(createStudentReview(user2, user1.getId(), 5, 5, 5, "Shows dedication in practice"));

            // Student Reviews for User 3
            studentReviewRepository.save(createStudentReview(user3, user1.getId(), 4, 5, 4, "Very focused during meditation"));
            studentReviewRepository.save(createStudentReview(user3, user2.getId(), 5, 5, 4, "Quick to learn new poses"));
            studentReviewRepository.save(createStudentReview(user3, user1.getId(), 4, 4, 5, "Great progress in flexibility"));
        };
    }

    private TeacherReview createTeacherReview(User user, Long givenBy, int overall, int knowledge, int delivery, String comments) {
        TeacherReview review = new TeacherReview();
        review.setUser(user);
        review.setGivenBy(givenBy);
        review.setOverallScore(overall);
        review.setKnowledgeScore(knowledge);
        review.setDeliveryScore(delivery);
        review.setComments(comments);
        return review;
    }

    private StudentReview createStudentReview(User user, Long givenBy, int overall, int attentive, int participation, String comments) {
        StudentReview review = new StudentReview();
        review.setUser(user);
        review.setGivenBy(givenBy);
        review.setOverallScore(overall);
        review.setAttentiveScore(attentive);
        review.setParticipationScore(participation);
        review.setComments(comments);
        return review;
    }
}
