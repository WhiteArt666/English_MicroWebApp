<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# English Adventure - Microservices Learning Platform

This is a comprehensive English learning platform built with microservices architecture, featuring gamification elements and community features.

## Project Structure
- **Frontend**: React + TypeScript with TailwindCSS
- **Backend Services**: 
  - User Service (Java Spring Boot) - Authentication, user management
  - Game Service (Java Spring Boot) - Game mechanics, achievements  
  - Learning Service (Python FastAPI) - Lessons, questions, progress
  - Community Service (Python FastAPI) - Social features, posts, groups
- **Infrastructure**: Docker, Nginx, MySQL, Redis, MongoDB

## Code Style Guidelines

### Frontend (React/TypeScript)
- Use functional components with hooks
- Use TypeScript interfaces for type definitions
- Follow React hooks rules and best practices
- Use TailwindCSS for styling with responsive design
- Implement proper error handling and loading states
- Use React Router for navigation
- Context API for global state management

### Backend (Java Spring Boot)
- Follow REST API conventions
- Use proper HTTP status codes
- Implement JWT-based authentication
- Use JPA entities with proper relationships
- Follow Spring Boot best practices
- Implement proper exception handling
- Use DTOs for API requests/responses

### Backend (Python FastAPI)
- Use Pydantic models for request/response validation
- Follow REST API conventions
- Implement proper async/await patterns
- Use proper HTTP status codes
- Include comprehensive API documentation
- Follow Python PEP 8 style guide

## Key Features to Implement
- Gamification elements (XP, levels, achievements, coins)
- Interactive learning lessons with multiple question types
- Real-time community features
- Progress tracking and analytics
- Responsive design for mobile devices
- Microservices communication patterns

## Security Considerations
- Implement proper JWT token validation
- Use HTTPS in production
- Sanitize user inputs
- Implement rate limiting
- Follow OWASP security guidelines

## Performance Guidelines
- Optimize database queries
- Implement caching strategies
- Use pagination for large datasets
- Optimize frontend bundle size
- Implement proper error boundaries

When generating code, ensure it follows these patterns and integrates well with the existing codebase structure.
