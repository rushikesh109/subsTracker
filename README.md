# SubsTracker API

A comprehensive subscription management system built with Express.js and MongoDB. SubsTracker helps users track, manage, and monitor their subscriptions with automated notifications and workflow automation.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Workflow](#workflow)

## 🎯 Overview

SubsTracker is a RESTful API that enables users to:
- Create and manage user accounts
- Track multiple subscriptions
- Receive email notifications
- Automate subscription workflows
- Monitor subscription spending and renewal dates

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (Cookies)
- **Email Service**: Nodemailer
- **Security**: Arcjet (Rate limiting & protection)
- **Task Scheduling**: Upstash (Cron jobs)
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
SubsTracker/
├── app.js                          # Main application entry point
├── package.json                    # Dependencies
├── config/                         # Configuration files
│   ├── env.js                     # Environment variables
│   ├── nodemailer.js              # Email configuration
│   ├── arcjet.js                  # Security middleware config
│   └── upstash.js                 # Task scheduling config
├── database/
│   └── mongodb.js                 # MongoDB connection
├── models/                         # Database schemas
│   ├── user.model.js              # User schema
│   └── subscription.model.js       # Subscription schema
├── controllers/                    # Business logic
│   ├── auth.controller.js          # Authentication logic
│   ├── user.controller.js          # User management
│   ├── subscription.controller.js  # Subscription operations
│   └── workflow.controller.js      # Workflow automation
├── routes/                         # API routes
│   ├── auth.routes.js              # Auth endpoints
│   ├── user.routes.js              # User endpoints
│   ├── subscription.routes.js      # Subscription endpoints
│   └── workflow.routes.js          # Workflow endpoints
├── middleware/                     # Custom middleware
│   ├── auth.middleware.js          # JWT verification
│   ├── error.middleware.js         # Error handling
│   └── arcjet.middleware.js        # Rate limiting
├── utils/                          # Helper functions
│   ├── send-email.js               # Email sending logic
│   └── email-template.js           # HTML email templates
└── README.md                       # This file
```

## ✨ Features

### 1. **User Authentication**
   - User registration & login
   - JWT-based authentication
   - Secure password handling
   - Cookie-based session management

### 2. **Subscription Management**
   - Add/edit/delete subscriptions
   - Track renewal dates
   - Monitor subscription costs
   - Categorize subscriptions

### 3. **Email Notifications**
   - Renewal reminders
   - Welcome emails
   - Subscription alerts
   - Custom email templates

### 4. **Security & Rate Limiting**
   - Arcjet protection against abuse
   - API rate limiting
   - Input validation
   - Error handling

### 5. **Workflow Automation**
   - Scheduled tasks with Upstash
   - Automated renewal reminders
   - Batch operations

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
```
POST   /register          # Register new user
POST   /login             # Login user
POST   /logout            # Logout user
POST   /refresh-token     # Refresh JWT token
```

### Users (`/api/v1/users`)
```
GET    /profile           # Get user profile
PUT    /profile           # Update user profile
DELETE /account           # Delete user account
GET    /                  # Get user details
```

### Subscriptions (`/api/v1/subscriptions`)
```
GET    /                  # Get all subscriptions
POST   /                  # Create new subscription
GET    /:id               # Get subscription by ID
PUT    /:id               # Update subscription
DELETE /:id               # Delete subscription
GET    /upcoming          # Get upcoming renewals
```

### Workflows (`/api/v1/workflows`)
```
GET    /                  # Get all workflows
POST   /                  # Create workflow
GET    /:id               # Get workflow by ID
PUT    /:id               # Update workflow
DELETE /:id               # Delete workflow
POST   /:id/trigger       # Manually trigger workflow
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB account
- Email service (Nodemailer configured)
- Upstash account (for background jobs)

### Installation Steps

1. **Clone the repository**
   ```bash
   cd SubsTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (see Environment Variables section)

4. **Start the server**
   ```bash
   npm start
   ```

   The API will be running at `http://localhost:PORT`

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subsTracker

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Arcjet (Security)
ARCJET_KEY=your_arcjet_key

# Upstash (Task Scheduling)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## 🏗 Architecture

### Request Flow

```
Client Request
    ↓
Express Server (app.js)
    ↓
Middleware Pipeline
├── express.json() - Parse JSON
├── urlencoded() - Parse form data
├── cookieParser() - Handle cookies
└── arcjetMiddleware - Security & rate limiting
    ↓
Route Handler
    ↓
Authentication Middleware (if protected route)
    ↓
Controller Logic
    ↓
Database Operations (MongoDB)
    ↓
Response to Client
    ↓
Error Middleware (if error occurs)
```

### Data Models

**User Model**
- `_id` - Unique identifier
- `email` - User email
- `password` - Hashed password
- `name` - Full name
- `subscriptions` - Array of subscription IDs
- `createdAt` - Account creation date

**Subscription Model**
- `_id` - Unique identifier
- `userId` - Reference to user
- `name` - Subscription name
- `cost` - Monthly/yearly cost
- `renewalDate` - Next renewal date
- `category` - Type of subscription
- `status` - Active/Inactive
- `autoRenew` - Auto-renewal flag
- `createdAt` - Creation date

## 📊 End-to-End Workflow

### Example: User Registration & Subscription Tracking

```
1. USER REGISTRATION
   User submits email & password
   ↓
   auth.controller.js validates input
   ↓
   Password hashed & stored in MongoDB
   ↓
   Welcome email sent (utils/send-email.js)
   ↓
   JWT token generated & returned

2. USER LOGIN
   User submits credentials
   ↓
   auth.middleware verifies password
   ↓
   JWT token created & stored in cookie
   ↓
   User logged in

3. ADD SUBSCRIPTION
   User submits subscription details
   ↓
   subscription.controller validates data
   ↓
   Subscription saved to MongoDB
   ↓
   Renewal reminder workflow triggered (Upstash)

4. RENEWAL REMINDER
   Upstash cron job runs at scheduled time
   ↓
   workflow.controller processes reminder
   ↓
   Email notification sent to user
   ↓
   Subscription status updated
```

## 📝 Key Middleware

1. **auth.middleware.js** - Verifies JWT tokens on protected routes
2. **error.middleware.js** - Centralized error handling
3. **arcjet.middleware.js** - Rate limiting and security protection

## 🔄 Background Jobs

Upstash handles scheduled tasks:
- Daily renewal reminders
- Weekly subscription summaries
- Automatic subscription expiration alerts

## 📧 Email Templates

Located in `utils/email-template.js`:
- Welcome email
- Renewal reminder
- Payment failed notification
- Account deletion confirmation

## 🛡️ Security Features

- ✅ Arcjet rate limiting
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support

## 🚦 Getting Started

1. Start the server: `npm start`
2. Access API at: `http://localhost:5000`
3. Test endpoint: `GET /` (should return welcome message)
4. Register user: `POST /api/v1/auth/register`
5. Add subscription: `POST /api/v1/subscriptions`

## 📞 Support

For issues or questions, check the relevant controller or middleware file for implementation details.

---

**SubsTracker API** - Never miss a subscription renewal! 🎯