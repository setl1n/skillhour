package com.heymax.communities_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.heymax.communities_service.entity.Comment;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Find comments by post
    List<Comment> findByPostId(Long postId);
    
    // Find comments by user
    List<Comment> findByPostedBy(Long userId);
}
