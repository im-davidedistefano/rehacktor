# 🎮 Rehacktor - Final Project by Davide Di Stefano

## 📌 Description
**Rehacktor** is a video game cataloging web app that allows users to explore, filter, and search for games based on genre or keywords. Registered users can save favorites, chat with other gamers in real-time, and manage their profile.

> UI inspired by [Ableton](https://www.ableton.com/en/). Built entirely from scratch.

---

## 🚀 Features

### 👤 User Roles & Capabilities

#### Non-authenticated Users
- Browse the full video game archive
- View detailed game pages
- Use search and filters to explore games
- Register with a valid email

#### Authenticated Users
- Log in with a valid email
- Add games to wishlist
- Chat in real-time with other logged-in users
- Edit personal profile and settings

---

## 🛠️ Tech Stack

### 🧩 APIs
- [RAWG API](https://rawg.io/apidocs) – Public REST API for games data
- [Supabase](https://supabase.com/) – Backend-as-a-Service (Auth, DB, Realtime)

### 🎨 Styling & UI
- [Bootstrap 5](https://getbootstrap.com/) – Responsive layout and components

### ⚙️ State Management
- **Context API** – Manages session token and user profile
- **Zustand** – Handles global state for wishlist management

---

## 🧭 Pages

| Page            | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
| **Homepage**    | Features "Game of the Month" + top-rated games                           |
| **All Games**   | Full game list with filtering options                                    |
| **Category**    | Lists all games by selected category/genre                               |
| **Single Game** | Game detail page, add to favorites, access live chat                     |
| **Login**       | Login page for existing users                                            |
| **Register**    | User registration with email                                             |
| **Profile**     | User profile with wishlist (view and remove games)                       |
| **Settings**    | Update personal user information                                         |

---

## 🌐 Deployment

### Requirements
- **Node.js** version **18 or higher**

### Installation & Run
- Install dependencies: _npm install_
- Start the development server: _npm run dev_
