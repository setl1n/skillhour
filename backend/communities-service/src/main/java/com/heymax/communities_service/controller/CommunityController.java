package com.heymax.communities_service.controller;

import com.heymax.communities_service.entity.*;
import com.heymax.communities_service.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    @PostMapping
    public ResponseEntity<Community> createCommunity(@RequestBody Community community) {
        return ResponseEntity.ok(communityService.createCommunity(community));
    }

    @GetMapping
    public ResponseEntity<List<Community>> getAllCommunities() {
        return ResponseEntity.ok(communityService.getAllCommunities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunity(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getCommunityById(id));
    }

    @PostMapping("/{id}/lessons/{lessonId}")
    public ResponseEntity<Community> addLesson(@PathVariable Long id, @PathVariable Long lessonId) {
        return ResponseEntity.ok(communityService.addLesson(id, lessonId));
    }

    @PostMapping("/{id}/posts")
    public ResponseEntity<Post> createPost(@PathVariable Long id, @RequestBody Post post) {
        return ResponseEntity.ok(communityService.createPost(id, post));
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        return ResponseEntity.ok(communityService.addComment(postId, comment));
    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getPostComments(@PathVariable Long postId) {
        return ResponseEntity.ok(communityService.getPostComments(postId));
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<Post>> getCommunityPosts(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getCommunityPosts(id));
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok(communityService.getPostById(postId));
    }
}
