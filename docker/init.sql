-- Create databases for each service
CREATE DATABASE IF NOT EXISTS english_adventure_users;
CREATE DATABASE IF NOT EXISTS english_adventure_game;

-- Use the user database
USE english_adventure_users;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    character_name VARCHAR(100),
    level INT DEFAULT 1,
    experience INT DEFAULT 0,
    coins INT DEFAULT 0,
    current_language_level VARCHAR(10) DEFAULT 'A1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (username, email, password, character_name, level, experience, coins, current_language_level) VALUES
('EnglishMaster', 'master@example.com', '$2a$10$encrypted_password', 'The English Master', 25, 12500, 2500, 'C1'),
('WordWizard', 'wizard@example.com', '$2a$10$encrypted_password', 'Word Wizard', 22, 11200, 2240, 'B2'),
('GrammarGuru', 'guru@example.com', '$2a$10$encrypted_password', 'Grammar Guru', 20, 10100, 2020, 'B2'),
('StudyBuddy', 'buddy@example.com', '$2a$10$encrypted_password', 'Study Buddy', 18, 9200, 1840, 'B1'),
('EnglishLearner01', 'learner@example.com', '$2a$10$encrypted_password', 'English Learner', 15, 7500, 1500, 'A2');

-- Use the game database
USE english_adventure_game;

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    badge_url VARCHAR(255),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT,
    attempts INT DEFAULT 0,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample achievements
INSERT INTO achievements (user_id, achievement_type, title, description, badge_url) VALUES
(1, 'streak', 'Consistency King', 'Completed lessons for 30 days in a row', '/badges/streak_30.png'),
(1, 'level', 'Level Master', 'Reached level 25', '/badges/level_25.png'),
(2, 'vocabulary', 'Word Collector', 'Learned 1000 new words', '/badges/vocabulary_1000.png'),
(3, 'grammar', 'Grammar Expert', 'Mastered all grammar lessons', '/badges/grammar_master.png');
