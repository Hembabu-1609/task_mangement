# Task Management App

A full-stack Task Management System built using React.js, Node.js (Express), and MySQL.  
Users can sign up, log in, and manage their personal tasks — add, edit, delete, and filter them by status or deadline.  
Each user has their own task list (user-specific data isolation).

---

## Features

- Secure JWT Authentication
- Add, Edit, and Delete Tasks
- Filter Tasks by Status and Deadline
- User-specific Tasks (each user sees only their tasks)
- Elegant UI with Tailwind CSS
- RESTful API with Express.js
- Persistent Storage using MySQL

---

## Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router DOM  

### Backend
- Node.js + Express.js  
- JWT Authentication  
- MySQL Database  

---

## Folder Structure

project-root/
│
├── backend/
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── taskController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── taskRoutes.js
│ ├── package.json
│
└── frontend/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Dashboard.jsx
│ │ ├── TaskForm.jsx
│ ├── components/
│ │ ├── TaskCard.jsx
│ │ ├── FilterBar.jsx
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── services/
│ │ └── api.js
│ ├── App.jsx
│ ├── main.jsx
├── package.json


---

##  Installation & Setup

###  Clone the Repository
bash
git clone https://github.com/yourusername/task_management.git
cd task-management-app

Setup the Backend
cd backend
npm install

Create .env File
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskdb

Start the Backend Server
npm run dev

Setup the Frontend
cd ../frontend
npm install
npm start

Setup the Mobile
flutter pub get
flutter run


MySQL Database Setup
Run the following SQL commands to create your database and tables:

CREATE DATABASE task_manager;

USE task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  deadline DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

API Routes
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Authenticate and return JWT token
Task Routes (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks for logged-in user
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a specific task
DELETE	/api/tasks/:id	Delete a specific task

Usage

Sign up or log in with your credentials.

Add tasks with title, description, status, and deadline.

Edit or delete tasks as needed.

Filter tasks by status or deadline using the stylish Filter Bar.

Each user’s dashboard displays only their own tasks.