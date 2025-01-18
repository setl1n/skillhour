package com.heymax.communities_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "community")
    @JsonManagedReference
    private List<Post> posts = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "community_lessons", joinColumns = @JoinColumn(name = "community_id"))
    @Column(name = "lesson_id")
    private List<Long> lessonIds = new ArrayList<>();
}
