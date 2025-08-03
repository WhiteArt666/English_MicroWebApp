from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
import random

app = FastAPI(title="Learning Service", description="English Adventure Learning Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Lesson(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    level: str  # A1, A2, B1, B2, C1, C2
    type: str  # vocabulary, grammar, listening, speaking, reading, writing
    content: dict
    experience_reward: int
    coin_reward: int

class Question(BaseModel):
    id: Optional[int] = None
    lesson_id: int
    question_text: str
    question_type: str  # multiple_choice, fill_blank, translate, audio
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: Optional[str] = None

class UserProgress(BaseModel):
    user_id: int
    lesson_id: int
    completed: bool = False
    score: Optional[int] = None
    attempts: int = 0

# Sample data
SAMPLE_LESSONS = [
    {
        "id": 1,
        "title": "Basic Greetings",
        "description": "Learn how to greet people in English",
        "level": "A1",
        "type": "vocabulary",
        "content": {
            "words": [
                {"english": "Hello", "vietnamese": "Xin chào", "audio": "/audio/hello.mp3"},
                {"english": "Good morning", "vietnamese": "Chào buổi sáng", "audio": "/audio/good_morning.mp3"},
                {"english": "Good evening", "vietnamese": "Chào buổi tối", "audio": "/audio/good_evening.mp3"},
                {"english": "How are you?", "vietnamese": "Bạn khỏe không?", "audio": "/audio/how_are_you.mp3"},
                {"english": "Nice to meet you", "vietnamese": "Rất vui được gặp bạn", "audio": "/audio/nice_to_meet_you.mp3"}
            ]
        },
        "experience_reward": 50,
        "coin_reward": 10
    },
    {
        "id": 2,
        "title": "Numbers 1-20",
        "description": "Learn numbers from 1 to 20",
        "level": "A1",
        "type": "vocabulary",
        "content": {
            "words": [
                {"english": "One", "vietnamese": "Một", "number": 1},
                {"english": "Two", "vietnamese": "Hai", "number": 2},
                {"english": "Three", "vietnamese": "Ba", "number": 3},
                {"english": "Four", "vietnamese": "Bốn", "number": 4},
                {"english": "Five", "vietnamese": "Năm", "number": 5}
            ]
        },
        "experience_reward": 40,
        "coin_reward": 8
    },
    {
        "id": 3,
        "title": "Present Simple Tense",
        "description": "Understanding the present simple tense",
        "level": "A2",
        "type": "grammar",
        "content": {
            "rules": [
                "Use present simple for habits and facts",
                "Add -s or -es for third person singular",
                "Use 'do/does' for questions and negatives"
            ],
            "examples": [
                {"sentence": "I work every day", "explanation": "First person, no -s"},
                {"sentence": "He works every day", "explanation": "Third person singular, add -s"},
                {"sentence": "Do you work?", "explanation": "Question form with 'do'"}
            ]
        },
        "experience_reward": 75,
        "coin_reward": 15
    }
]

SAMPLE_QUESTIONS = [
    {
        "id": 1,
        "lesson_id": 1,
        "question_text": "How do you say 'Xin chào' in English?",
        "question_type": "multiple_choice",
        "options": ["Hello", "Goodbye", "Thank you", "Please"],
        "correct_answer": "Hello",
        "explanation": "'Hello' is the most common way to greet someone in English."
    },
    {
        "id": 2,
        "lesson_id": 1,
        "question_text": "Complete: 'Good ______ (buổi sáng)'",
        "question_type": "fill_blank",
        "correct_answer": "morning",
        "explanation": "'Good morning' is used to greet someone in the morning."
    },
    {
        "id": 3,
        "lesson_id": 2,
        "question_text": "What number is 'Three'?",
        "question_type": "multiple_choice",
        "options": ["2", "3", "4", "5"],
        "correct_answer": "3",
        "explanation": "'Three' is the number 3."
    }
]

@app.get("/")
async def root():
    return {"message": "Learning Service is running!"}

@app.get("/api/lessons")
async def get_lessons(level: Optional[str] = None, type: Optional[str] = None):
    """Get all lessons, optionally filtered by level and type"""
    lessons = SAMPLE_LESSONS.copy()
    
    if level:
        lessons = [l for l in lessons if l["level"] == level]
    
    if type:
        lessons = [l for l in lessons if l["type"] == type]
    
    return {"lessons": lessons}

@app.get("/api/lessons/{lesson_id}")
async def get_lesson(lesson_id: int):
    """Get a specific lesson by ID"""
    lesson = next((l for l in SAMPLE_LESSONS if l["id"] == lesson_id), None)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@app.get("/api/lessons/{lesson_id}/questions")
async def get_lesson_questions(lesson_id: int):
    """Get all questions for a specific lesson"""
    questions = [q for q in SAMPLE_QUESTIONS if q["lesson_id"] == lesson_id]
    return {"questions": questions}

@app.post("/api/lessons/{lesson_id}/complete")
async def complete_lesson(lesson_id: int, user_progress: UserProgress):
    """Mark a lesson as completed and calculate rewards"""
    lesson = next((l for l in SAMPLE_LESSONS if l["id"] == lesson_id), None)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Calculate final score and rewards
    experience_earned = lesson["experience_reward"]
    coins_earned = lesson["coin_reward"]
    
    # Bonus for high score
    if user_progress.score and user_progress.score >= 80:
        experience_earned = int(experience_earned * 1.2)
        coins_earned = int(coins_earned * 1.2)
    
    return {
        "message": "Lesson completed successfully!",
        "experience_earned": experience_earned,
        "coins_earned": coins_earned,
        "score": user_progress.score
    }

@app.post("/api/questions/{question_id}/answer")
async def submit_answer(question_id: int, answer: dict):
    """Submit an answer for a question"""
    question = next((q for q in SAMPLE_QUESTIONS if q["id"] == question_id), None)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    user_answer = answer.get("answer", "").strip().lower()
    correct_answer = question["correct_answer"].strip().lower()
    
    is_correct = user_answer == correct_answer
    
    return {
        "correct": is_correct,
        "correct_answer": question["correct_answer"],
        "explanation": question.get("explanation", ""),
        "user_answer": answer.get("answer", "")
    }

@app.get("/api/levels/{level}/progress")
async def get_level_progress(level: str, user_id: int):
    """Get user's progress for a specific level"""
    level_lessons = [l for l in SAMPLE_LESSONS if l["level"] == level]
    
    # Mock progress data
    progress = {
        "level": level,
        "total_lessons": len(level_lessons),
        "completed_lessons": random.randint(0, len(level_lessons)),
        "total_experience": sum(l["experience_reward"] for l in level_lessons),
        "earned_experience": random.randint(0, sum(l["experience_reward"] for l in level_lessons))
    }
    
    return progress

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8083)
