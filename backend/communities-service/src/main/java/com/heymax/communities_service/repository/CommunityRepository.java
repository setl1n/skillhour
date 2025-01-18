package com.heymax.communities_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.heymax.communities_service.entity.Community;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    // Find communities by owner
    List<Community> findByOwnerId(Long ownerId);
}
