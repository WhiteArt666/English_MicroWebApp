package com.englishadventure.userservice.controller;

import com.englishadventure.userservice.dto.UserRegistrationDto;
import com.englishadventure.userservice.dto.UserLoginDto;
import com.englishadventure.userservice.dto.UserProfileDto;
import com.englishadventure.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            UserProfileDto user = userService.registerUser(registrationDto);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDto loginDto) {
        try {
            String token = userService.loginUser(loginDto);
            return ResponseEntity.ok().body("{\"token\":\"" + token + "\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try {
            UserProfileDto profile = userService.getUserProfile(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get profile: " + e.getMessage());
        }
    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable Long userId, 
            @RequestBody UserProfileDto profileDto) {
        try {
            UserProfileDto updatedProfile = userService.updateUserProfile(userId, profileDto);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update profile: " + e.getMessage());
        }
    }
    
    @PutMapping("/{userId}/experience")
    public ResponseEntity<?> addExperience(
            @PathVariable Long userId, 
            @RequestParam Integer experience) {
        try {
            UserProfileDto updatedProfile = userService.addExperience(userId, experience);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add experience: " + e.getMessage());
        }
    }
    
    @PutMapping("/{userId}/coins")
    public ResponseEntity<?> addCoins(
            @PathVariable Long userId, 
            @RequestParam Integer coins) {
        try {
            UserProfileDto updatedProfile = userService.addCoins(userId, coins);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add coins: " + e.getMessage());
        }
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard() {
        return ResponseEntity.ok(userService.getLeaderboard());
    }
}
