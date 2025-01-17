package com.heymax.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SkillshubService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String BASE_URL = "http://localhost:8081/api/lessons/";

    public void enrollStudent(Long lessonId, Long studentId) {
        String url = BASE_URL + lessonId + "/enroll/" + studentId;
        restTemplate.postForObject(url, null, Void.class);
    }
}
