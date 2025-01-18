package com.heymax.communities_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heymax.communities_service.entity.Comment;
import com.heymax.communities_service.entity.Community;
import com.heymax.communities_service.entity.Post;
import com.heymax.communities_service.repository.*;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Community getCommunityById(Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public Community addLesson(Long communityId, Long lessonId) {
        Community community = getCommunityById(communityId);
        community.getLessonIds().add(lessonId);
        return communityRepository.save(community);
    }

    public Post createPost(Long communityId, Post post) {
        Community community = getCommunityById(communityId);
        post.setCommunity(community);
        Post savedPost = postRepository.save(post);
        return savedPost;
    }

    public Comment addComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    public List<Post> getPostsByCommunity(Long communityId) {
        return postRepository.findByCommunityId(communityId);
    }

    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // Add methods to fetch related entities
    public List<Comment> getPostComments(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public List<Post> getCommunityPosts(Long communityId) {
        return postRepository.findByCommunityId(communityId);
    }

    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }
}
