# HotWheels E-commerce Store

A full-stack e-commerce application for HotWheels cars built with React + Vite frontend and Node.js + Express backend using Supabase database.


## Features

- 🏎️ Browse HotWheels collection
- 🔍 Search and filter functionality
- 🛒 Shopping cart
- 📱 Responsive design
- ⚡ Fast performance with Vite
- 🗄️ Supabase database integration

## Tech Stack

### Frontend
- React 18
- Vite
- Lucide Icons
- Axios

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL)
- CORS

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Supabase account

### Backend Setup
```bash
cd backend
npm install
# Create .env file with Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and key
npm run dev
