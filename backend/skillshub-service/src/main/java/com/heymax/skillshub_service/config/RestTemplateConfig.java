package com.heymax.skillshub_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    @Value("${service.admin-key}")
    private String adminKey;

    @Value("${service.user-service-url}")
    private String userServiceUrl;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public String adminKey() {
        return adminKey;
    }

    @Bean
    public String userServiceUrl() {
        return userServiceUrl;
    }
}
