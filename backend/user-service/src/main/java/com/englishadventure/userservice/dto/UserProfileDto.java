package com.englishadventure.userservice.dto;

import java.time.LocalDateTime;

public class UserProfileDto {
    private Long id;
    private String username;
    private String email;
    private String avatarUrl;
    private String characterName;
    private Integer level;
    private Integer experience;
    private Integer coins;
    private String currentLanguageLevel;
    private LocalDateTime createdAt;
    
    // Constructors
    public UserProfileDto() {}
    
    public UserProfileDto(Long id, String username, String email, String avatarUrl, 
                         String characterName, Integer level, Integer experience, 
                         Integer coins, String currentLanguageLevel) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.characterName = characterName;
        this.level = level;
        this.experience = experience;
        this.coins = coins;
        this.currentLanguageLevel = currentLanguageLevel;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    
    public String getCharacterName() { return characterName; }
    public void setCharacterName(String characterName) { this.characterName = characterName; }
    
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    
    public Integer getExperience() { return experience; }
    public void setExperience(Integer experience) { this.experience = experience; }
    
    public Integer getCoins() { return coins; }
    public void setCoins(Integer coins) { this.coins = coins; }
    
    public String getCurrentLanguageLevel() { return currentLanguageLevel; }
    public void setCurrentLanguageLevel(String currentLanguageLevel) { this.currentLanguageLevel = currentLanguageLevel; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
