package com.heymax.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TeacherReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int overallScore;
    private int knowledgeScore;
    private int deliveryScore;
    private String comments;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
