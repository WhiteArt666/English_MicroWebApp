@echo off
echo Starting User Service...
cd /d "D:\English_MicroWebApp\backend\user-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev
