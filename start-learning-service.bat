@echo off
echo Starting Learning Service...
cd /d "D:\English_MicroWebApp\backend\learning-service"
python -m uvicorn main:app --reload --port 8083
