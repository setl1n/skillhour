package com.heymax.user_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String id;
    private String name;
    private String email;
    private String token;
    private int timeCred;
}
