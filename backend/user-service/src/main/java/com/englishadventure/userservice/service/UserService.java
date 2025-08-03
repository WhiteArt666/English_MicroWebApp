package com.englishadventure.userservice.service;

import com.englishadventure.userservice.dto.UserLoginDto;
import com.englishadventure.userservice.dto.UserProfileDto;
import com.englishadventure.userservice.dto.UserRegistrationDto;
import com.englishadventure.userservice.entity.User;
import com.englishadventure.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UserProfileDto registerUser(UserRegistrationDto registrationDto) throws Exception {
        // Check if user already exists
        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            throw new Exception("User with this email already exists");
        }
        
        if (userRepository.findByUsername(registrationDto.getUsername()).isPresent()) {
            throw new Exception("User with this username already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setLevel(1);
        user.setExperience(0);
        user.setCoins(100); // Starting coins
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        User savedUser = userRepository.save(user);
        
        // Convert to DTO
        UserProfileDto profileDto = new UserProfileDto();
        profileDto.setId(savedUser.getId());
        profileDto.setUsername(savedUser.getUsername());
        profileDto.setEmail(savedUser.getEmail());
        profileDto.setLevel(savedUser.getLevel());
        profileDto.setExperience(savedUser.getExperience());
        profileDto.setCoins(savedUser.getCoins());
        profileDto.setCreatedAt(savedUser.getCreatedAt());
        
        return profileDto;
    }
    
    public UserProfileDto authenticateUser(UserLoginDto loginDto) throws Exception {
        Optional<User> userOpt = userRepository.findByUsername(loginDto.getUsername());
        
        if (userOpt.isEmpty()) {
            throw new Exception("Invalid username or password");
        }
        
        User user = userOpt.get();
        
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new Exception("Invalid username or password");
        }
        
        // Convert to DTO
        UserProfileDto profileDto = new UserProfileDto();
        profileDto.setId(user.getId());
        profileDto.setUsername(user.getUsername());
        profileDto.setEmail(user.getEmail());
        profileDto.setLevel(user.getLevel());
        profileDto.setExperience(user.getExperience());
        profileDto.setCoins(user.getCoins());
        profileDto.setCreatedAt(user.getCreatedAt());
        
        return profileDto;
    }
    
    public UserProfileDto getUserProfile(Long userId) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User user = userOpt.get();
        
        // Convert to DTO
        UserProfileDto profileDto = new UserProfileDto();
        profileDto.setId(user.getId());
        profileDto.setUsername(user.getUsername());
        profileDto.setEmail(user.getEmail());
        profileDto.setLevel(user.getLevel());
        profileDto.setExperience(user.getExperience());
        profileDto.setCoins(user.getCoins());
        profileDto.setCreatedAt(user.getCreatedAt());
        
        return profileDto;
    }
    
    public UserProfileDto updateUserProfile(Long userId, UserProfileDto profileDto) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User user = userOpt.get();
        
        // Update fields if provided
        if (profileDto.getUsername() != null) {
            user.setUsername(profileDto.getUsername());
        }
        if (profileDto.getEmail() != null) {
            user.setEmail(profileDto.getEmail());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        
        // Convert to DTO
        UserProfileDto updatedProfileDto = new UserProfileDto();
        updatedProfileDto.setId(updatedUser.getId());
        updatedProfileDto.setUsername(updatedUser.getUsername());
        updatedProfileDto.setEmail(updatedUser.getEmail());
        updatedProfileDto.setLevel(updatedUser.getLevel());
        updatedProfileDto.setExperience(updatedUser.getExperience());
        updatedProfileDto.setCoins(updatedUser.getCoins());
        updatedProfileDto.setCreatedAt(updatedUser.getCreatedAt());
        
        return updatedProfileDto;
    }
    
    public String loginUser(UserLoginDto loginDto) throws Exception {
        UserProfileDto user = authenticateUser(loginDto);
        // For now, just return a simple token. In a real implementation, you would use JWT
        return "dummy_token_for_user_" + user.getId();
    }
    
    public UserProfileDto addExperience(Long userId, Integer experienceToAdd) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User user = userOpt.get();
        user.setExperience(user.getExperience() + experienceToAdd);
        
        // Level up logic - every 100 XP = 1 level
        int newLevel = (user.getExperience() / 100) + 1;
        if (newLevel > user.getLevel()) {
            user.setLevel(newLevel);
            user.setCoins(user.getCoins() + (newLevel - user.getLevel() + 1) * 10); // Bonus coins for leveling up
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        
        // Convert to DTO
        UserProfileDto profileDto = new UserProfileDto();
        profileDto.setId(updatedUser.getId());
        profileDto.setUsername(updatedUser.getUsername());
        profileDto.setEmail(updatedUser.getEmail());
        profileDto.setLevel(updatedUser.getLevel());
        profileDto.setExperience(updatedUser.getExperience());
        profileDto.setCoins(updatedUser.getCoins());
        profileDto.setCreatedAt(updatedUser.getCreatedAt());
        
        return profileDto;
    }
    
    public UserProfileDto addCoins(Long userId, Integer coinsToAdd) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User user = userOpt.get();
        user.setCoins(user.getCoins() + coinsToAdd);
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        
        // Convert to DTO
        UserProfileDto profileDto = new UserProfileDto();
        profileDto.setId(updatedUser.getId());
        profileDto.setUsername(updatedUser.getUsername());
        profileDto.setEmail(updatedUser.getEmail());
        profileDto.setLevel(updatedUser.getLevel());
        profileDto.setExperience(updatedUser.getExperience());
        profileDto.setCoins(updatedUser.getCoins());
        profileDto.setCreatedAt(updatedUser.getCreatedAt());
        
        return profileDto;
    }
    
    public Object getLeaderboard() {
        // Get top 10 users by experience
        return userRepository.findAll().stream()
            .sorted((u1, u2) -> u2.getExperience().compareTo(u1.getExperience()))
            .limit(10)
            .map(user -> {
                UserProfileDto dto = new UserProfileDto();
                dto.setId(user.getId());
                dto.setUsername(user.getUsername());
                dto.setLevel(user.getLevel());
                dto.setExperience(user.getExperience());
                dto.setCoins(user.getCoins());
                return dto;
            })
            .toList();
    }
}
