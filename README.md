# 🌟 English Adventure - Microservices Learning Platform

English Adventure là một ứng dụng học tiếng Anh theo phong cách game RPG, được xây dựng với kiến trúc microservices hiện đại.

## 🏗️ Kiến trúc hệ thống

### Frontend
- **React + TypeScript**: Giao diện người dùng hiện đại
- **TailwindCSS**: Styling framework
- **React Router**: Routing
- **Axios**: HTTP client
- **Socket.io Client**: Real-time communication

### Backend Services

#### 1. User Service (Java Spring Boot)
- Quản lý người dùng, authentication, authorization
- JWT token-based security
- MySQL database
- Port: 8081

#### 2. Game Service (Java Spring Boot) 
- Quản lý game mechanics, levels, experience
- Leaderboard và achievements
- MySQL database
- Port: 8082

#### 3. Learning Service (Python FastAPI)
- Quản lý lessons, questions, progress
- Content management
- SQLite database
- Port: 8083

#### 4. Community Service (Python FastAPI)
- Posts, comments, social features
- Study groups
- SQLite database
- Port: 8084

### Infrastructure
- **Docker & Docker Compose**: Containerization
- **Nginx**: API Gateway & Load Balancer
- **MySQL**: Primary database cho Java services
- **SQLite**: Database cho Python services
- **Redis**: Caching & Session storage
- **MongoDB**: Analytics & Logging

## 🚀 Cách chạy ứng dụng

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (để development)
- Java 17+ (để development)
- Python 3.11+ (để development)

### 1. Chạy với Docker (Recommended)

```bash
# Clone repository
git clone <repository-url>
cd English_MicroWebApp

# Chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f
```

### 2. Development mode

#### Frontend (React)
```bash
cd frontend
npm install
npm start
# Chạy trên http://localhost:3000
```

#### User Service (Java)
```bash
cd backend/user-service
mvn spring-boot:run
# Chạy trên http://localhost:8081
```

#### Learning Service (Python)
```bash
cd backend/learning-service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8083
# Chạy trên http://localhost:8083
```

#### Community Service (Python)
```bash
cd backend/community-service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8084
# Chạy trên http://localhost:8084
```

## 🎮 Tính năng chính

### Game Features
- **Character Creation**: Tạo nhân vật học tập
- **Level System**: Hệ thống cấp độ từ A1 đến C2
- **Experience Points**: Kiếm XP qua việc học
- **Virtual Currency**: Hệ thống coin để mua items
- **Achievements**: Huy hiệu và thành tựu
- **Streaks**: Streak học tập hàng ngày

### Learning Features
- **Interactive Lessons**: Bài học tương tác
- **Multiple Question Types**: Nhiều dạng câu hỏi
- **Progress Tracking**: Theo dõi tiến trình học tập
- **Audio Support**: Hỗ trợ pronunciation
- **Spaced Repetition**: Lặp lại có khoảng cách

### Community Features
- **Social Posts**: Đăng bài chia sẻ
- **Study Groups**: Nhóm học tập
- **Leaderboards**: Bảng xếp hạng
- **Comments & Likes**: Tương tác xã hội
- **Achievement Sharing**: Chia sẻ thành tích

## 🌐 API Endpoints

### User Service
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile/{id}` - Xem profile
- `PUT /api/users/{id}/experience` - Cập nhật XP

### Learning Service
- `GET /api/lessons` - Danh sách bài học
- `GET /api/lessons/{id}` - Chi tiết bài học
- `POST /api/lessons/{id}/complete` - Hoàn thành bài học
- `GET /api/questions/{id}` - Chi tiết câu hỏi

### Community Service
- `GET /api/posts` - Danh sách posts
- `POST /api/posts` - Tạo post mới
- `GET /api/leaderboard` - Bảng xếp hạng
- `GET /api/study-groups` - Nhóm học tập

## 🔧 Configuration

### Environment Variables
```env
# Database
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=english_adventure

# JWT
JWT_SECRET=englishAdventureSecretKey2024
JWT_EXPIRATION=86400000

# API URLs
REACT_APP_API_URL=http://localhost:8080
REACT_APP_WS_URL=ws://localhost:8080
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (Java)
cd backend/user-service
mvn test

# Backend tests (Python)
cd backend/learning-service
pytest
```

## 📱 Mobile Support

Ứng dụng được thiết kế responsive và hỗ trợ mobile devices thông qua responsive design.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Email: support@englishadventure.com
- Discord: [English Adventure Community](https://discord.gg/englishadventure)

## 🚀 Future Enhancements

- [ ] AI-powered conversation practice
- [ ] Voice recognition for pronunciation
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (Korean, Japanese, etc.)
- [ ] Live streaming lessons
- [ ] Peer-to-peer tutoring system

---

**Happy Learning! 🎓✨**
