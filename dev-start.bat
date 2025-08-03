@echo off
echo =================================
echo   English Adventure Dev Setup
echo =================================
echo.

REM Check if infrastructure is running
docker-compose -f docker-compose.dev.yml ps
echo.

echo Available commands:
echo.
echo 1. .\dev-start.bat infrastructure    - Start DB, Eureka, Redis, MongoDB
echo 2. .\dev-start.bat user-service      - Build and run user-service
echo 3. .\dev-start.bat game-service      - Build and run game-service
echo 4. .\dev-start.bat learning-service  - Build and run learning-service
echo 5. .\dev-start.bat frontend          - Start React frontend
echo 6. .\dev-start.bat stop              - Stop all services
echo.

if "%1"=="infrastructure" (
    echo Starting infrastructure...
    docker-compose -f docker-compose.dev.yml up -d
    goto end
)

if "%1"=="user-service" (
    echo Building and starting user-service...
    docker-compose build user-service
    docker-compose up -d --no-deps user-service
    goto end
)

if "%1"=="game-service" (
    echo Building and starting game-service...
    docker-compose build game-service
    docker-compose up -d --no-deps game-service
    goto end
)

if "%1"=="learning-service" (
    echo Building and starting learning-service...
    docker-compose build learning-service
    docker-compose up -d --no-deps learning-service
    goto end
)

if "%1"=="frontend" (
    echo Starting frontend...
    cd frontend
    start npm start
    cd ..
    goto end
)

if "%1"=="stop" (
    echo Stopping all services...
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    goto end
)

:end
echo.
echo Done!
