# JKR-Store 🛍️

A modern, full-stack e-commerce web application built with React and Node.js. This project features a dynamic shopping experience with user authentication, product management, and a responsive design.

![JKR-Store Homepage](homePage.png)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure login and registration system with JWT
- **Product Catalog**: Browse and search through products
- **Shopping Cart**: Add, remove, and manage cart items
- **Responsive Design**: Optimized for desktop and mobile devices
- **Firebase Integration**: Cloud storage and authentication
- **Toast Notifications**: User-friendly feedback for actions
- **Protected Routes**: Secure access control for authenticated users

## 🛠️ Tech Stack

### Frontend (Client)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication and cloud services
- **React Toastify** - Toast notifications
- **UUID** - Unique identifier generation

### Backend (Server)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
JKR-Store/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── assets/        # Images, icons, and static files
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context providers
│   │   ├── controllers/   # Business logic
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configurations
│   │   ├── App.jsx        # Main app component
│   │   ├── firebase.js    # Firebase configuration
│   │   └── main.jsx       # Application entry point
│   ├── public/            # Public assets
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend application
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Custom middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
│
└── homePage.png           # Project screenshot
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Firebase account** (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JKR-Store
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Configuration

#### Client Setup

1. Create a `.env` file in the `client` directory
2. Add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

#### Server Setup

1. Create a `.env` file in the `server` directory
2. Add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # Email configuration (for Nodemailer)
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

## 💻 Available Scripts

### Client (Frontend)

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server (Backend)

```bash
npm run dev      # Start development server with Nodemon
```

### Running the Full Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **In a new terminal, start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 🌐 Environment Variables

### Client `.env`
| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

### Server `.env`
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NODE_ENV` | Environment (development/production) |
| `EMAIL_USER` | Email for Nodemailer |
| `EMAIL_PASS` | Email password for Nodemailer |

## 📄 License

This project is created for portfolio purposes.

---

**Built with ❤️ by Jonas**
