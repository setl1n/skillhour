package com.heymax.communities_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDateTime;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String body;

    @Column(nullable = false)
    private Long author;

    @Column(nullable = false)
    private LocalDateTime postedOn;

    private long likes = 0;
    private long dislikes = 0;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private Post post;
}
