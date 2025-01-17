package com.heymax.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int overallScore;
    private int attentiveScore;
    private int participationScore;
    private String comments;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
