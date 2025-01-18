package com.heymax.communities_service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.heymax.communities_service.entity.Community;
import com.heymax.communities_service.entity.Post;
import com.heymax.communities_service.entity.Comment;
import com.heymax.communities_service.service.CommunityService;

import java.util.Arrays;

@SpringBootApplication
public class CommunitiesMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommunitiesMicroserviceApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(CommunityService communityService) {
        return args -> {
            // Create Data Analytics Community
            Community dataAnalyticsCommunity = new Community();
            dataAnalyticsCommunity.setName("Data Analytics Learning Hub");
            dataAnalyticsCommunity.setOwnerId(1L); // Same as instructor ID from lesson1
            dataAnalyticsCommunity.setLessonIds(Arrays.asList(1L));
            Community savedDataCommunity = communityService.createCommunity(dataAnalyticsCommunity);

            // Create posts for Data Analytics
            Post dataPost1 = new Post();
            dataPost1.setTitle("Getting Started with Pandas");
            dataPost1.setContent("Here are some resources to prepare for our first lesson...");
            Post savedDataPost1 = communityService.createPost(savedDataCommunity.getId(), dataPost1);

            Comment dataComment1 = new Comment();
            dataComment1.setBody("Thanks for sharing! Very helpful.");
            dataComment1.setPostedBy(2L);
            communityService.addComment(savedDataPost1.getId(), dataComment1);

            // Create Fitness Community
            Community fitnessCommunity = new Community();
            fitnessCommunity.setName("Fitness Enthusiasts");
            fitnessCommunity.setOwnerId(2L); // Same as instructor ID from lesson2
            fitnessCommunity.setLessonIds(Arrays.asList(2L));
            Community savedFitnessCommunity = communityService.createCommunity(fitnessCommunity);

            // Create posts for Fitness
            Post fitnessPost1 = new Post();
            fitnessPost1.setTitle("Gym Essentials Checklist");
            fitnessPost1.setContent("What to bring for your first gym session...");
            Post savedFitnessPost1 = communityService.createPost(savedFitnessCommunity.getId(), fitnessPost1);

            Comment fitnessComment1 = new Comment();
            fitnessComment1.setBody("Should we bring our own towels?");
            fitnessComment1.setPostedBy(1L);
            communityService.addComment(savedFitnessPost1.getId(), fitnessComment1);

            // Create Cooking Community
            Community cookingCommunity = new Community();
            cookingCommunity.setName("Cook Along Community");
            cookingCommunity.setOwnerId(3L); // Same as instructor ID from lesson3
            cookingCommunity.setLessonIds(Arrays.asList(3L));
            Community savedCookingCommunity = communityService.createCommunity(cookingCommunity);

            // Create posts for Cooking
            Post cookingPost1 = new Post();
            cookingPost1.setTitle("Ingredients List for Next Session");
            cookingPost1.setContent("Please prepare these ingredients before the class...");
            Post savedCookingPost1 = communityService.createPost(savedCookingCommunity.getId(), cookingPost1);

            Comment cookingComment1 = new Comment();
            cookingComment1.setBody("Can we substitute olive oil with vegetable oil?");
            cookingComment1.setPostedBy(1L);
            communityService.addComment(savedCookingPost1.getId(), cookingComment1);

            Comment cookingComment2 = new Comment();
            cookingComment2.setBody("Yes, that should work fine!");
            cookingComment2.setPostedBy(3L);
            communityService.addComment(savedCookingPost1.getId(), cookingComment2);
        };
    }
}
