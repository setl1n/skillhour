package com.heymax.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private int timeCred = 10; // Default value set to 10

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<StudentReview> studentReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TeacherReview> teacherReviews;
}
