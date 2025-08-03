@echo off
echo Starting development environment...

REM Start only databases and infrastructure
docker-compose -f docker-compose.dev.yml up -d

echo Infrastructure started. You can now run services locally:
echo.
echo For Java services:
echo cd backend\user-service ^&^& mvnw spring-boot:run
echo cd backend\game-service ^&^& mvnw spring-boot:run
echo.
echo For Python services:
echo cd backend\learning-service ^&^& python -m uvicorn main:app --reload --port 8083
echo cd backend\community-service ^&^& python -m uvicorn main:app --reload --port 8084
echo.
echo For Frontend:
echo cd frontend ^&^& npm start
