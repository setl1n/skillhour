package com.heymax.user_service.controller;

import com.heymax.user_service.entity.User;
import com.heymax.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.verifyUser(user.getUsername(), user.getPassword()));
    }
}
