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
            user1.setUsername("John Doe");
            user1.setEmail("john@example.com");
            user1.setPassword(passwordEncoder.encode("password"));
            user1.setTimeCred(10);
            userRepository.save(user1);

            User user2 = new User();
            user2.setUsername("Jane Smith");
            user2.setEmail("jane@example.com");
            user2.setPassword(passwordEncoder.encode("password"));
            user2.setTimeCred(10);
            userRepository.save(user2);

            User user3 = new User();
            user3.setUsername("Bob Wilson");
            user3.setEmail("bob@example.com");
            user3.setPassword(passwordEncoder.encode("password"));
            user3.setTimeCred(10);
            userRepository.save(user3);

            // More detailed teacher reviews
            TeacherReview tr1 = new TeacherReview();
            tr1.setUser(user1);
            tr1.setOverallScore(5);
            tr1.setKnowledgeScore(5);
            tr1.setDeliveryScore(4);
            tr1.setComments("Excellent at teaching Java programming. Takes time to explain complex concepts step by step. Very patient with beginners.");
            teacherReviewRepository.save(tr1);

            TeacherReview tr2 = new TeacherReview();
            tr2.setUser(user1);
            tr2.setOverallScore(4);
            tr2.setKnowledgeScore(5);
            tr2.setDeliveryScore(3);
            tr2.setComments("Great at explaining algorithms but sometimes goes too fast. Would appreciate more practical examples.");
            teacherReviewRepository.save(tr2);

            TeacherReview tr3 = new TeacherReview();
            tr3.setUser(user2);
            tr3.setOverallScore(5);
            tr3.setKnowledgeScore(5);
            tr3.setDeliveryScore(5);
            tr3.setComments("Amazing basketball coach! Makes drills fun and knows how to improve individual techniques.");
            teacherReviewRepository.save(tr3);

            TeacherReview tr4 = new TeacherReview();
            tr4.setUser(user3);
            tr4.setOverallScore(5);
            tr4.setKnowledgeScore(4);
            tr4.setDeliveryScore(5);
            tr4.setComments("Best yoga instructor! Very attentive to proper form and breathing techniques.");
            teacherReviewRepository.save(tr4);

            // More detailed student reviews
            StudentReview sr1 = new StudentReview();
            sr1.setUser(user1);
            sr1.setOverallScore(4);
            sr1.setAttentiveScore(5);
            sr1.setParticipationScore(4);
            sr1.setComments("Quick learner in Python class, helps other students understand difficult concepts.");
            studentReviewRepository.save(sr1);

            StudentReview sr2 = new StudentReview();
            sr2.setUser(user2);
            sr2.setOverallScore(5);
            sr2.setAttentiveScore(5);
            sr2.setParticipationScore(5);
            sr2.setComments("Excellent team player in basketball. Shows great leadership skills and helps motivate others.");
            studentReviewRepository.save(sr2);

            StudentReview sr3 = new StudentReview();
            sr3.setUser(user3);
            sr3.setOverallScore(4);
            sr3.setAttentiveScore(5);
            sr3.setParticipationScore(3);
            sr3.setComments("Very focused during meditation sessions, but could participate more in group discussions.");
            studentReviewRepository.save(sr3);

            StudentReview sr4 = new StudentReview();
            sr4.setUser(user1);
            sr4.setOverallScore(5);
            sr4.setAttentiveScore(5);
            sr4.setParticipationScore(5);
            sr4.setComments("Natural talent for web development. Created an impressive final project in React.");
            studentReviewRepository.save(sr4);
        };
    }
}
