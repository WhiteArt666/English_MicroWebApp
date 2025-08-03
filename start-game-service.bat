@echo off
echo Starting Game Service...
cd /d "D:\English_MicroWebApp\backend\game-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev
