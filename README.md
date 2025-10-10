# 💬 ConvoSphere - Real-Time Chat Application

**ConvoSphere** is a full-stack, real-time messaging application designed for instant and seamless communication.  
It features a modern, responsive user interface and a robust backend to support real-time interactions, user authentication, and persistent message history.

---

## ✨ Features

- **Real-Time Messaging:** Instantly send and receive messages with anyone, powered by WebSockets.  
- **User Authentication:** Secure user sign-up and login functionality using JWT tokens.  
- **Persistent Chat History:** All conversations are stored and can be retrieved at any time.  
- **User Profiles:** Users can set their own profile picture and display name.  
- **Contact Management:** Easily search for and start conversations with other registered users.  
- **Online Presence:** See which users are currently online.  
- **Responsive Design:** A clean and modern UI that works seamlessly on both desktop and mobile devices.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js:** For building user interfaces.  
- **Redux Toolkit:** For efficient and predictable state management.  
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.  
- **Socket.IO Client:** For establishing real-time communication with the server.  
- **Vite:** A next-generation frontend build tool for a faster and leaner development experience.  

### **Backend**
- **Node.js:** JavaScript runtime environment.  
- **Express.js:** Minimal and flexible Node.js web application framework.  
- **MongoDB:** NoSQL database for storing user and message data.  
- **Mongoose:** Elegant MongoDB object modeling tool for Node.js.  
- **Socket.IO:** Enables real-time, bidirectional, and event-based communication.  
- **JSON Web Tokens (JWT):** For securing the API.  
- **Bcrypt:** For hashing user passwords.  
- **Multer:** Middleware for handling multipart/form-data (file uploads).  

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**
- Node.js (v18 or higher)  
- npm  
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)  

---

### **Installation & Setup**

#### 1. Clone the repository
```bash
git clone https://github.com/anandk3012/react-chat-app.git
cd react-chat-app
````

#### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the **server** directory and add the following environment variables:

```
DATABASE_URL=your_mongodb_connection_string
PORT=3001
JWT_KEY=your_secret_jwt_key
```

#### 3. Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the **client** directory and add:

```
VITE_SERVER_URL=http://localhost:3001
```

---

### **Running the Application**

#### Start the backend server

```bash
# From the /server directory
npm start
```

The server will run at: [http://localhost:3001](http://localhost:3001)

#### Start the frontend development server

```bash
# From the /client directory
npm run dev
```

The application will be available at: [http://localhost:5173](http://localhost:5173)


