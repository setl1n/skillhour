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
import java.time.LocalDateTime;

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
            dataAnalyticsCommunity.setLessonIds(Arrays.asList(1L, 2L, 3L)); // Include all data analytics lessons
            Community savedDataCommunity = communityService.createCommunity(dataAnalyticsCommunity);

            // Create posts for Data Analytics
            Post dataPost1 = new Post();
            dataPost1.setTitle("Getting Started with Pandas");
            dataPost1.setContent("Here are some resources to prepare for our first lesson...");
            dataPost1.setAuthor(1L); // Set by community owner
            dataPost1.setPostedOn(LocalDateTime.now().minusDays(2));
            dataPost1.setLikes(5L);
            Post savedDataPost1 = communityService.createPost(savedDataCommunity.getId(), dataPost1);

            Comment dataComment1 = new Comment();
            dataComment1.setBody("Thanks for sharing! Very helpful.");
            dataComment1.setAuthor(2L);
            dataComment1.setPostedOn(LocalDateTime.now().minusDays(1));
            communityService.addComment(savedDataPost1.getId(), dataComment1);

            // Additional posts for Data Analytics
            Post dataPost2 = new Post();
            dataPost2.setTitle("Python vs R for Data Analysis");
            dataPost2.setContent("Let's discuss the pros and cons of each language...");
            dataPost2.setAuthor(1L);
            dataPost2.setPostedOn(LocalDateTime.now().minusDays(1));
            dataPost2.setLikes(15L);
            dataPost2.setDislikes(2L);
            Post savedDataPost2 = communityService.createPost(savedDataCommunity.getId(), dataPost2);

            Post dataPost3 = new Post();
            dataPost3.setTitle("Visualization Best Practices");
            dataPost3.setContent("Key principles for creating effective data visualizations...");
            dataPost3.setAuthor(1L);
            dataPost3.setPostedOn(LocalDateTime.now().minusHours(5));
            dataPost3.setLikes(8L);
            dataPost3.setDislikes(0L);
            Post savedDataPost3 = communityService.createPost(savedDataCommunity.getId(), dataPost3);

            Comment dataComment2 = new Comment();
            dataComment2.setBody("I prefer Python because of its versatility");
            dataComment2.setAuthor(3L);
            dataComment2.setPostedOn(LocalDateTime.now().minusHours(20));
            communityService.addComment(savedDataPost2.getId(), dataComment2);

            // Add student help request for programming
            Post codingHelpPost = new Post();
            codingHelpPost.setTitle("Stuck with Pandas DataFrame Issue");
            codingHelpPost.setContent("Getting KeyError when trying to merge two DataFrames. Code snippet attached...");
            codingHelpPost.setAuthor(3L);
            codingHelpPost.setPostedOn(LocalDateTime.now().minusHours(5));
            codingHelpPost.setLikes(3L);
            codingHelpPost.setDislikes(0L);
            Post savedCodingHelp = communityService.createPost(savedDataCommunity.getId(), codingHelpPost);

            Comment codingHelpResponse = new Comment();
            codingHelpResponse.setBody("Check if your key columns have the same name in both DataFrames. Let's look at it together in today's session.");
            codingHelpResponse.setAuthor(1L);
            codingHelpResponse.setPostedOn(LocalDateTime.now().minusHours(4));
            communityService.addComment(savedCodingHelp.getId(), codingHelpResponse);

            // Create Fitness Community
            Community fitnessCommunity = new Community();
            fitnessCommunity.setName("Fitness Enthusiasts");
            fitnessCommunity.setOwnerId(2L); // Same as instructor ID from lesson2
            fitnessCommunity.setLessonIds(Arrays.asList(4L, 5L, 6L)); // Include all fitness lessons
            Community savedFitnessCommunity = communityService.createCommunity(fitnessCommunity);

            // Create posts for Fitness
            Post fitnessPost1 = new Post();
            fitnessPost1.setTitle("Gym Essentials Checklist");
            fitnessPost1.setContent("What to bring for your first gym session...");
            fitnessPost1.setAuthor(2L); // Set by community owner
            fitnessPost1.setLikes(3L);
            fitnessPost1.setDislikes(1L);
            fitnessPost1.setPostedOn(LocalDateTime.now().minusHours(12));
            Post savedFitnessPost1 = communityService.createPost(savedFitnessCommunity.getId(), fitnessPost1);

            Comment fitnessComment1 = new Comment();
            fitnessComment1.setBody("Should we bring our own towels?");
            fitnessComment1.setAuthor(1L);
            fitnessComment1.setPostedOn(LocalDateTime.now().minusHours(6));
            communityService.addComment(savedFitnessPost1.getId(), fitnessComment1);

            // Additional posts for Fitness
            Post fitnessPost2 = new Post();
            fitnessPost2.setTitle("Weekly Workout Schedule");
            fitnessPost2.setContent("Here's our training plan for the week...");
            fitnessPost2.setAuthor(2L);
            fitnessPost2.setPostedOn(LocalDateTime.now().minusDays(1));
            fitnessPost2.setLikes(12L);
            fitnessPost2.setDislikes(1L);
            Post savedFitnessPost2 = communityService.createPost(savedFitnessCommunity.getId(), fitnessPost2);

            Post fitnessPost3 = new Post();
            fitnessPost3.setTitle("Nutrition Tips for Athletes");
            fitnessPost3.setContent("Important guidelines for pre and post workout nutrition...");
            fitnessPost3.setAuthor(2L);
            fitnessPost3.setPostedOn(LocalDateTime.now().minusHours(8));
            fitnessPost3.setLikes(20L);
            fitnessPost3.setDislikes(2L);
            Post savedFitnessPost3 = communityService.createPost(savedFitnessCommunity.getId(), fitnessPost3);

            Comment fitnessComment2 = new Comment();
            fitnessComment2.setBody("Could you share some protein shake recipes?");
            fitnessComment2.setAuthor(3L);
            fitnessComment2.setPostedOn(LocalDateTime.now().minusHours(7));
            communityService.addComment(savedFitnessPost3.getId(), fitnessComment2);

            // Add student help request for fitness
            Post fitnessHelpPost = new Post();
            fitnessHelpPost.setTitle("Form Check - Squats");
            fitnessHelpPost.setContent("Not sure if I'm maintaining proper form during squats. Getting some knee pain.");
            fitnessHelpPost.setAuthor(1L);
            fitnessHelpPost.setPostedOn(LocalDateTime.now().minusHours(6));
            fitnessHelpPost.setLikes(4L);
            fitnessHelpPost.setDislikes(0L);
            Post savedFitnessHelp = communityService.createPost(savedFitnessCommunity.getId(), fitnessHelpPost);

            Comment fitnessHelpResponse = new Comment();
            fitnessHelpResponse.setBody("Let's check your form in person. Make sure your knees aren't going past your toes. We'll work on this in next session.");
            fitnessHelpResponse.setAuthor(2L);
            fitnessHelpResponse.setPostedOn(LocalDateTime.now().minusHours(5));
            communityService.addComment(savedFitnessHelp.getId(), fitnessHelpResponse);

            // Create Cooking Community
            Community cookingCommunity = new Community();
            cookingCommunity.setName("Cook Along Community");
            cookingCommunity.setOwnerId(3L); // Same as instructor ID from lesson3
            cookingCommunity.setLessonIds(Arrays.asList(7L, 8L, 9L)); // Include all cooking lessons
            Community savedCookingCommunity = communityService.createCommunity(cookingCommunity);

            // Create posts for Cooking
            Post cookingPost1 = new Post();
            cookingPost1.setTitle("Ingredients List for Next Session");
            cookingPost1.setContent("Please prepare these ingredients before the class...");
            cookingPost1.setAuthor(3L); // Set by community owner
            cookingPost1.setLikes(3L);
            cookingPost1.setPostedOn(LocalDateTime.now().minusHours(2));
            Post savedCookingPost1 = communityService.createPost(savedCookingCommunity.getId(), cookingPost1);

            Comment cookingComment1 = new Comment();
            cookingComment1.setBody("Can we substitute olive oil with vegetable oil?");
            cookingComment1.setAuthor(1L);
            cookingComment1.setPostedOn(LocalDateTime.now().minusHours(1));
            communityService.addComment(savedCookingPost1.getId(), cookingComment1);

            Comment cookingComment2 = new Comment();
            cookingComment2.setBody("Yes, that should work fine!");
            cookingComment2.setAuthor(3L);
            cookingComment2.setPostedOn(LocalDateTime.now().minusMinutes(30));
            communityService.addComment(savedCookingPost1.getId(), cookingComment2);

            // Additional posts for Cooking
            Post cookingPost2 = new Post();
            cookingPost2.setTitle("Knife Skills Workshop Recap");
            cookingPost2.setContent("Key takeaways from yesterday's session...");
            cookingPost2.setAuthor(3L);
            cookingPost2.setPostedOn(LocalDateTime.now().minusDays(1));
            cookingPost2.setLikes(18L);
            cookingPost2.setDislikes(0L);
            Post savedCookingPost2 = communityService.createPost(savedCookingCommunity.getId(), cookingPost2);

            Post cookingPost3 = new Post();
            cookingPost3.setTitle("Essential Spices Guide");
            cookingPost3.setContent("A comprehensive guide to spices every kitchen needs...");
            cookingPost3.setAuthor(3L);
            cookingPost3.setPostedOn(LocalDateTime.now().minusHours(6));
            cookingPost3.setLikes(25L);
            cookingPost3.setDislikes(1L);
            Post savedCookingPost3 = communityService.createPost(savedCookingCommunity.getId(), cookingPost3);

            Comment cookingComment3 = new Comment();
            cookingComment3.setBody("Where can we buy these spices?");
            cookingComment3.setAuthor(2L);
            cookingComment3.setPostedOn(LocalDateTime.now().minusHours(5));
            communityService.addComment(savedCookingPost3.getId(), cookingComment3);

            Comment cookingComment4 = new Comment();
            cookingComment4.setBody("I'll share some reliable online sources tomorrow");
            cookingComment4.setAuthor(3L);
            cookingComment4.setPostedOn(LocalDateTime.now().minusHours(4));
            communityService.addComment(savedCookingPost3.getId(), cookingComment4);

            // Add student help request for cooking
            Post cookingHelpPost = new Post();
            cookingHelpPost.setTitle("Need Help with Knife Techniques");
            cookingHelpPost.setContent("I'm struggling with julienne cuts. Any tips or video recommendations?");
            cookingHelpPost.setAuthor(2L);
            cookingHelpPost.setPostedOn(LocalDateTime.now().minusHours(3));
            cookingHelpPost.setLikes(2L);
            cookingHelpPost.setDislikes(0L);
            Post savedCookingHelp = communityService.createPost(savedCookingCommunity.getId(), cookingHelpPost);

            Comment cookingHelpResponse = new Comment();
            cookingHelpResponse.setBody("I'll demonstrate this in detail during tomorrow's session. Meanwhile, try holding the knife at a 20-degree angle.");
            cookingHelpResponse.setAuthor(3L);
            cookingHelpResponse.setPostedOn(LocalDateTime.now().minusHours(2));
            communityService.addComment(savedCookingHelp.getId(), cookingHelpResponse);
        };
    }
}
