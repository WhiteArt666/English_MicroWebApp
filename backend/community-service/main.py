from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
import json

app = FastAPI(title="Community Service", description="English Adventure Community Features")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Post(BaseModel):
    id: Optional[int] = None
    user_id: int
    username: str
    title: str
    content: str
    type: str  # achievement, question, discussion, progress
    likes: int = 0
    comments_count: int = 0
    created_at: Optional[str] = None

class Comment(BaseModel):
    id: Optional[int] = None
    post_id: int
    user_id: int
    username: str
    content: str
    created_at: Optional[str] = None

class Achievement(BaseModel):
    id: Optional[int] = None
    user_id: int
    username: str
    achievement_type: str
    title: str
    description: str
    badge_url: Optional[str] = None
    earned_at: Optional[str] = None

class LeaderboardEntry(BaseModel):
    user_id: int
    username: str
    level: int
    experience: int
    current_streak: int
    total_lessons_completed: int
    avatar_url: Optional[str] = None

# Sample data
SAMPLE_POSTS = [
    {
        "id": 1,
        "user_id": 1,
        "username": "EnglishLearner01",
        "title": "Just completed my first 50 lessons! 🎉",
        "content": "So excited to share that I've just completed 50 lessons in English Adventure! The gamification really helps keep me motivated. My favorite lessons so far are the vocabulary ones with audio pronunciation.",
        "type": "achievement",
        "likes": 23,
        "comments_count": 5,
        "created_at": "2024-01-15T10:30:00Z"
    },
    {
        "id": 2,
        "user_id": 2,
        "username": "StudyBuddy",
        "title": "Help with Present Perfect Tense?",
        "content": "Hi everyone! I'm struggling with understanding when to use Present Perfect vs Simple Past. Can anyone explain the difference with some examples? Thanks!",
        "type": "question",
        "likes": 8,
        "comments_count": 12,
        "created_at": "2024-01-14T15:45:00Z"
    },
    {
        "id": 3,
        "user_id": 3,
        "username": "GrammarGuru",
        "title": "Weekly Progress Update - Level B1 Achieved! 📚",
        "content": "After 3 months of consistent practice, I finally reached B1 level! Key tips that helped me: 1) Daily vocabulary practice, 2) Listening to English podcasts, 3) Joining study groups. Keep going everyone!",
        "type": "progress",
        "likes": 45,
        "comments_count": 18,
        "created_at": "2024-01-13T20:15:00Z"
    }
]

SAMPLE_LEADERBOARD = [
    {
        "user_id": 1,
        "username": "EnglishMaster",
        "level": 25,
        "experience": 12500,
        "current_streak": 45,
        "total_lessons_completed": 250,
        "avatar_url": "/avatars/user1.png"
    },
    {
        "user_id": 2,
        "username": "WordWizard",
        "level": 22,
        "experience": 11200,
        "current_streak": 32,
        "total_lessons_completed": 224,
        "avatar_url": "/avatars/user2.png"
    },
    {
        "user_id": 3,
        "username": "GrammarGuru",
        "level": 20,
        "experience": 10100,
        "current_streak": 28,
        "total_lessons_completed": 202,
        "avatar_url": "/avatars/user3.png"
    },
    {
        "user_id": 4,
        "username": "StudyBuddy",
        "level": 18,
        "experience": 9200,
        "current_streak": 15,
        "total_lessons_completed": 184,
        "avatar_url": "/avatars/user4.png"
    },
    {
        "user_id": 5,
        "username": "EnglishLearner01",
        "level": 15,
        "experience": 7500,
        "current_streak": 22,
        "total_lessons_completed": 150,
        "avatar_url": "/avatars/user5.png"
    }
]

@app.get("/")
async def root():
    return {"message": "Community Service is running!"}

@app.get("/api/posts")
async def get_posts(type: Optional[str] = None, limit: int = 20):
    """Get community posts, optionally filtered by type"""
    posts = SAMPLE_POSTS.copy()
    
    if type:
        posts = [p for p in posts if p["type"] == type]
    
    return {"posts": posts[:limit]}

@app.get("/api/posts/{post_id}")
async def get_post(post_id: int):
    """Get a specific post by ID"""
    post = next((p for p in SAMPLE_POSTS if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/api/posts")
async def create_post(post: Post):
    """Create a new community post"""
    # In a real app, you would save to database
    new_post = post.dict()
    new_post["id"] = len(SAMPLE_POSTS) + 1
    new_post["created_at"] = "2024-01-16T12:00:00Z"
    SAMPLE_POSTS.append(new_post)
    
    return {"message": "Post created successfully", "post": new_post}

@app.post("/api/posts/{post_id}/like")
async def like_post(post_id: int, user_id: int):
    """Like or unlike a post"""
    post = next((p for p in SAMPLE_POSTS if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Toggle like (simplified logic)
    post["likes"] += 1
    
    return {"message": "Post liked", "likes": post["likes"]}

@app.get("/api/leaderboard")
async def get_leaderboard(period: str = "all_time", limit: int = 10):
    """Get leaderboard data"""
    # In a real app, you would filter by period (weekly, monthly, all_time)
    leaderboard = SAMPLE_LEADERBOARD[:limit]
    
    return {
        "period": period,
        "leaderboard": leaderboard,
        "last_updated": "2024-01-16T12:00:00Z"
    }

@app.get("/api/achievements")
async def get_achievements(user_id: Optional[int] = None):
    """Get achievements, optionally for a specific user"""
    # Sample achievements
    achievements = [
        {
            "id": 1,
            "user_id": 1,
            "username": "EnglishMaster",
            "achievement_type": "streak",
            "title": "Consistency King",
            "description": "Completed lessons for 30 days in a row",
            "badge_url": "/badges/streak_30.png",
            "earned_at": "2024-01-10T09:00:00Z"
        },
        {
            "id": 2,
            "user_id": 1,
            "username": "EnglishMaster",
            "achievement_type": "level",
            "title": "Level Master",
            "description": "Reached level 25",
            "badge_url": "/badges/level_25.png",
            "earned_at": "2024-01-15T14:30:00Z"
        }
    ]
    
    if user_id:
        achievements = [a for a in achievements if a["user_id"] == user_id]
    
    return {"achievements": achievements}

@app.get("/api/users/{user_id}/stats")
async def get_user_stats(user_id: int):
    """Get comprehensive user statistics"""
    # Sample user stats
    stats = {
        "user_id": user_id,
        "total_study_time": 1250,  # minutes
        "lessons_completed": 156,
        "current_streak": 23,
        "longest_streak": 45,
        "favorite_lesson_type": "vocabulary",
        "weekly_activity": [5, 7, 6, 8, 9, 7, 6],  # lessons per day
        "level_progression": [
            {"level": 1, "date": "2023-10-01"},
            {"level": 5, "date": "2023-11-01"},
            {"level": 10, "date": "2023-12-01"},
            {"level": 15, "date": "2024-01-01"},
            {"level": 18, "date": "2024-01-15"}
        ]
    }
    
    return stats

@app.get("/api/study-groups")
async def get_study_groups():
    """Get available study groups"""
    groups = [
        {
            "id": 1,
            "name": "A1 Beginners",
            "description": "Perfect for absolute beginners",
            "member_count": 45,
            "level": "A1",
            "is_public": True
        },
        {
            "id": 2,
            "name": "Business English",
            "description": "Focus on professional English skills",
            "member_count": 28,
            "level": "B2",
            "is_public": True
        },
        {
            "id": 3,
            "name": "IELTS Preparation",
            "description": "Prepare for IELTS exam together",
            "member_count": 67,
            "level": "B1",
            "is_public": True
        }
    ]
    
    return {"study_groups": groups}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8084)
