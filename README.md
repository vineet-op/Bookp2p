# 📚 Book Exchange Platform

A simple full-stack Book Exchange platform where users can register as **Owners** (to list books) or **Seekers** (to view and request books). Built using **Next.js** (frontend) and **Express.js** (backend), with data managed in memory.

---

## 🚀 Demo

👉 Live Frontend: [https://book-exchange-frontend.vercel.app](https://book-exchange-frontend.vercel.app)  
🔗 Backend API (Render): [https://book-exchange-backend.onrender.com](https://book-exchange-backend.onrender.com)

> ⚠️ Note: Since the backend uses in-memory storage, all data resets on server restart.

---

## 🛠️ Tech Stack

### Frontend (Next.js + TailwindCSS)
- Built with [Next.js](https://nextjs.org/)
- Styling via [Tailwind CSS](https://tailwindcss.com/)
- Client-side routing and role-based navigation
- LocalStorage used for session persistence

### Backend (Express.js)
- Node.js with Express
- In-memory database (JavaScript object)
- RESTful API design

---

## 👥 User Roles

### 🔐 Owner
- Can log in and access the **Add Book** page
- Can view, update, and delete their listed books

### 🔍 Seeker
- Can only view the **Book Listings**
- Cannot access the Add Book page

---

## 🧭 Features

- ✨ Micro animations
- 📚 Add, view, update & delete book listings
- 📚 Add Book cover image
- 🔒 Filtering the books (searchable)
- 🔁 Demo data seeded on server start
- 📦 Organized folder structure for frontend/backend

---


## ⚙️ Setup Instructions

### Clone the Repository

Backend
```bash
git clone https://github.com/yourusername/bookp2p.git
cd backend
npm install
npm start
```
Frontend
```bash
cd ../frontend
npm install
npm run dev
```
