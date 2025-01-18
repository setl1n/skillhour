package com.heymax.communities_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.heymax.communities_service.entity.Post;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Find posts by community
    List<Post> findByCommunityId(Long communityId);
    
    // Find posts by title containing keyword
    List<Post> findByTitleContainingIgnoreCase(String keyword);
}
