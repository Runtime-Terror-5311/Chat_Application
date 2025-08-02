💬 MERN Real-Time Chat App

This is a fully functional real-time chat application built using the "MERN Stack" with "Socket.IO".
It allows users to register, update profiles, send/receive messages in real-time, and track user activity such as online status and unread messages.

🚀 Features

👤 User Authentication
- ✅ Sign Up – Create a new user account with full name, email, password, and a short bio.
![Sign Up](https://github.com/user-attachments/assets/51c605ee-3e8d-4f57-8cdc-084f73860e11)
  
- ✅ Login – Existing users can log in securely using JWT-based authentication.
![Login](https://github.com/user-attachments/assets/d3dd73f9-f53b-4b3a-9867-5b89be760f9b)

  
- ✅ Logout – End the session and disconnect from real-time communication.
  ![Logout](https://github.com/user-attachments/assets/a1b9f508-8d78-4fdd-91a0-a92f33058d29)

🙍‍♂️ Profile Management

- ✅ Update Name – Edit and save your full name.

- ✅ Update Bio – Modify your bio for personal description.

- ✅ Update Profile Picture – Upload and change profile image using Cloudinary

![Update Profile](https://github.com/user-attachments/assets/8ca5806a-57cc-4378-a98d-e25fe4dab355)

💬 Real-Time Messaging
- ✅ Send Messages – Text and image messages supported.
- ✅ Receive Messages Instantly – Real-time communication using Socket.IO.
- ✅ Seen Status – Messages are automatically marked as "seen" when opened.

![Real time messaging](https://github.com/user-attachments/assets/70237624-29ad-4abc-8906-d40e2db23c7d)

🔍 User Discovery
- ✅ Search Users by Name – Quickly search through all registered users (except self).
- ✅ Online Status – See if a user is currently online (green dot + label).
- ✅ Unseen Message Count – Displays number of unread messages from each user.


![User Status](https://github.com/user-attachments/assets/13178ddc-b1b8-41b7-805a-583092f2d1bc)


📱 User Interface Highlights
- 🎨 Responsive, clean chat UI using Tailwind CSS.
- 🟢 Green border indicator for online users.
- 🔍 Search bar with instant filtering.
- 🔢 Unseen messages shown in a notification badge.

 🛠 Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Realtime: Socket.IO
- Auth: JWT(jsonwebtoken)
- File Uploads: Cloudinary



📌 How to Setup this app in your pc

1. Clone the repository using ----->  git clone https://github.com/Runtime-Terror-5311/Chat_Application.git
2. cd Chat_Application
3. cd server
4. npm install
5. Create a .env file to setup all the environment variables
   {
     MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
   PORT = 8001
   }
7. npm run server
8. cd client
9. npm install
10. Create a .env file to setup all the environment variables

   {
     VITE_BACKEND_URL=http://localhost:8001
   }
11. npm run dev



Built with ❤️ by Shubhangi






