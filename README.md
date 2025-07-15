# NeoMail   link:-  https://neo-mail-gauravkumar.vercel.app/
NeoMail is a fully functional, modern email application developed using React and Firebase, inspired by Gmail but designed with a unique UI and user experience. It offers core email functionalities like composing, sending, receiving, and deleting emails, all within a responsive and intuitive interface.

1.Signup Page 
![image]  <img width="670" height="665" alt="image" src="https://github.com/user-attachments/assets/9e8bfef1-114b-4562-9f06-046384dbd11e" />



2.Login Page
<img width="670" height="701" alt="image" src="https://github.com/user-attachments/assets/005db32e-f678-4378-b8c4-9ebc1097eefd" />



3. Home
<img width="1349" height="551" alt="Screenshot 2025-07-07 121902" src="https://github.com/user-attachments/assets/4405bcdb-a9fd-4aee-9a0d-59635eb65720" />


4. Email open and delete also
   <img width="1348" height="572" alt="Screenshot 2025-07-07 121938" src="https://github.com/user-attachments/assets/408972be-45f3-41ab-89f7-3dd2095dcb28" />



5. database
   Emails =>  in online MongoDb Atlas
   <img width="1359" height="666" alt="Screenshot 2025-07-07 124119" src="https://github.com/user-attachments/assets/606f7bdb-edbf-4d1c-80c1-27527d0c581a" />



   Users=>
  <img width="1364" height="677" alt="Screenshot 2025-07-07 124227" src="https://github.com/user-attachments/assets/389e9949-8925-4e9b-8176-f13479e31e2c" />


NeoMail is a full-stack email client inspired by Gmail, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates core features of a modern email application including authentication, inbox management, composing emails, and secure API communication, all wrapped in a responsive and intuitive UI.



## 📌 Features

- ✅ User Signup & Login (JWT + secure cookie-based auth)
- 📨 Compose and Send Emails
- 📬 View Inbox and Delete Emails
- 🔐 HTTP-only JWT cookie authentication
- 🧠 Global state managed with Redux Toolkit + `redux-persist`
- 🌐 Fully deployed on Vercel (frontend + backend)
- 💅 Responsive UI with TailwindCSS
- 🧾 Clean folder structure and scalable codebase

---

## ⚙️ Tech Stack

### 🖥 Frontend:
- React + Vite
- Redux Toolkit + redux-persist
- TailwindCSS
- Axios

### 🌐 Backend:
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- CORS, Cookie-parser

### ☁️ Deployment:
- Frontend & Backend hosted on [**Vercel**](https://vercel.com/)
- MongoDB Atlas (Cloud database)

---


🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Tgaurav1k/NeoMail-Project.git
cd NeoMail-Project
2. Set up Environment Variables
Create .env files in both backend/ and frontend/ directories with the following (example):

.env for Backend
env
Copy
Edit
MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret
JWT_EXPIRE=1h
3. Install Dependencies
bash
Copy
Edit
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
4. Run Locally
bash
Copy
Edit
# Backend
npm run dev --prefix backend

# Frontend
npm run dev --prefix frontend


## 📂 Folder Structure

```bash
NeoMail-Project/
├── backend/          # Express serverless functions (API routes)
├── frontend/         # React + Vite frontend app
├── .env              # Environment variables (local)
└── README.md         # Project documentation

